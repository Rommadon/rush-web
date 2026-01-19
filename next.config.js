/** @type {import('next').NextConfig} */

// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require('@sentry/nextjs');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

const moduleExports = {
  i18n: {
    locales: ["en", "th"],
    defaultLocale: "th",
    localeDetection: false,
  },
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: false,
  env: {
    API_HOST: process.env.API_HOST,
    INTERNAL_API_HOST: process.env.INTERNAL_API_HOST,
    NEXT_PUBLIC_ENV: 'PRODUCTION',
  },
  sentry: {
    disableServerWebpackPlugin: true,
    disableClientWebpackPlugin: true,
  },
  images: {
    domains: [
      'staging-shopdit.s3.ap-southeast-1.amazonaws.com',
      'staging-shopdit.s3.amazonaws.com',
      'production-shopdit.s3.ap-southeast-1.amazonaws.com',
      'production-shopdit.s3.amazonaws.com',
    ],
    minimumCacheTTL: 600,
  }
};

// const sentryWebpackPluginOptions = {
//   // Additional config options for the Sentry Webpack plugin. Keep in mind that
//   // the following options are set automatically, and overriding them is not
//   // recommended:
//   //   release, url, org, project, authToken, configFile, stripPrefix,
//   //   urlPrefix, include, ignore

//   silent: true, // Suppresses all logs
//   // For all available options, see:
//   // https://github.com/getsentry/sentry-webpack-plugin#options.
// };

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withBundleAnalyzer(withSentryConfig(moduleExports));

// module.exports = withTM({
//   i18n: {
//     locales: ["en", "th"],
//     defaultLocale: "th",
//     localeDetection: false,
//   },
//   poweredByHeader: false,
//   reactStrictMode: true,
//   swcMinify: true,
//   webpack: (config) => {
//     config.resolve.alias = {
//       ...config.resolve.alias,
//       "@mui/styled-engine": "@mui/styled-engine-sc",
//     };

//     // config.module.rules.push({
//     //   test: /\.svg$/,
//     //   use: ["@svgr/webpack"]
//     // });

//     return config;
//   },
// });
