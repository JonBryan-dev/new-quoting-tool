import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // URLs from the previous site on this domain that Google still has
    // indexed — redirect rather than 404 so visitors and link equity land
    // on the closest current page.
    return [
      {
        source: "/boiler-servicing",
        destination: "/quote/boiler",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
