/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wcfnhjohdxajxfrwbbpz.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "asset.kompas.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.promediateknologi.id",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "klikku.id",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "humas.jatengprov.go.id",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
