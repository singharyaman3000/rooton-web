const GET_BLOG_DETAILS =
  '/api/blogs/?populate[0]=media_url&populate[1]=author_profile_image.media_url&populate[2]=blog_contents.media_url&pagination[page]=1&pagination[pageSize]=1&filters[id][$eq]=<blogId>';

export const getBlogDetailsUrl = (blogId: string) => {
  return GET_BLOG_DETAILS.replace('<blogId>', blogId);
};
