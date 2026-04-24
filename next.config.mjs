/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  async rewrites() {
    return [
      { source: '/landing-webchat', destination: '/landing-webchat/index.html' },
    ];
  },
};

export default nextConfig;
