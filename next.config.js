/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
    dest: 'public',
    disable: process.env.NODE_ENV === "development",
    register: true,
    scope: "/",
    sw: "/service-worker.js",
})
const nextConfig = {
    webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
 },
}

module.exports = withPWA(nextConfig)
