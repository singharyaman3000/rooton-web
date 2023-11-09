import { IBlogDetailsResponse, getBlogDetails } from '@/app/services/apiService/blogDetailAPI';
import { ArticleCategoryType } from '@/app/services/apiService/blogsListAPI';
import BlogDetails from '@/components/BlogsDetails';

type BlogsDetailPageProps = {
  params: { blogId: string, blogType: ArticleCategoryType };
  searchParams: { blogType: ArticleCategoryType };
};

export default async function BlogsDetailPage(props: BlogsDetailPageProps) {
  const {
    params: { blogId, blogType },
    // searchParams: { blogType },
  } = props;

  const response = (await getBlogDetails(blogId)) as IBlogDetailsResponse;

  return <BlogDetails details={response?.data[0] ?? {}} blogType={blogType} />;
}
