// Town data for the local SEO landing pages (/heat-pumps/[town]).
// Each town gets genuinely distinct copy — intro, housing-stock notes and
// nearby villages — so pages are useful to readers, not doorway spam.

export interface TownInfo {
  slug: string;
  name: string;
  postcodes: string[];
  intro: string;
  housing: string;
  nearby: string[];
  travelNote: string;
}

export const towns: TownInfo[] = [
  {
    slug: "stafford",
    name: "Stafford",
    postcodes: ["ST16", "ST17", "ST18"],
    intro:
      "Stafford is our home town — our office is on Marston Road, so nowhere in the county gets a faster response for surveys, installations and aftercare.",
    housing:
      "Stafford's mix of Victorian terraces around the town centre, inter-war semis in Rowley Park and Castletown, and modern estates at Wildwood, Meadowcroft Park and Doxey suits air source heat pumps well — most homes need only modest radiator upgrades to run at heat-pump temperatures.",
    nearby: ["Doxey", "Castletown", "Wildwood", "Weeping Cross", "Baswich", "Hopton", "Tixall", "Great Haywood"],
    travelNote: "We're based here, so same-week surveys are usually available.",
  },
  {
    slug: "stone",
    name: "Stone",
    postcodes: ["ST15"],
    intro:
      "Stone's canal-side setting and fast-growing new estates make it one of our busiest areas for heat pump enquiries — and it's only ten minutes up the A34 from our Stafford base.",
    housing:
      "The newer developments at Walton, Stonefield and along the Eccleshall Road are ideal heat pump candidates — well insulated with modern radiators. Older cottages near the High Street and canal usually benefit from our free heat loss survey to size emitters correctly.",
    nearby: ["Walton", "Stonefield", "Aston-by-Stone", "Barlaston", "Tittensor", "Meaford", "Yarnfield", "Swynnerton"],
    travelNote: "About 10 minutes from our Stafford base — surveys are easy to slot in.",
  },
  {
    slug: "uttoxeter",
    name: "Uttoxeter",
    postcodes: ["ST14"],
    intro:
      "From the racecourse side of town out to the villages of the Dove Valley, we've served Uttoxeter homes with heating for over two decades — and heat pumps are now our most requested upgrade here.",
    housing:
      "Uttoxeter's estates off Holly Road and the newer homes towards Bramshall have good insulation levels for heat pumps. The area's many rural properties on oil — in villages like Marchington and Abbots Bromley — see the biggest running-cost savings when switching to an air source heat pump.",
    nearby: ["Bramshall", "Marchington", "Abbots Bromley", "Checkley", "Rocester", "Denstone", "Kingstone"],
    travelNote: "Around 25 minutes from Stafford via the A518.",
  },
  {
    slug: "cannock",
    name: "Cannock",
    postcodes: ["WS11", "WS12"],
    intro:
      "Cannock and Hednesford homeowners are switching to heat pumps in numbers — helped by the £7,500 grant and the area's largely modern, well-insulated housing stock.",
    housing:
      "Much of Cannock's housing was built from the 1960s onwards — Heath Hayes, Norton Canes and the newer developments around Mill Green are typically straightforward installations. Former council homes across the district usually have cavity walls that, once insulated, run beautifully on a heat pump.",
    nearby: ["Hednesford", "Heath Hayes", "Norton Canes", "Bridgtown", "Cannock Wood", "Huntington", "Great Wyrley"],
    travelNote: "Roughly 20 minutes down the M6 or A34 from Stafford.",
  },
  {
    slug: "rugeley",
    name: "Rugeley",
    postcodes: ["WS15"],
    intro:
      "With the power station gone and the town regenerating fast, Rugeley is embracing low-carbon heating — we install air source heat pumps across the town and the Cannock Chase villages around it.",
    housing:
      "Rugeley's terraces and semis around the town centre, and the popular estates at Etchinghill and Hagley Park, are well suited to modern high-temperature heat pumps. Homes bordering Cannock Chase often have the outdoor space that makes unit siting simple.",
    nearby: ["Etchinghill", "Brereton", "Armitage", "Handsacre", "Slitting Mill", "Colton", "Hill Ridware"],
    travelNote: "About 15 minutes from Stafford through Milford and over the Chase.",
  },
  {
    slug: "lichfield",
    name: "Lichfield",
    postcodes: ["WS13", "WS14"],
    intro:
      "Lichfield's blend of period character and high-quality new developments makes it a strong heat pump city — and our surveys are designed to respect both.",
    housing:
      "The newer estates at Darwin Park, Boley Park and around Streethay are textbook heat pump homes. For Lichfield's Georgian and Victorian properties near the cathedral, our room-by-room heat loss survey works out exactly what emitter upgrades (if any) are needed before you commit to anything.",
    nearby: ["Boley Park", "Darwin Park", "Streethay", "Whittington", "Shenstone", "Kings Bromley", "Fradley", "Alrewas"],
    travelNote: "Around 30 minutes from our Stafford base via the A51.",
  },
  {
    slug: "penkridge",
    name: "Penkridge",
    postcodes: ["ST19"],
    intro:
      "Penkridge sits right between our Stafford base and Cannock, so village homeowners here get quick surveys and genuinely local aftercare.",
    housing:
      "Penkridge's mix of established estates off the A449 and newer developments near the market are simple, tidy installations. Surrounding rural properties — many on oil or LPG — typically save the most from switching, with the £7,500 grant on top.",
    nearby: ["Acton Trussell", "Coppenhall", "Dunston", "Levedale", "Wheaton Aston", "Brewood", "Huntington"],
    travelNote: "10 minutes south of Stafford on the A449.",
  },
  {
    slug: "eccleshall",
    name: "Eccleshall",
    postcodes: ["ST21"],
    intro:
      "Eccleshall and its surrounding villages are classic PlumbGas territory — we've maintained boilers here for 20 years, and now fit the heat pumps replacing them.",
    housing:
      "Character cottages along the High Street benefit from a careful heat loss survey, while the newer homes around Shaws Lane and the surrounding barn conversions — often on oil or LPG — are excellent candidates for big running-cost savings with an air source heat pump.",
    nearby: ["Croxton", "Slindon", "Sturbridge", "Cotes Heath", "Standon", "High Offley", "Adbaston"],
    travelNote: "15 minutes north-west of Stafford on the A5013.",
  },
  {
    slug: "gnosall",
    name: "Gnosall",
    postcodes: ["ST20"],
    intro:
      "Gnosall and the villages towards Newport are full of rural homes heating with oil — exactly where an air source heat pump plus the £7,500 grant makes the biggest difference.",
    housing:
      "From canal-side cottages by the Shropshire Union to the estates off Wharf Road and outlying farmhouses, we survey every home individually. Oil-heated properties around Gnosall typically cut hundreds of pounds a year off heating costs by switching.",
    nearby: ["Woodseaves", "Knightley", "Moreton", "Church Eaton", "Bromstead", "Norbury", "Haughton"],
    travelNote: "10–15 minutes west of Stafford on the A518.",
  },
  {
    slug: "stoke-on-trent",
    name: "Stoke-on-Trent",
    postcodes: ["ST1", "ST2", "ST3", "ST4", "ST6", "ST7"],
    intro:
      "Across all six towns — Hanley, Burslem, Tunstall, Stoke, Fenton and Longton — we're helping Potteries homeowners swap ageing gas boilers for grant-funded heat pumps.",
    housing:
      "Stoke's famous terraces need honest advice: some suit heat pumps brilliantly, others need insulation first — our free survey tells you which, with no hard sell. The city's semis in Trentham, Meir Park and Baddeley Green, and newer builds across the city, are typically straightforward installs.",
    nearby: ["Hanley", "Longton", "Trentham", "Meir", "Blurton", "Bucknall", "Milton", "Weston Coyney"],
    travelNote: "20–30 minutes up the A34/A500 from Stafford.",
  },
  {
    slug: "newcastle-under-lyme",
    name: "Newcastle-under-Lyme",
    postcodes: ["ST5"],
    intro:
      "Newcastle-under-Lyme's leafy suburbs — Westlands, Clayton, the Westbury Park estates — are among north Staffordshire's best heat pump territory.",
    housing:
      "The borough's large stock of 1930s–1970s semis and detached homes responds well to properly sized air source heat pumps, and gardens here usually give plenty of siting options for the outdoor unit. Rural homes towards Loggerheads and Whitmore on oil see the biggest bill reductions.",
    nearby: ["Westlands", "Clayton", "Silverdale", "Keele", "Whitmore", "Madeley", "Audley", "Loggerheads"],
    travelNote: "About 25 minutes from Stafford via the A34.",
  },
  {
    slug: "cheadle",
    name: "Cheadle",
    postcodes: ["ST10"],
    intro:
      "Cheadle and the Churnet Valley villages combine moorland character homes with modern estates — we install heat pumps across both.",
    housing:
      "Cheadle's newer developments off Ashbourne Road are simple installations, while stone cottages in Tean, Oakamoor and Alton benefit from our careful room-by-room surveys. Many outlying homes are on oil or LPG, where heat pump running costs are dramatically lower.",
    nearby: ["Tean", "Oakamoor", "Alton", "Kingsley", "Cellarhead", "Caverswall", "Blythe Bridge"],
    travelNote: "About 35 minutes from Stafford via Uttoxeter or Blythe Bridge.",
  },
  {
    slug: "leek",
    name: "Leek",
    postcodes: ["ST13"],
    intro:
      "The Queen of the Moorlands has some of Staffordshire's most characterful housing — and with careful sizing, heat pumps thrive even in Leek's colder upland winters.",
    housing:
      "Modern heat pumps hold full output well below freezing, so moorland temperatures are no barrier — sizing just needs doing properly, which is exactly what our free heat loss survey is for. Leek's stone terraces, Victorian villas off the Buxton Road and estates at Birchall and Westwood each get an individual assessment.",
    nearby: ["Cheddleton", "Endon", "Longsdon", "Ipstones", "Bagnall", "Brown Edge", "Rudyard"],
    travelNote: "Around 40 minutes from Stafford — surveys grouped for the Moorlands.",
  },
  {
    slug: "burton-upon-trent",
    name: "Burton upon Trent",
    postcodes: ["DE13", "DE14"],
    intro:
      "From Branston to Stretton, Burton's brewing-town terraces and modern estates alike are switching to air source heat pumps with the £7,500 grant.",
    housing:
      "Burton's newer developments — Branston Locks, Stretton, and the estates off Tutbury Road — are ready-made for heat pumps. The town's classic terraces get an honest survey-first approach: we confirm heat loss room by room before quoting, so the system is never under- or over-sized.",
    nearby: ["Branston", "Stretton", "Horninglow", "Winshill", "Stapenhill", "Tutbury", "Rolleston on Dove", "Barton-under-Needwood"],
    travelNote: "About 35 minutes from Stafford via Uttoxeter on the A50/A38.",
  },
  {
    slug: "tamworth",
    name: "Tamworth",
    postcodes: ["B77", "B78", "B79"],
    intro:
      "Tamworth's large modern estates make it one of the easiest places in Staffordshire to switch to a heat pump — most homes here were built with cavity walls and decent insulation from day one.",
    housing:
      "Wilnecote, Belgrave, Amington, Dosthill and the newer developments across the borough are typically clean, quick installations. With gas prices where they are, well-insulated Tamworth homes often see payback on the post-grant cost within a handful of years.",
    nearby: ["Wilnecote", "Amington", "Dosthill", "Fazeley", "Polesworth", "Kettlebrook", "Glascote", "Bolehall"],
    travelNote: "About 40 minutes from Stafford via the A51/M6 Toll.",
  },
  {
    slug: "market-drayton",
    name: "Market Drayton",
    postcodes: ["TF9"],
    intro:
      "Just over the Shropshire border, Market Drayton and its villages sit comfortably inside our coverage area — especially the many rural homes running on oil.",
    housing:
      "The town's estates off Adderley Road and Longslow Road suit standard installations, while the surrounding countryside — Norton in Hales, Cheswardine, Hinstock — is full of oil-heated properties where an air source heat pump plus the £7,500 grant transforms running costs.",
    nearby: ["Norton in Hales", "Cheswardine", "Hinstock", "Woodseaves", "Ashley", "Loggerheads", "Hodnet"],
    travelNote: "Around 30 minutes north-west of Stafford via Eccleshall.",
  },
];

export function getTownBySlug(slug: string): TownInfo | undefined {
  return towns.find((t) => t.slug === slug);
}

/** A few neighbouring towns for internal linking (excludes the current town) */
export function getNeighbouringTowns(slug: string, count = 5): TownInfo[] {
  const idx = towns.findIndex((t) => t.slug === slug);
  if (idx === -1) return towns.slice(0, count);
  const out: TownInfo[] = [];
  for (let step = 1; out.length < count && step <= towns.length; step++) {
    const after = towns[(idx + step) % towns.length];
    if (after.slug !== slug && !out.includes(after)) out.push(after);
  }
  return out;
}
