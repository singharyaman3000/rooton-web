import { IBlogDetailsResponse, getBlogDetails } from '@/app/services/apiService/blogDetailAPI';
import BlogDetails from '@/components/BlogsDetails';

type BlogsDetailPageProps = {
  params: { blogId: string };
};

export default async function BlogsDetailPage(props: BlogsDetailPageProps) {
  const response = (await getBlogDetails('15')) as IBlogDetailsResponse;

  return <BlogDetails details={response?.data[0]} />;
}
