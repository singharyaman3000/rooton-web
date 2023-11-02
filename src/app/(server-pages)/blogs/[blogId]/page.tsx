import { IBlogDetailsResponse, getBlogDetails } from '@/app/services/apiService/blogDetailAPI';
import { ArticleCategoryType, IBlogsListResponse, getBlogsList } from '@/app/services/apiService/blogsListAPI';
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

  const response = (await getBlogDetails('16')) as IBlogDetailsResponse;
  const blogsListResponse = (await getBlogsList(blogType, 1)) as IBlogsListResponse;

  return <BlogDetails details={response?.data[0]} relatedArticlesList={blogsListResponse} blogType={blogType} />;
}
