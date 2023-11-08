/* eslint-disable max-len */
import { SOURCE_PAGE } from '@/components/BlogsListPage/constants';
import { GET_BLOGS_HOME, GET_BLOGS_SERVICE } from './servicePage';

export const GET_BLOGS_HEADER_CONTENT = '/api/blog-home-pages/?populate[0]=media_url';
const GET_BLOGS_LIST =
  '/api/blogs/?populate[0]=media_url&populate[1]=author_profile_image.media_url&pagination[page]=<pageNo>&pagination[pageSize]=<pageSize>&filters[category][$eq]=<articleType>&sort=views:desc';
const GET_BLOGS_LIST_WITH_SERVICETYPE_AND_BLOGTYPE =
  '/api/blogs/?populate[0]=media_url&populate[1]=author_profile_image.media_url&populate[2]=blog_contents.media_url&pagination[page]=1&pagination[pageSize]=3&filters[service_type][$eq]=<serviceType>&filters[category][$eq]=<articleType>';

export const getBlogsListUrl = (
  articleType: string,
  pageNo: number,
  sourcePage: string,
  serviceType: string,
  pageSize: number = 8,
) => {
  let url = '';

  if (sourcePage === SOURCE_PAGE.HOME) url = GET_BLOGS_HOME;
  else if (sourcePage === SOURCE_PAGE.SERVICE) url = GET_BLOGS_SERVICE.replace('<service-type>', serviceType);
  else if (sourcePage === SOURCE_PAGE.BLOG_DETAILS)
    url = GET_BLOGS_LIST_WITH_SERVICETYPE_AND_BLOGTYPE.replace('<serviceType>', serviceType).replace(
      '<articleType>',
      articleType,
    );
  else url = GET_BLOGS_LIST.replace('<articleType>', articleType);

  return url.replace('<pageNo>', pageNo.toString()).replace('<pageSize>', pageSize.toString());
};
