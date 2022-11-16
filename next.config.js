/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "default",
    domains: ["strapi.vzk.ru"],
  },
}

module.exports = nextConfig