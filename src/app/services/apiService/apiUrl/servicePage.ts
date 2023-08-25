const SERVICE_API =
  '/api/sub-services/<service-id>?populate[0]=media_url&populate[1]=sub_services_contents.media_url&populate[2]=blogs.media_url';

export const getServiceAPIUrl = (serviceId: unknown) => {
  return SERVICE_API.replace('<service-id>', serviceId as string);
};
