import { MetadataRoute } from 'next';
import { getHeaderFooterData } from './services/apiService/headerFooterAPI';
import { IPageMetaAttributes, getPagesSEOMetaData } from './services/apiService/pagesSEOMetadata';
import { COACHING_SERVICES_ROUTES, TOOLS_SERVICES_ROUTES } from '@/components/SiteMapPage/constants';

const SITE_URL = process.env.NEXT_APP_BASE_URL ?? '';

type SiteDataType = { url: string; lastModified: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const apiRes = await getHeaderFooterData();
  const seoDataRes = await getPagesSEOMetaData();

  const pageData = seoDataRes?.length > 0 ? seoDataRes[0]?.attributes : ({} as IPageMetaAttributes);

  const allServicesIds: { serviceId: string; lastUpdated: string }[] = [];

  apiRes![0]?.attributes.core_services.data?.forEach((service) => {
    const subServices = service?.attributes?.sub_services?.data ?? [];
    if (subServices.length > 0) {
      subServices.forEach((subService) => {
        allServicesIds.push({
          serviceId: subService.attributes.unique_identifier_name ?? '',
          lastUpdated: subService.attributes.updatedAt ?? '',
        });
      });
    }
  });

  const allLanguages = apiRes![0]?.attributes.languages.data?.flatMap((language) => {
    return language.attributes.code !== 'en' ? language.attributes.code : [];
  });

  const allServiceUrls = allServicesIds.map((data) => {
    return { url: `${SITE_URL}${data.serviceId}`, lastModified: new Date(data.lastUpdated) };
  });

  const allCoachingUrls = COACHING_SERVICES_ROUTES.map((coaching) => {
    return { url: `${SITE_URL}${coaching.link}`, lastModified: new Date().toISOString() };
  });

  const allToolsUrls = TOOLS_SERVICES_ROUTES.map((tools) => {
    return { url: `${SITE_URL}${tools.link}`, lastModified: new Date().toISOString() };
  });

  const allHomeLanRoutes =
    allLanguages?.map((lan) => {
      return { url: `${SITE_URL}${lan}`, lastModified: pageData?.home_page?.data?.attributes?.updatedAt };
    }) ?? [];

  const allAboutUsLanRoutes =
    allLanguages?.map((lan) => {
      return { url: `${SITE_URL}${lan}/about-us`, lastModified: pageData?.home_page?.data?.attributes?.updatedAt };
    }) ?? [];

  const allCoachingLanRoutes =
    allLanguages?.map((lan) => {
      return { url: `${SITE_URL}${lan}/coaching`, lastModified: pageData?.coaching_page?.data?.attributes?.updatedAt };
    }) ?? [];

  const allToolsLanRoutes =
    allLanguages?.map((lan) => {
      return { url: `${SITE_URL}${lan}/tools`, lastModified: pageData?.tools_page?.data?.attributes?.updatedAt };
    }) ?? [];

  const allBlogsLanRoutes =
    allLanguages?.map((lan) => {
      return { url: `${SITE_URL}${lan}/blogs`, lastModified: pageData?.coaching_page?.data?.attributes?.updatedAt };
    }) ?? [];

  const allContactUsLanRoutes =
    allLanguages?.map((lan) => {
      return { url: `${SITE_URL}${lan}/contact-us`, lastModified: pageData?.contact_us?.data?.attributes?.updatedAt };
    }) ?? [];

  const allPrivacyPolicyLanRoutes =
    allLanguages?.map((lan) => {
      return {
        url: `${SITE_URL}${lan}/privacy-policy`,
        lastModified: new Date().toISOString(),
      };
    }) ?? [];

  const allDisclaimerLanRoutes =
    allLanguages?.map((lan) => {
      return { url: `${SITE_URL}${lan}/disclaimer`, lastModified: new Date().toISOString() };
    }) ?? [];

  const allTermsAndConditionsLanRoutes =
    allLanguages?.map((lan) => {
      return {
        url: `${SITE_URL}${lan}/terms-and-conditions`,
        lastModified: new Date().toISOString(),
      };
    }) ?? [];

  const allServicesLanUrls: SiteDataType[] = [];

  allLanguages?.forEach((lan) => {
    allServicesIds.forEach((service) => {
      allServicesLanUrls.push({
        url: `${SITE_URL}${lan}/${service.serviceId}`,
        lastModified: service.lastUpdated,
      });
    });
  });

  const allCoachingServicesLanUrls: SiteDataType[] = [];

  allLanguages?.forEach((lan) => {
    COACHING_SERVICES_ROUTES.forEach((coaching) => {
      allCoachingServicesLanUrls.push({
        url: `${SITE_URL}${lan}/${coaching.link}`,
        lastModified: new Date().toISOString(),
      });
    });
  });

  return [
    { url: SITE_URL, lastModified: pageData?.home_page?.data?.attributes?.updatedAt },
    { url: `${SITE_URL}about-us`, lastModified: pageData?.home_page?.data?.attributes?.updatedAt },
    { url: `${SITE_URL}coaching`, lastModified: pageData?.coaching_page?.data?.attributes?.updatedAt },
    { url: `${SITE_URL}tools`, lastModified: pageData?.tools_page?.data?.attributes?.updatedAt },
    { url: `${SITE_URL}blogs`, lastModified: pageData?.home_page?.data?.attributes?.updatedAt },
    { url: `${SITE_URL}contact-us`, lastModified: pageData?.contact_us?.data?.attributes?.updatedAt },
    { url: `${SITE_URL}privacy-policy`, lastModified: pageData?.contact_us?.data?.attributes?.updatedAt },
    { url: `${SITE_URL}disclaimer`, lastModified: pageData?.contact_us?.data?.attributes?.updatedAt },
    { url: `${SITE_URL}terms-and-conditions`, lastModified: pageData?.contact_us?.data?.attributes?.updatedAt },
    ...allServiceUrls,
    ...allCoachingUrls,
    ...allToolsUrls,
    ...allHomeLanRoutes,
    ...allAboutUsLanRoutes,
    ...allCoachingLanRoutes,
    ...allToolsLanRoutes,
    ...allBlogsLanRoutes,
    ...allContactUsLanRoutes,
    ...allServicesLanUrls,
    ...allCoachingServicesLanUrls,
    ...allPrivacyPolicyLanRoutes,
    ...allDisclaimerLanRoutes,
    ...allTermsAndConditionsLanRoutes,
  ];
}
