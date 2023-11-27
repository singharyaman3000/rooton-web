import { MetadataRoute } from 'next';
import { getHeaderFooterData } from './services/apiService/headerFooterAPI';
// import { IPageMetaAttributes } from './services/apiService/pagesSEOMetadata';

const SITE_URL = process.env.NEXT_APP_BASE_URL ?? '';

const ALL_COACHING_IDS = [1, 2, 3, 4, 5, 6];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const apiRes = await getHeaderFooterData();
  // const seoDataRes = await getPagesSEOMetaData();

  // const pageData = seoDataRes?.length > 0 ? seoDataRes[0]?.attributes : ({} as IPageMetaAttributes);

  const allServicesIds: { serviceId: number; lastUpdated: string }[] = [];

  apiRes![0]?.attributes.core_services.data?.forEach((service) => {
    allServicesIds.push({ serviceId: service.id, lastUpdated: service.attributes.updatedAt });
    const subServices = service?.attributes?.sub_services?.data ?? [];
    if (subServices.length > 0) {
      subServices.forEach((subService) => {
        allServicesIds.push({ serviceId: subService.id, lastUpdated: subService.attributes.updatedAt });
      });
    }
  });

  const allServiceUrls = allServicesIds.map((data) => {
    return { url: `${SITE_URL}service/${data.serviceId}`, lastModified: new Date(data.lastUpdated) };
  });

  const allCoachingUrls = ALL_COACHING_IDS.map((id) => {
    return { url: `${SITE_URL}coaching/${id}`, lastModified: new Date() };
  });

  // return [
  //   { url: SITE_URL, lastModified: pageData?.home_page?.data?.attributes?.updatedAt },
  //   { url: `${SITE_URL}about-us`, lastModified: pageData?.home_page?.data?.attributes?.updatedAt },
  //   { url: `${SITE_URL}coaching`, lastModified: pageData?.coaching_page?.data?.attributes?.updatedAt },
  //   { url: `${SITE_URL}blogs`, lastModified: pageData?.home_page?.data?.attributes?.updatedAt },
  //   { url: `${SITE_URL}contact-us`, lastModified: pageData?.contact_us?.data?.attributes?.updatedAt },
  //   ...allServiceUrls,
  //   ...allCoachingUrls,
  // ];

  return [
    { url: SITE_URL, lastModified: new Date() },
    { url: `${SITE_URL}about-us`, lastModified: new Date() },
    { url: `${SITE_URL}coaching`, lastModified: new Date() },
    { url: `${SITE_URL}blogs`, lastModified: new Date() },
    { url: `${SITE_URL}contact-us`, lastModified: new Date() },
    ...allServiceUrls,
    ...allCoachingUrls,
  ];
}
