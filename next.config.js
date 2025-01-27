/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com'], // Add allowed domains here
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true, // Set to true for a permanent redirect (301)
      },
    ];
  },
};

module.exports = nextConfig;
