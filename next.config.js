/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
    dest: 'public'
})
const nextConfig = {
    webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
 },
}

module.exports = withPWA(nextConfig)
