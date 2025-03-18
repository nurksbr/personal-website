/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: {
    position: 'bottom-right'
  },
  experimental: {
    scrollRestoration: true
  }
}

module.exports = nextConfig 