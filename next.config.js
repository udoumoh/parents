/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
    dest: 'public'
})
const nextConfig = {
    webpack: (config, {isServer}) => {
    if (!isServer) {
      config.resolve.alias.canvas = false;
    }

    return config;
 },
}

module.exports = withPWA(nextConfig)
