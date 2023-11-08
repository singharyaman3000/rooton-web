import { IBlogDetailsResponse, getBlogDetails } from '@/app/services/apiService/blogDetailAPI';
import { ArticleCategoryType } from '@/app/services/apiService/blogsListAPI';
import BlogDetails from '@/components/BlogsDetails';

type BlogsDetailPageProps = {
  params: { blogId: string };
  searchParams: { blogType: ArticleCategoryType };
};

export default async function BlogsDetailPage(props: BlogsDetailPageProps) {
  const {
    params: { blogId },
    searchParams: { blogType },
  } = props;

  const response = (await getBlogDetails('71')) as IBlogDetailsResponse;

  return <BlogDetails details={response?.data[0] ?? {}} blogType={blogType} />;
}
