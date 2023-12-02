'use client';

import { IBlogDetails, getBlogDetails } from '@/app/services/apiService/blogDetailAPI';
import { getBlogMetaInfo } from '@/app/services/apiService/blogMetaInfo';
import { ArticleCategoryType } from '@/app/services/apiService/blogsListAPI';
import BlogDetails from '@/components/BlogsDetails';
import LoadingUI from '@/components/LoadingUI';
import useClientAPI from '@/components/UIElements/Slider/hooks/useClientAPI';
import useSetMetaInfo from '@/hooks/useSetMetaInfo';
import { useTranslationLoader } from '@/providers/translationLoadingProvider';
import { useParams } from 'next/navigation';

const BlogsDetailsPageCSR = () => {
  const params = useParams();

  const { data, loading } = useClientAPI({
    apiFn: () => {
      return getBlogDetails(params.blogId);
    },
  });

  const { data: metaData = [] } = useClientAPI({
    apiFn: () => {
      return getBlogMetaInfo(params.blogId);
    },
  });
  const { loader } = useTranslationLoader();

  const canonicalUrl = `https://rooton.ca/${params?.lang}/blogs/${params?.blogId}/${params?.blogType}`;
  useSetMetaInfo(metaData![0]?.attributes?.meta_title ?? '', metaData![0]?.attributes?.meta_description, canonicalUrl);

  if (loader || loading) return <LoadingUI />;
  const isFromCoachingPage = params?.blogType === 'coaching-tips';
  return (
    <div>
      {(loader || loading) && <LoadingUI />}
      {data && (
        <BlogDetails
          details={data?.data[0] ?? ({} as IBlogDetails)}
          blogType={params?.blogType as ArticleCategoryType}
          fromCoachingPage={isFromCoachingPage}
        />
      )}
    </div>
  );
};

export default BlogsDetailsPageCSR;
