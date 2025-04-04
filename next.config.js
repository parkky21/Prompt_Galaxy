/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },

}

module.exports = nextConfig
