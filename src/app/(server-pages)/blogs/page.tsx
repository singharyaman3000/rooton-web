import { metaInfo } from '@/app/constants/pageMetaInfo';
import { IBlogsHomeContent, getBlogsHomeContent } from '@/app/services/apiService/blogsHomeAPI';
import BlogsListPage from '@/components/BlogsListPage/BlogsListPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: metaInfo.blogs.title,
  description: metaInfo.blogs.description,
  alternates: { canonical: 'https://rooton.ca/blogs' },
  // to be removed in production
  robots: {
    index: false,
  },
};

export default async function BlogsHomePage() {
  const apiRes = (await getBlogsHomeContent()) as IBlogsHomeContent;

  return <BlogsListPage blogsHeaderData={apiRes} />;
}
