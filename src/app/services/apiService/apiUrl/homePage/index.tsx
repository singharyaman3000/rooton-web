export const HOME_API =
  '/api/home-pages?populate[0]=media_url&populate[2]=footers.media_url&populate[3]=home_page_contents.media_url&populate[4]=home_page_contents.core_services.media_url&populate[5]=home_page_contents.core_services.sub_services&populate[6]=home_page_contents.blogs.media_url';
export const TESTIMONIAL_API = '/api/testimonials?populate[0]=media_url&populate[2]=icon&populate[3]=profile_picture';
export const HEADER_FOOTER_API = '/api/commons?populate[0]=addresses.media_url&populate[1]=languages.media_url&populate[3]=core_services.sub_services&populate[4]=whats_app';
