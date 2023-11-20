'use client';

import { IBlogDetails, getBlogDetails } from '@/app/services/apiService/blogDetailAPI';
import { ArticleCategoryType } from '@/app/services/apiService/blogsListAPI';
import BlogDetails from '@/components/BlogsDetails';
import LoadingUI from '@/components/LoadingUI';
import useClientAPI from '@/components/UIElements/Slider/hooks/useClientAPI';
import { useTranslationLoader } from '@/providers/translationLoadingProvider';
import { useParams } from 'next/navigation';

const BlogsDetailsPageCSR = () => {
  const params = useParams();

  const { data, loading } = useClientAPI({
    apiFn: () => {
      return getBlogDetails(params.blogId);
    },
  });
  const { loader } = useTranslationLoader();

  if (loader || loading) return <LoadingUI />;
  const isFromCoachingPage = params?.blogType === 'coaching-tips';
  return (
    <div>
      {(loader || loading) && <LoadingUI />}
      <BlogDetails
        details={data?.data[0] ?? ({} as IBlogDetails)}
        blogType={params?.blogType as ArticleCategoryType}
        fromCoachingPage={isFromCoachingPage}
      />
    </div>
  );
};

export default BlogsDetailsPageCSR;
