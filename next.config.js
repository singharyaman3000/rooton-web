/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
    dest: 'public'
  })

  




const nextConfig = {
    env: {
        NEXT_API_BASE_URL: process.env.NEXT_API_BASE_URL,
        NEXT_ASSETS_BASEURL : process.env.NEXT_ASSETS_BASEURL,
        NEXT_APP_ENVIRONMENT : process.env.NEXT_APP_ENVIRONMENT,
        NEXT_APP_BASE_URL : process.env.NEXT_APP_BASE_URL,
        NEXT_APP_MAIN_DOMAIN :process.env.NEXT_APP_MAIN_DOMAIN
    },
    images:{
        domains : [process.env.NEXT_ASSET_DOMAIN.toString()],
        minimumCacheTTL: 60 * 60
      }
};

module.exports = nextConfig;
