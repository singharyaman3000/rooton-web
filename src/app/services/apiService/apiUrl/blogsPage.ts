export const GET_BLOGS_HEADER_CONTENT = '/api/blog-home-pages/?populate[0]=media_url';
const GET_BLOGS_LIST =
   '/api/blogs/?populate[0]=media_url&populate[1]=author_profile_image.media_url&pagination[page]=<pageNo>&pagination[pageSize]=<pageSize>&filters[category][$eq]=<articleType>';

export const getBlogsListUrl = (articleType: string, pageNo: number, pageSize: number = 8) => {
  return GET_BLOGS_LIST.replace('<articleType>', articleType)
    .replace('<pageNo>', pageNo.toString())
    .replace('<pageSize>', pageSize.toString());
};
