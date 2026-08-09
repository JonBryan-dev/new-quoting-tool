// Manifest of real job photos in /public. Populated from the photo
// catalogue; alt text stays honest — "Staffordshire" until Jon confirms
// a specific town for a given shot.

export interface InstallPhoto {
  src: string;
  alt: string;
  caption?: string;
  /** where this photo is worth showing */
  tags: ("homepage" | "install-page" | "zerodisrupt" | "hero")[];
}

// Filled in once the photo catalogue is complete.
export const INSTALL_PHOTOS: InstallPhoto[] = [];

export function photosFor(tag: InstallPhoto["tags"][number], limit?: number): InstallPhoto[] {
  const matches = INSTALL_PHOTOS.filter((p) => p.tags.includes(tag));
  return limit ? matches.slice(0, limit) : matches;
}
