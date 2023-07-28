/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BASE_URL: process.env.API_BASE_URL,
        NEXT_ASSETS_BASEURL : process.env.NEXT_ASSETS_BASEURL,
        NEXT_APP_ENVIRONMENT : process.env.NEXT_APP_ENVIRONMENT
    },
    images:{
        domains :process.env.NEXT_APP_ENVIRONMENT === "development" ?  ['rootonweb-dev-be.qburst.build'] : [''],
        minimumCacheTTL: 60 * 60
      }
};

module.exports = nextConfig;
