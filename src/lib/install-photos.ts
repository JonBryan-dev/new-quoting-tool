// Manifest of real job photos in /public. Populated from the photo
// catalogue; alt text stays honest, "Staffordshire" until Jon confirms
// a specific town for a given shot.

export interface InstallPhoto {
  src: string;
  alt: string;
  caption?: string;
  /** where this photo is worth showing */
  tags: ("homepage" | "install-page" | "zerodisrupt" | "hero")[];
}

export const INSTALL_PHOTOS: InstallPhoto[] = [
  {
    src: "/install-heat-pump-brick-garden.jpg",
    alt: "Vaillant aroTHERM plus air source heat pump installed against a brick wall with the garden behind, Staffordshire",
    caption: "Vaillant aroTHERM plus, Staffordshire",
    tags: ["homepage", "install-page", "hero"],
  },
  {
    src: "/install-heat-pump-passage.jpg",
    alt: "Twin-fan Vaillant air source heat pump on a neatly block-paved passage beside a brick home, Staffordshire",
    caption: "Twin-fan unit, tucked along the side passage",
    tags: ["homepage", "install-page", "hero"],
  },
  {
    src: "/install-cylinder-plant-room.jpg",
    alt: "Hot water cylinder with neat copper pipework, expansion vessels and controls in a Staffordshire plant room installed by PG Renewables",
    caption: "The bit customers never expect to be this tidy",
    tags: ["homepage", "install-page", "hero"],
  },
  {
    src: "/install-heat-pump-patio.jpg",
    alt: "Front view of a twin-fan Vaillant air source heat pump on a sunny patio, Staffordshire installation",
    caption: "Twin-fan aroTHERM plus, Staffordshire",
    tags: ["homepage", "install-page"],
  },
  {
    src: "/install-heat-pump-gravel-pad.jpg",
    alt: "Vaillant aroTHERM plus heat pump on a gravel pad against a cream wall, installed by PG Renewables",
    caption: "Set on a gravel pad, quiet and out of the way",
    tags: ["install-page", "zerodisrupt"],
  },
  {
    src: "/install-heat-pump-twin-fan-sun.jpg",
    alt: "Tall twin-fan Vaillant heat pump on brick paving in bright sunshine, Staffordshire",
    caption: "Sized right for a larger home",
    tags: ["install-page", "zerodisrupt"],
  },
  {
    src: "/install-heat-pump-upright.jpg",
    alt: "Air source heat pump on a gravel pad with tidy pipework and controls along the wall, Staffordshire",
    caption: "Neat pipework as standard",
    tags: ["install-page"],
  },
  {
    src: "/install-heat-pump-new-build.jpg",
    alt: "Newly installed Vaillant aroTHERM plus heat pump in a tidy new-build garden corner, Staffordshire",
    caption: "Fresh off the tools, stickers still on",
    tags: ["install-page", "zerodisrupt"],
  },
];

export function photosFor(tag: InstallPhoto["tags"][number], limit?: number): InstallPhoto[] {
  const matches = INSTALL_PHOTOS.filter((p) => p.tags.includes(tag));
  return limit ? matches.slice(0, limit) : matches;
}
