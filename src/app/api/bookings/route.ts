import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

// Lead capture endpoint for free heat loss survey bookings and quote requests.
// Never loses a lead silently: tries the SurveyBooking table, falls back to the
// Quote table if the new table hasn't been pushed yet, and fires optional
// email (Resend) + Slack webhook notifications when the env vars are set.

interface BookingBody {
  name?: string;
  email?: string;
  phone?: string;
  addressLine?: string;
  postcode?: string;
  preferredDate?: string;
  timeSlot?: string;
  notes?: string;
  source?: string;
  productId?: string;
  productName?: string;
  quotedPrice?: number;
  priceBeforeGrant?: number;
  propertyType?: string;
  bedrooms?: number;
  bathrooms?: number;
}

export async function POST(request: NextRequest) {
  let body: BookingBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const phone = (body.phone || "").trim();
  const email = (body.email || "").trim();
  const postcode = (body.postcode || "").trim();

  if (!name || !phone || !postcode) {
    return NextResponse.json(
      { error: "Name, phone and postcode are required" },
      { status: 400 }
    );
  }

  let savedId: string | null = null;
  let savedTo: string | null = null;

  const db = await getDb();
  if (db) {
    try {
      const booking = await db.surveyBooking.create({
        data: {
          name,
          email,
          phone,
          addressLine: body.addressLine || null,
          postcode,
          preferredDate: body.preferredDate || null,
          timeSlot: body.timeSlot || null,
          notes: body.notes || null,
          source: body.source || "direct",
          productId: body.productId || null,
          productName: body.productName || null,
          quotedPrice: body.quotedPrice ?? null,
          priceBeforeGrant: body.priceBeforeGrant ?? null,
          propertyType: body.propertyType || null,
          bedrooms: body.bedrooms ?? null,
          bathrooms: body.bathrooms ?? null,
        },
      });
      savedId = booking.id;
      savedTo = "surveyBooking";
    } catch {
      // SurveyBooking table may not exist yet (prisma db push pending),
      // fall back to the Quote table so the lead is still captured.
      try {
        const quote = await db.quote.create({
          data: {
            category: "heatpump-survey",
            name,
            email,
            phone,
            postcode,
            propertyType: body.propertyType || null,
            bedrooms: body.bedrooms ?? null,
            bathrooms: body.bathrooms ?? null,
            totalPrice: body.quotedPrice ?? null,
            status: "survey-requested",
          },
        });
        savedId = quote.id;
        savedTo = "quote";
      } catch {
        // DB completely unavailable, notifications below are the safety net.
      }
    }
  }

  const summaryLines = [
    `New lead: ${body.source === "boiler-quote" ? "Boiler quote request" : "FREE HEAT LOSS SURVEY booking"}`,
    `Name: ${name}`,
    `Phone: ${phone}`,
    email ? `Email: ${email}` : null,
    body.addressLine ? `Address: ${body.addressLine}, ${postcode}` : `Postcode: ${postcode}`,
    body.preferredDate ? `Preferred date: ${body.preferredDate} (${body.timeSlot || "any time"})` : null,
    body.productName ? `Interested in: ${body.productName}` : null,
    body.quotedPrice ? `Quoted price: £${body.quotedPrice.toLocaleString()}` : null,
    body.propertyType
      ? `Property: ${body.propertyType}, ${body.bedrooms ?? "?"} bed, ${body.bathrooms ?? "?"} bath`
      : null,
    body.notes ? `Notes: ${body.notes}` : null,
    savedTo ? `Saved to database (${savedTo}: ${savedId})` : "NOT saved to database, follow up from this notification",
  ].filter(Boolean);
  const summary = summaryLines.join("\n");

  const notified: string[] = [];

  // Email via Resend (set RESEND_API_KEY and optionally LEADS_EMAIL in Vercel).
  // Prefers the branded domain sender; falls back to Resend's shared address
  // if the domain isn't verified yet, so notifications never silently stop.
  if (process.env.RESEND_API_KEY) {
    const fromCandidates = [
      process.env.LEADS_FROM || "PG Renewables <leads@plumbgasrenewables.services>",
      "PG Renewables <onboarding@resend.dev>",
    ].filter((v, i, arr) => arr.indexOf(v) === i);
    for (const from of fromCandidates) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from,
            to: [process.env.LEADS_EMAIL || "jon@plumbgas.services"],
            subject: `New lead: ${name} (${postcode})`,
            text: summary,
          }),
        });
        if (res.ok) {
          notified.push("email");
          break;
        }
      } catch {
        // Notification failure must never fail the customer's booking
      }
    }
  }

  // Slack webhook (set SLACK_LEADS_WEBHOOK_URL in Vercel)
  if (process.env.SLACK_LEADS_WEBHOOK_URL) {
    try {
      const res = await fetch(process.env.SLACK_LEADS_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: summary }),
      });
      if (res.ok) notified.push("slack");
    } catch {
      // Same, never fail the booking over a notification
    }
  }

  return NextResponse.json({
    success: true,
    id: savedId || `local-${Date.now()}`,
    saved: savedTo !== null,
    notified,
  });
}
