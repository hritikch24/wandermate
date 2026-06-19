/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:path*',
          has: [{ type: 'host', value: '(?<city>[a-z]+)\\.luventra\\.com' }],
          destination: '/city/:city/:path*',
        },
        {
          source: '/:path*',
          has: [{ type: 'host', value: '(?<city>[a-z]+)\\.localhost' }],
          destination: '/city/:city/:path*',
        },
      ],
    };
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};

module.exports = nextConfig;
