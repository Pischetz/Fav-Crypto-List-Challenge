/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: ['api.cryptapi.io'],
  },
}

module.exports = nextConfig
