const SERVICE_API = '/api/sub-services/<service-id>?populate[0]=media_url&populate[1]=sub_services_co' +
        'ntents.media_url&populate[2]=blogs.media_url';

const COACHING_SERVICE_API = '/api/coaching-services/<service-id>?populate[0]=media_url&populate[1]=coaching_s' +
        'ervice_contents.media_url&populate[2]=blogs.media_url';

export const getServiceAPIUrl = (serviceId : unknown) => {
  return SERVICE_API.replace('<service-id>', serviceId as string);
};

export const getCoachingAPIUrl = (coachingId : unknown) => {
  return COACHING_SERVICE_API.replace('<service-id>', coachingId as string);
};

export const GET_BLOGS_SERVICE = '/api/blogs/?populate[0]=media_url&populate[1]=author_profile_image.media_url&pop' +
        'ulate[2]=blog_contents.media_url&pagination[page]=<pageNo>&pagination[pageSize]=' +
        '<pageSize>&filters[service_type][$eq]=<service-type>&filters[category][$eq]=blog';

export const GET_BLOGS_HOME = '/api/blogs/?populate[0]=media_url&populate[1]=author_profile_image.media_url&pop' +
        'ulate[2]=blog_contents.media_url&pagination[page]=<pageNo>&pagination[pageSize]=' +
        '<pageSize>&filters[category][$eq]=news';

export const GET_BLOGS_COACHING_SERVICE = '/api/blogs/?populate[0]=media_url&populate[1]=author_profile_image.media_url&pop' +
        'ulate[2]=blog_contents.media_url&pagination[page]=1&pagination[pageSize]=20&filt' +
        'ers[service_type][$eq]=<service-type>&filters[category][$eq]=coaching-tips';
