import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Mark these modules as external only for the server-side build
      config.externals.push('react-froala-wysiwyg', 'froala-editor');
    }
    return config;
  },
};

export default nextConfig;
