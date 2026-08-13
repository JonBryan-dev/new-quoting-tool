// Service x place pages, built deliberately narrow.
//
// The temptation with this pattern is every service crossed with every
// town, which produces near-identical pages that Google treats as
// doorway spam and that help nobody. Instead each service is matched
// only to the places where it genuinely differs and genuinely sells:
// the oil and LPG grant to the off-grid villages, air conditioning to
// the suburban and modern housing where people actually buy it, and
// servicing to the towns close enough to our base for good aftercare.
//
// Every entry below carries content specific to that place. If a new
// combination cannot be given a real local angle, it should not exist.

export interface LocalPageContent {
  townSlug: string;
  /** Opening paragraph, specific to this service in this place */
  intro: string;
  /** The genuinely local detail: housing, fuel, geography, planning */
  local: string;
  /** Optional third paragraph where there is more worth saying */
  extra?: string;
}

export interface LocalService {
  slug: string;
  /** Used in the H1 as "{label} in {Town}" */
  label: string;
  /** Short description for meta and the parent hub */
  blurb: string;
  /** The main non-local service page this supports */
  parentPath: string;
  parentLabel: string;
  areas: LocalPageContent[];
}

// ── Oil and LPG grant, off the mains gas grid ──────────────
// Time-limited: the £9,000 rate ends 31 March 2027.

const OIL_GRANT: LocalService = {
  slug: "oil-boiler-grant",
  label: "£9,000 oil & LPG heat pump grant",
  blurb:
    "Off the mains gas grid and heated by oil or LPG? The grant towards a heat pump is £9,000 until 31 March 2027, and we claim it for you.",
  parentPath: "/oil-boiler-grant",
  parentLabel: "the £9,000 oil and LPG grant",
  areas: [
    {
      townSlug: "eccleshall",
      intro:
        "Eccleshall and the villages around it sit largely off the mains gas grid, which is exactly where the higher £9,000 grant applies and where the running-cost savings from a heat pump are biggest.",
      local:
        "Around Croxton, Slindon, Sturbridge, Cotes Heath and out towards High Offley and Adbaston, oil is still the default. If you have a tank in the garden and an annual bill that lands in one lump every time the tanker comes, you qualify for the higher rate rather than the standard £7,500.",
      extra:
        "We have maintained boilers across this area for twenty years, so we know the housing: the character cottages along the High Street need a proper room-by-room survey before anyone talks about radiators, while the barn conversions and newer homes around Shaws Lane are usually straightforward.",
    },
    {
      townSlug: "gnosall",
      intro:
        "Gnosall is one of the strongest areas in the county for this grant. The villages towards Newport are full of oil-heated homes, and oil is the fuel a heat pump beats by the widest margin.",
      local:
        "From the canal-side cottages by the Shropshire Union out to Woodseaves, Knightley, Church Eaton, Norbury and Haughton, mains gas simply is not an option for most properties. That is the qualifying condition for the £9,000 rate, so a great many homes here are eligible without having to do anything special.",
      extra:
        "Older farmhouses and converted outbuildings need honest assessment rather than assumptions, which is what the free heat loss survey is for. Some need insulation work first, and we will tell you that plainly rather than sell you a system that will disappoint.",
    },
    {
      townSlug: "penkridge",
      intro:
        "Penkridge village itself is largely on gas, but the surrounding rural properties are not, and those are the homes the higher £9,000 grant was designed for.",
      local:
        "Acton Trussell, Coppenhall, Dunston, Levedale, Wheaton Aston and Brewood between them hold a lot of oil and LPG heating. If your neighbours have tanks, the odds are good that you qualify for the extra £1,500 on top of the standard grant.",
      extra:
        "Being ten minutes south of our Stafford base on the A449, we can usually survey here the same week you call, which matters more than it sounds given the March 2027 deadline.",
    },
    {
      townSlug: "uttoxeter",
      intro:
        "Uttoxeter town is served by gas, but the Dove Valley villages around it are not, and rural Staffordshire homes on oil now qualify for £9,000 rather than £7,500.",
      local:
        "Marchington, Abbots Bromley, Checkley, Kingstone and the outlying farms towards Rocester and Denstone are classic off-grid territory. These are often larger, older properties with high heating bills, which is precisely where the switch away from oil shows up fastest on the running costs.",
      extra:
        "Bigger rural homes need careful sizing rather than a bigger heat pump bolted on. Our survey measures each room, so what you get is matched to the house rather than to a rule of thumb.",
    },
    {
      townSlug: "market-drayton",
      intro:
        "Just over the Shropshire border, Market Drayton and its villages are full of oil-heated homes, and they qualify for the same £9,000 grant as anywhere else in England.",
      local:
        "Norton in Hales, Cheswardine, Hinstock, Woodseaves and the farms in between run overwhelmingly on oil. Rural properties here tend to be older and less well insulated than a town semi, which makes a proper heat loss survey essential rather than optional.",
      extra:
        "We are about half an hour away through Eccleshall, and we already work across this patch, so aftercare is not a problem despite the county line.",
    },
  ],
};

// ── Air conditioning ───────────────────────────────────────
// Matched to modern and suburban housing stock, where the summer
// problem is real and the rooms are worth cooling.

