const SERVICE_API =
  '/api/sub-services/<service-id>?populate[0]=media_url&populate[1]=sub_services_co' +
  'ntents.media_url&populate[2]=blogs.media_url';

const COACHING_SERVICE_API =
  '/api/coaching-services/<service-id>?populate[0]=media_url&populate[1]=coaching_s' +
  'ervice_contents.media_url&populate[2]=blogs.media_url';

const TOOLS_SERVICE_API =
  '/api/tools/<service-id>?populate[0]=media_url&populate[1]=tools_contents.media_url&populate[2]=blogs.media_url';

export const getServiceAPIUrl = (serviceId: unknown) => {
  return SERVICE_API.replace('<service-id>', serviceId as string);
};

export const getCoachingAPIUrl = (coachingId: unknown) => {
  return COACHING_SERVICE_API.replace('<service-id>', coachingId as string);
};

export const getToolsAPIUrl = (toolsId: unknown) => {
  return TOOLS_SERVICE_API.replace('<service-id>', toolsId as string);
};

export const GET_BLOGS_SERVICE =
  '/api/blogs/?populate[0]=media_url&populate[1]=author_profile_image.media_url&pop' +
  'ulate[2]=blog_contents.media_url&pagination[page]=<pageNo>&pagination[pageSize]=' +
  '<pageSize>&filters[service_type][$eq]=<service-type>&filters[category][$eq]=blog';

export const GET_BLOGS_HOME =
  '/api/blogs/?populate[0]=media_url&populate[1]=author_profile_image.media_url&pop' +
  'ulate[2]=blog_contents.media_url&pagination[page]=<pageNo>&pagination[pageSize]=' +
  '<pageSize>&filters[category][$eq]=news';

export const GET_BLOGS_COACHING_SERVICE =
  '/api/blogs/?populate[0]=media_url&populate[1]=author_profile_image.media_url&pop' +
  'ulate[2]=blog_contents.media_url&pagination[page]=1&pagination[pageSize]=20&filt' +
  'ers[service_type][$eq]=<service-type>&filters[category][$eq]=coaching-tips';

const GET_SERVICE_META_INFO =
  '/api/sub-services?fields[0]=meta_title&fields[1]=meta_description&fields[2]=unique_identifier_name&filters[id][$eq]=<serviceId>';

export const getServiceMetaInfoUrl = (serviceId: string) => {
  return GET_SERVICE_META_INFO.replace('<serviceId>', serviceId);
};

const COACHING_SERVICE_META_INFO =
  '/api/coaching-services?fields[0]=meta_title&fields[1]=meta_description&fields[2]=unique_identifier_name&filters[id][$eq]=<serviceId>';

export const getCoachingMetaInfoUrl = (coachingId: string) => {
  return COACHING_SERVICE_META_INFO.replace('<serviceId>', coachingId);
};

const TOOLS_SERVICE_META_INFO =
  '/api/tools?fields[0]=meta_title&fields[1]=meta_description&fields[2]=unique_identifier_name&filters[id][$eq]=<serviceId>';

export const getToolsMetaInfoUrl = (toolsId: string) => {
  return TOOLS_SERVICE_META_INFO.replace('<serviceId>', toolsId);
};

const BLOGS_META_INFO =
  '/api/blogs?fields[0]=meta_title&fields[1]=meta_description&fields[2]=unique_identifier_name&filters[id][$eq]=<blogId>';

export const getBlogsMetaInfoUrl = (serviceId: string) => {
  return BLOGS_META_INFO.replace('<blogId>', serviceId);
};
