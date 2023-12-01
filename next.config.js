/** @type {import('next').NextConfig} */
const { getHeaderFooterServerData } = require('./src/app/services/apiService/headerFooterServerAPI');

const withPWA = require('next-pwa')({
  dest: 'public',
});

const nextConfig = {
  env: {
    NEXT_API_BASE_URL: process.env.NEXT_API_BASE_URL,
    NEXT_ASSETS_BASEURL: process.env.NEXT_ASSETS_BASEURL,
    NEXT_APP_ENVIRONMENT: process.env.NEXT_APP_ENVIRONMENT,
    NEXT_APP_BASE_URL: process.env.NEXT_APP_BASE_URL,
    NEXT_APP_MAIN_DOMAIN: process.env.NEXT_APP_MAIN_DOMAIN,
    NEXT_GOOGLE_MAP_KEY: process.env.NEXT_GOOGLE_MAP_KEY,
  },
  images: {
    domains: [process.env.NEXT_ASSET_DOMAIN.toString()],
    minimumCacheTTL: 60 * 60,
  },
  future: { webpack5: true },
  async rewrites() {
    const apiData = await getHeaderFooterServerData();

    const allServicesIds = [];

    apiData[0]?.attributes.core_services.data?.forEach((service) => {
      const subServices = service?.attributes?.sub_services?.data ?? [];
      if (subServices.length > 0) {
        subServices.forEach((subService) => {
          allServicesIds.push({
            serviceName: subService.attributes.unique_identifier_name ?? '',
            serviceId: subService.id ?? '',
          });
        });
      }
    });

    const allLanguages = apiData[0]?.attributes.languages.data?.flatMap((language) => {
      return language.attributes.code !== 'en' ? language.attributes.code : [];
    });

    const allServicesLanUrls = [];

    allLanguages?.forEach((lan) => {
      allServicesIds.forEach((service) => {
        allServicesLanUrls.push({
          source: `/${lan}/${service.serviceName}`,
          destination: `/${lan}/service/${service.serviceId}`,
        });
      });
    });

    const reRouteMap = allServicesIds.map((service) => {
      return { source: `/${service.serviceName}`, destination: `/service/${service.serviceId}` };
    });

    return [...reRouteMap, ...allServicesLanUrls];
  },
};

module.exports = nextConfig;
