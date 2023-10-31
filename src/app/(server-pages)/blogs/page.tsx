import { IBlogsHomeContent, getBlogsHomeContent } from '@/app/services/apiService/blogsHomeAPI';
import BlogsListPage from '@/components/BlogsListPage/BlogsListPage';

export default async function BlogsHomePage() {
  const apiRes = (await getBlogsHomeContent()) as IBlogsHomeContent;

  return <BlogsListPage blogsHeaderData={apiRes} />;
};
