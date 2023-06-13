/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com',
      'drive.google.com']
  },
  experimental: {
    swcFileReading: false
  }
}

module.exports = nextConfig
