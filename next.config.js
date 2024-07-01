/** @type {import('next').NextConfig} */
const { getHeaderFooterServerData } = require('./src/app/services/apiService/headerFooterServerAPI');
const {
  getCoachingCoachingServicesServerData,
} = require('./src/app/services/apiService/coachingCoachingServicesServerAPI');
const { getToolsToolServicesServerData } = require('./src/app/services/apiService/toolsToolServicesServerAPI');
const { getPolicyServerData } = require('./src/app/services/apiService/policyServerAPI');

const nextConfig = {
  experimental: {
    serverActions: true,
  },
  env: {
    NEXT_API_BASE_URL: process.env.NEXT_API_BASE_URL,
    NEXT_ASSETS_BASEURL: process.env.NEXT_ASSETS_BASEURL,
    NEXT_APP_ENVIRONMENT: process.env.NEXT_APP_ENVIRONMENT,
    NEXT_APP_BASE_URL: process.env.NEXT_APP_BASE_URL,
    NEXT_APP_MAIN_DOMAIN: process.env.NEXT_APP_MAIN_DOMAIN,
    NEXT_GOOGLE_MAP_KEY: process.env.NEXT_GOOGLE_MAP_KEY,
    NEXT_NEWS_API_START_LIMIT: process.env.NEXT_NEWS_API_START_LIMIT,
    NEXT_SERVER_API_BASE_URL: process.env.NEXT_SERVER_API_BASE_URL,
    NEXT_ENCRYPTION_KEY: process.env.NEXT_ENCRYPTION_KEY,
  },
  images: {
    domains: [process.env.NEXT_ASSET_DOMAIN.toString()],
    minimumCacheTTL: 60 * 60,
  },
  async rewrites() {
    const apiData = await getHeaderFooterServerData();
    const coaching_apiData = await getCoachingCoachingServicesServerData();
    const tools_apiData = await getToolsToolServicesServerData();
    const policy_apiData = await getPolicyServerData();

    const allServicesIds = [];
    const allCoachingIds = [];
    const allToolsIds = [];

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

    const policyServices = Array.isArray(policy_apiData)
      ? policy_apiData.map((policy) => {
        return {
          policyName: policy.attributes.unique_identifier_name ?? '',
          policyId: policy.id ?? '',
        };
      })
      : [];

    coaching_apiData[0]?.attributes.coaching_page_contents.data?.forEach((coaching) => {
      const coaching_services = coaching?.attributes?.coaching_services?.data ?? [];
      if (coaching_services.length > 0) {
        coaching_services.forEach((coaching_service) => {
          allCoachingIds.push({
            coaching_serviceName: coaching_service.attributes.unique_identifier_name ?? '',
            coaching_serviceId: coaching_service.id ?? '',
          });
        });
      }
    });

    tools_apiData[0]?.attributes.tools_page_contents.data?.forEach((tool) => {
      const tools_data = tool?.attributes?.tools?.data ?? [];
      if (tools_data.length > 0) {
        tools_data.forEach((tools) => {
          allToolsIds.push({
            tools_serviceName: tools.attributes.unique_identifier_name ?? '',
            tools_serviceId: tools.id ?? '',
          });
        });
      }
    });
    const allLanguages = apiData[0]?.attributes.languages.data?.flatMap((language) => {
      return language.attributes.code !== 'en' ? language.attributes.code : [];
    });

    const allServicesLanUrls = [];
    const allCoachingServicesLanUrls = [];
    const allToolServicesLanUrls = [];

    // remapping /lan/service/[id] to /lan/[service-name]
    allLanguages?.forEach((lan) => {
      allServicesIds.forEach((service) => {
        allServicesLanUrls.push({
          source: `/${lan}/${service.serviceName}`,
          destination: `/${lan}/service/${service.serviceId}`,
        });
      });
    });

    // remapping /lan/policy/[id] to /lan/[policy-name]
    const allPolicyServicesLanUrls = allLanguages?.flatMap((lan) => {
      return policyServices.map((policy) => {
        return {
          source: `/${lan}/${policy.policyName}`,
          destination: `/${lan}/policy/${policy.policyId}`,
        };
      });
    });

    // remapping /lan/coaching/[id] to /lan/[coaching-name]
    allLanguages?.forEach((lan) => {
      allCoachingIds.forEach((coaching) => {
        allCoachingServicesLanUrls.push({
          source: `/${lan}/${coaching.coaching_serviceName}`,
          destination: `/${lan}/coaching/${coaching.coaching_serviceId}`,
        });
      });
    });

    // remapping /lan/tools/[id] to /lan/[coaching-name]
    allLanguages?.forEach((lan) => {
      allToolsIds.forEach((tools) => {
        allToolServicesLanUrls.push({
          source: `/${lan}/${tools.tools_serviceName}`,
          destination: `/${lan}/tools/${tools.tools_serviceId}`,
        });
      });
    });

    // remapping /service/[id] to /[service-name]
    const reRouteMap = allServicesIds.map((service) => {
      return { source: `/${service.serviceName}`, destination: `/service/${service.serviceId}` };
    });

    // remapping /policy/[id] to /[policy-name]
    const reRouteMap_policy = policyServices.map((policy) => {
      return {
        source: `/${policy.policyName}`,
        destination: `/policy/${policy.policyId}`,
      };
    });

    // remapping /coaching/[id] to /[coaching-name]
    const reRouteMap_coaching = allCoachingIds.map((coaching) => {
      return { source: `/${coaching.coaching_serviceName}`, destination: `/coaching/${coaching.coaching_serviceId}` };
    });

    // remapping /tools/[id] to /[tools-name]
    const reRouteMap_tools = allToolsIds.map((tools) => {
      return { source: `/${tools.tools_serviceName}`, destination: `/tools/${tools.tools_serviceId}` };
    });

    // remapping /blogs/* urls to /immigration-insights/*
    const blogsRemap = { source: '/immigration-insights/:path*', destination: '/blogs/:path*' };

    // remapping /lan/blogs/* to /lan/immigration-insights/*
    const allBlogsLanUrls = allLanguages?.map((lan) => {
      return { source: `/${lan}/immigration-insights/:path*`, destination: `/${lan}/blogs/:path*` };
    });

    return [
      ...reRouteMap,
      ...reRouteMap_coaching,
      ...reRouteMap_tools,
      ...reRouteMap_policy,
      ...allPolicyServicesLanUrls,
      ...allServicesLanUrls,
      ...allCoachingServicesLanUrls,
      ...allToolServicesLanUrls,
      ...allBlogsLanUrls,
      blogsRemap,
    ];
  },
};

module.exports = nextConfig;
