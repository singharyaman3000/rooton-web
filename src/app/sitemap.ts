import { MetadataRoute } from 'next';
import { getHeaderFooterData } from './services/apiService/headerFooterAPI';
import { IPageMetaAttributes, getPagesSEOMetaData } from './services/apiService/pagesSEOMetadata';
import { COACHING_SERVICES_ROUTES } from '@/components/SiteMapPage/constants';

const SITE_URL = process.env.NEXT_APP_BASE_URL ?? '';

type SiteDataType = { url: string; lastModified: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const apiRes = await getHeaderFooterData();
  const seoDataRes = await getPagesSEOMetaData();

  const pageData = seoDataRes?.length > 0 ? seoDataRes[0]?.attributes : ({} as IPageMetaAttributes);

  // const ALL_COACHING_IDS = ['ielts-online-coaching', 'pte-online-classes', 'celpip-course-online', 'duolingo-english-test-preparation', 'toefl-online-course', 'delf-preparation-course-online'];

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
    return { url: `${SITE_URL}service/${data.serviceId}`, lastModified: new Date(data.lastUpdated) };
  });

  const allCoachingUrls = COACHING_SERVICES_ROUTES.map((coaching) => {
    return { url: `${SITE_URL}${coaching.link}`, lastModified: new Date() };
  });

  const allHomeLanRoutes =
    allLanguages?.map((lan) => {
      return { url: `${SITE_URL}${lan}`, lastModified: pageData?.home_page?.data?.attributes?.updatedAt };
    }) ?? [];

  const allAboutUsLanRoutes =
    allLanguages?.map((lan) => {
      return { url: `${SITE_URL}about-us/${lan}`, lastModified: pageData?.home_page?.data?.attributes?.updatedAt };
    }) ?? [];

  const allCoachingLanRoutes =
    allLanguages?.map((lan) => {
      return { url: `${SITE_URL}coaching/${lan}`, lastModified: pageData?.coaching_page?.data?.attributes?.updatedAt };
    }) ?? [];

  const allBlogsLanRoutes =
    allLanguages?.map((lan) => {
      return { url: `${SITE_URL}blogs/${lan}`, lastModified: pageData?.coaching_page?.data?.attributes?.updatedAt };
    }) ?? [];

  const allContactUsLanRoutes =
    allLanguages?.map((lan) => {
      return { url: `${SITE_URL}contact-us/${lan}`, lastModified: pageData?.contact_us?.data?.attributes?.updatedAt };
    }) ?? [];

  const allServicesLanUrls: SiteDataType[] = [];

  allLanguages?.forEach((lan) => {
    allServicesIds.forEach((service) => {
      allServicesLanUrls.push({
        url: `${SITE_URL}service/${lan}/${service.serviceId}`,
        lastModified: service.lastUpdated,
      });
    });
  });

  const allCoachingServicesLanUrls: SiteDataType[] = [];

  allLanguages?.forEach((lan) => {
    COACHING_SERVICES_ROUTES.forEach((coaching) => {
      allCoachingServicesLanUrls.push({
        url: `${SITE_URL}${lan}${coaching.link}`,
        lastModified: '',
      });
    });
  });

  return [
    { url: SITE_URL, lastModified: pageData?.home_page?.data?.attributes?.updatedAt },
    { url: `${SITE_URL}about-us`, lastModified: pageData?.home_page?.data?.attributes?.updatedAt },
    { url: `${SITE_URL}coaching`, lastModified: pageData?.coaching_page?.data?.attributes?.updatedAt },
    { url: `${SITE_URL}blogs`, lastModified: pageData?.home_page?.data?.attributes?.updatedAt },
    { url: `${SITE_URL}contact-us`, lastModified: pageData?.contact_us?.data?.attributes?.updatedAt },
    ...allServiceUrls,
    ...allCoachingUrls,
    ...allHomeLanRoutes,
    ...allAboutUsLanRoutes,
    ...allCoachingLanRoutes,
    ...allBlogsLanRoutes,
    ...allContactUsLanRoutes,
    ...allServicesLanUrls,
    ...allCoachingServicesLanUrls,
  ];
}
