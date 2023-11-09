export const HOME_API =
  '/api/home-pages?populate[0]=media_url&populate[2]=footers.media_url&populate[3]=home_page_contents.media_url&populate[4]=home_page_contents.core_services.media_url&populate[5]=home_page_contents.core_services.sub_services&populate[6]=home_page_contents.blogs.media_url';
export const TESTIMONIAL_API = '/api/testimonials?populate[0]=media_url&populate[2]=icon&populate[3]=profile_picture';
export const HEADER_FOOTER_API = '/api/commons?populate[0]=addresses.media_url&populate[1]=languages.media_url&populate[3]=core_services.sub_services&populate[4]=whats_app.profile_image';
export const TESTIMONIAL_API_SERVICE = '/api/testimonials?populate[0]=media_url&populate[2]=icon&populate[3]=profile_picture&filters[service_type][$eq]=<service_type>';
export const COACHING_API ='/api/coaching-pages?populate[0]=media_url&populate[2]=footers.media_url&populate[3]=coaching_page_contents.media_url&populate[4]=coaching_page_contents.coaching_services.media_url&populate[5]=coaching_page_contents.coaching_services.coaching_service_contents&populate[6]=coaching_page_contents';
export const TESTIMONIAL_COACHING_API = '/api/testimonials?populate[0]=media_url&populate[2]=icon&populate[3]=profile_picture&filters[service_type][$contains]=coaching';

