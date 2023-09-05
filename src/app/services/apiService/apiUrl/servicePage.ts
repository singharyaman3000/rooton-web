const SERVICE_API =
  '/api/sub-services/<service-id>?populate[0]=media_url&populate[1]=sub_services_contents.media_url&populate[2]=blogs.media_url';

export const getServiceAPIUrl = (serviceId: unknown) => {
  return SERVICE_API.replace('<service-id>', serviceId as string);
};

export const GET_BLOGS_SERVICE = '/api/blogs/?populate[0]=media_url&populate[1]=author_profile_image.media_url&populate[2]=blog_contents.media_url&pagination[page]=1&pagination[pageSize]=3&filters[service_type][$eq]=study-visa&filters[category][$eq]=blog';

export const GET_BLOGS_HOME = 'https://rootonweb-dev-be.qburst.build/api/blogs/?populate[0]=media_url&populate[1]=author_profile_image.media_url&populate[2]=blog_contents.media_url&pagination[page]=1&pagination[pageSize]=3&filters[category][$eq]=news';
