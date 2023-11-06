/* eslint-disable max-len */
import { SOURCE_PAGE } from '@/components/BlogsListPage/constants';
import { GET_BLOGS_HOME, GET_BLOGS_SERVICE } from './servicePage';

export const GET_BLOGS_HEADER_CONTENT = '/api/blog-home-pages/?populate[0]=media_url';
const GET_BLOGS_LIST =
  '/api/blogs/?populate[0]=media_url&populate[1]=author_profile_image.media_url&pagination[page]=<pageNo>&pagination[pageSize]=<pageSize>&filters[category][$eq]=<articleType>';

export const getBlogsListUrl = (articleType: string, pageNo: number, sourcePage: string,
  serviceType: string, pageSize: number = 8) => {
  let url = '';

  if (sourcePage === SOURCE_PAGE.HOME) url = GET_BLOGS_HOME;
  else if (sourcePage === SOURCE_PAGE.SERVICE) url = GET_BLOGS_SERVICE.replace('<service-type>', serviceType);
  else url = GET_BLOGS_LIST.replace('<articleType>', articleType);

  return url.replace('<pageNo>', pageNo.toString())
    .replace('<pageSize>', pageSize.toString());
};
