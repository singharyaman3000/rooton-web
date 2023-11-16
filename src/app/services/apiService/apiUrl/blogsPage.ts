/* eslint-disable max-len */
import { SOURCE_PAGE } from '@/components/BlogsListPage/constants';
import { GET_BLOGS_HOME, GET_BLOGS_SERVICE } from './servicePage';
import { ArticleCategoryType } from '../blogsListAPI';

export const GET_BLOGS_HEADER_CONTENT = '/api/blog-home-pages/?populate[0]=media_url';
const GET_BLOGS_LIST =
  '/api/blogs/?populate[0]=media_url&populate[1]=author_profile_image.media_url&pagination[page]=<pageNo>&pagination[pageSize]=<pageSize>&filters[category][$eq]=<articleType>&sort=<sortBy>';
const GET_BLOGS_LIST_WITH_SERVICETYPE_AND_BLOGTYPE =
  '/api/blogs/?populate[0]=media_url&populate[1]=author_profile_image.media_url&populate[2]=blog_contents.media_url&pagination[page]=<pageNo>&pagination[pageSize]=8&filters[service_type][$eq]=<serviceType>&filters[category][$eq]=<articleType>&filters[id][$ne]=<currentBlogId>&sort=<sortBy>';

export const getBlogsListUrl = (
  articleType: ArticleCategoryType,
  pageNo: number,
  sourcePage: string,
  serviceType: string,
  blogId?: string,
) => {
  let url = '';
  const pageSize = 8;

  if (sourcePage === SOURCE_PAGE.HOME) url = GET_BLOGS_HOME;
  else if (sourcePage === SOURCE_PAGE.SERVICE) url = GET_BLOGS_SERVICE.replace('<service-type>', serviceType);
  else if (sourcePage === SOURCE_PAGE.BLOG_DETAILS)
    url = GET_BLOGS_LIST_WITH_SERVICETYPE_AND_BLOGTYPE.replace('<serviceType>', serviceType)
      .replace('<articleType>', articleType)
      .replace('<currentBlogId>', blogId ?? '')
      .replace('<sortBy>', articleType === 'blog' ? 'views:desc' : 'updatedAt:desc');
  else {
    url = GET_BLOGS_LIST.replace('<articleType>', articleType).replace(
      '<sortBy>',
      articleType === 'blog' ? 'views:desc' : 'updatedAt:desc',
    );
  }

  return url.replace('<pageNo>', pageNo.toString()).replace('<pageSize>', pageSize.toString());
};