const AIR_CON: LocalService = {
  slug: "air-conditioning",
  label: "Air conditioning installation",
  blurb:
    "Home air conditioning that cools in summer and heats efficiently in winter, sized for the room and sited with the neighbours in mind.",
  parentPath: "/services/air-conditioning",
  parentLabel: "our air conditioning service",
  areas: [
    {
      townSlug: "stafford",
      intro:
        "Stafford is our home town, so air conditioning here gets the fastest response in the county, for the quote, the installation and anything afterwards.",
      local:
        "The rooms we are called to most are the modern estates at Wildwood, Meadowcroft Park and Doxey, where good insulation keeps summer heat in as effectively as it keeps winter heat, and loft conversions across the older streets, which cook from about May onwards. South-facing bedrooms in the Rowley Park and Castletown semis are the other regular.",
      extra:
        "Because we are based here, siting the outdoor unit is something we can come and look at properly rather than guess from a photograph.",
    },
    {
      townSlug: "stone",
      intro:
        "Stone's newer estates are exactly the sort of housing air conditioning suits: well sealed, well insulated, and prone to holding heat well into the evening.",
      local:
        "The developments at Walton, Stonefield and along the Eccleshall Road were built to modern insulation standards, which is excellent in January and hard work in July. Home offices and upstairs rooms in these houses are the usual candidates. The older cottages near the High Street and the canal are a different job, and worth a proper look before anyone quotes.",
      extra:
        "Ten minutes up the A34 from our base, so quotes and installs slot in easily.",
    },
    {
      townSlug: "cannock",
      intro:
        "Cannock and Hednesford have the sort of housing stock where air conditioning is a straightforward, tidy job: mostly post-1960s, mostly cavity walls, mostly with somewhere sensible to put the outdoor unit.",
      local:
        "Heath Hayes, Norton Canes and the newer developments around Mill Green are typically simple installations. Former council homes across the district usually have generous gardens and clear external walls, which keeps pipework runs short and the price down.",
    },
    {
      townSlug: "lichfield",
      intro:
        "Lichfield needs air conditioning done thoughtfully, because the city mixes new estates where it is simple with period and listed property where siting and permissions matter.",
      local:
        "Darwin Park, Boley Park and the newer homes around Streethay are ordinary installations. Nearer the cathedral, in the Georgian and Victorian streets, conservation area rules and neighbours' windows both come into it, so we look at the property before promising anything. Air conditioning units usually fall under permitted development, but that is exactly the sort of place where it is worth checking rather than assuming.",
    },
    {
      townSlug: "tamworth",
      intro:
        "Tamworth's large modern estates make it one of the easiest places in the county to fit air conditioning, and among the most worthwhile, because those houses get genuinely warm.",
      local:
        "Wilnecote, Belgrave, Amington, Dosthill and the newer developments across the borough were built with cavity walls and decent insulation from the start. That combination traps summer heat upstairs, which is why bedrooms and home offices are what we are usually asked to sort out.",
    },
  ],
};

// ── Heat pump servicing ────────────────────────────────────
// Kept to the towns near enough for genuinely responsive aftercare.

const HP_SERVICING: LocalService = {
  slug: "heat-pump-servicing",
  label: "Heat pump servicing",
  blurb:
    "Annual heat pump servicing that keeps the manufacturer warranty valid and catches efficiency problems before they cost you money.",
  parentPath: "/services/heat-pump-servicing",
  parentLabel: "what a heat pump service involves",
  areas: [
    {
      townSlug: "stafford",
      intro:
        "We service heat pumps across Stafford whoever installed them, and being based in the town means we can usually get to you quickly when something is not right.",
      local:
        "Most manufacturers require an annual service to keep the warranty valid, which matters a great deal on a system with a long guarantee. We check refrigerant pressures, flow temperatures, the cylinder and controls, then tell you honestly whether the system is running as well as it should be. A surprising number are not, usually because they were commissioned in a hurry.",
    },
    {
      townSlug: "stone",
      intro:
        "Stone is ten minutes from our base, so heat pump servicing and any follow-up work here is easy for us to schedule and easy for you to get.",
      local:
        "If your heat pump was fitted by a company that has since moved on, or by a national outfit that now sends someone different every year, we can take over the annual service and keep your manufacturer warranty intact. We will also tell you what the original installer got right and wrong, which is worth knowing.",
    },
    {
      townSlug: "cannock",
      intro:
        "We cover Cannock, Hednesford and the surrounding villages for annual heat pump servicing, on systems we installed and on systems we did not.",
      local:
        "An annual service protects the warranty, but the bigger prize is efficiency. A heat pump running at the wrong flow temperature, or with weather compensation switched off, can cost hundreds a year more than it should while still appearing to work perfectly. That is exactly the sort of thing a proper service catches.",
    },
  ],
};

export const LOCAL_SERVICES: LocalService[] = [OIL_GRANT, AIR_CON, HP_SERVICING];

export function getLocalService(slug: string): LocalService | undefined {
  return LOCAL_SERVICES.find((s) => s.slug === slug);
}

export function getLocalPage(serviceSlug: string, townSlug: string) {
  const service = getLocalService(serviceSlug);
  if (!service) return null;
  const area = service.areas.find((a) => a.townSlug === townSlug);
  if (!area) return null;
  return { service, area };
}

/** Every service x place combination, for the sitemap and static params */
export function allLocalPages(): { service: string; town: string }[] {
  return LOCAL_SERVICES.flatMap((s) =>
    s.areas.map((a) => ({ service: s.slug, town: a.townSlug })),
  );
}
