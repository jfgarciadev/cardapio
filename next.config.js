/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  // disable: process.env.NODE_ENV === 'development',
  // register: true,
  scope: '/src/pages/',
  // sw: 'service-worker.js',
  //...
})


const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'example.com', 'plus.unsplash.com'],
  },
}

module.exports = withPWA(nextConfig);
