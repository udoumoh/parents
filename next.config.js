/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
    dest: 'public',
    disable: process.env.NODE_ENV === "development",
    register: true,
    scope: "/",
    sw: "/sw.js",
})
const nextConfig = {
    webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
 },
 images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'upcdn.io',
        port: '',
      },
    ],
  },
}

module.exports = withPWA(nextConfig)
