/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        // State-level subdomains, e.g. rajasthan.luventra.co -> /state/rajasthan
        // NOTE: production state and city subdomains live on different root
        // domains (.co vs .com), so there's no collision there. For local dev
        // (where both would otherwise share the ambiguous `*.localhost`
        // pattern), state subdomains use a `state-` prefix to disambiguate
        // from city subdomains, e.g. state-rajasthan.localhost -> /state/rajasthan
        {
          source: '/:path*',
          has: [{ type: 'host', value: '(?<state>[a-z]+(?:-[a-z]+)*)\\.luventra\\.co' }],
          destination: '/state/:state/:path*',
        },
        {
          source: '/:path*',
          has: [{ type: 'host', value: 'state-(?<state>[a-z]+(?:-[a-z]+)*)\\.localhost' }],
          destination: '/state/:state/:path*',
        },
        // City-level subdomains, e.g. mussoorie.luventra.com -> /city/mussoorie
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
