/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',
  // appDir is now default in Next.js 14, so we don't need to specify it
}

module.exports = nextConfig 