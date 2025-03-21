import { IBlogDetailsResponse, getBlogDetails } from '@/app/services/apiService/blogDetailAPI';
import { getBlogMetaInfo } from '@/app/services/apiService/blogMetaInfo';
import { ArticleCategoryType } from '@/app/services/apiService/blogsListAPI';
import BlogDetails from '@/components/BlogsDetails';
import { Metadata } from 'next';

type BlogsDetailPageProps = {
  params: { blogId: string; blogType: ArticleCategoryType };
};

export async function generateMetadata(metaProps: BlogsDetailPageProps): Promise<Metadata> {
  const res = await getBlogMetaInfo(metaProps.params.blogId);
  return {
    title: res[0]?.attributes.meta_title,
    description: res[0]?.attributes?.meta_description,
    alternates: {
      canonical: `https://rooton.ca/immigration-insights/${metaProps.params?.blogId}/${metaProps.params?.blogType}`,
    },
    robots: {
      index: process.env.NEXT_APP_ENVIRONMENT === 'production',
    },
  };
}

export default async function BlogsDetailPage(props: BlogsDetailPageProps) {
  const {
    params: { blogId, blogType },
  } = props;

  const response = (await getBlogDetails(blogId)) as IBlogDetailsResponse;
  const isFromCoachingPage = blogType === 'coaching-tips';

  return <BlogDetails details={response?.data[0] ?? {}} blogType={blogType} fromCoachingPage={isFromCoachingPage} />;
}
