import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // URLs from the previous site on this domain that Google still has
    // indexed — redirect rather than 404 so visitors and link equity land
    // on the closest current page.
    return [
      {
        source: "/boiler-servicing",
        destination: "/services/boiler-servicing",
        permanent: true,
      },
      {
        source: "/areas/:town",
        destination: "/heat-pumps/:town",
        permanent: true,
      },
      // Short forms people type or link to, pointed at the real pages
      {
        source: "/air-conditioning",
        destination: "/services/air-conditioning",
        permanent: true,
      },
      {
        source: "/boiler-installation",
        destination: "/services/boiler-installation",
        permanent: true,
      },
      {
        source: "/new-boiler",
        destination: "/services/boiler-installation",
        permanent: true,
      },
      {
        source: "/oil-grant",
        destination: "/oil-boiler-grant",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
