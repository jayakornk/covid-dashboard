/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(
  withPWA({
    target: 'serverless',
    pwa: {
      dest: 'public',
      disable: process.env.NODE_ENV === 'development',
      runtimeCaching,
    },
    reactStrictMode: true,
    poweredByHeader: false,
    future: {
      webpack5: true,
    },
    async headers() {
      return [
        {
          source: '/:path*{/}?',
          headers: [
            {
              key: 'Cross-Origin-Embedder-Policy',
              value: 'require-corp',
            },
            {
              key: 'Cross-Origin-Opener-Policy',
              value: 'same-origin',
            },
          ],
        },
      ];
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // Note: we provide webpack above so you should not `require` it
      // Perform customizations to webpack config
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /moment$/,
        })
      );

      // Important: return the modified config
      return config;
    },
  })
);
