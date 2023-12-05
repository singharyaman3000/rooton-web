'use client';

import { metaInfo } from '@/app/constants/pageMetaInfo';
import { IBlogsHomeContent, getBlogsHomeContent } from '@/app/services/apiService/blogsHomeAPI';
import BlogsListPage from '@/components/BlogsListPage/BlogsListPage';
import LoadingUI from '@/components/LoadingUI';
import useClientAPI from '@/components/UIElements/Slider/hooks/useClientAPI';
import useSetMetaInfo from '@/hooks/useSetMetaInfo';
import { useTranslationLoader } from '@/providers/translationLoadingProvider';
import { useParams } from 'next/navigation';

const BlogsPageCSR = () => {
  const params = useParams();
  const { data, loading } = useClientAPI({
    apiFn: () => {
      return getBlogsHomeContent();
    },
  });
  const { loader } = useTranslationLoader();

  const canonicalUrl = `https://rooton.ca/${params.lang}/blogs`;
  useSetMetaInfo(metaInfo.blogs.title, metaInfo.blogs.description, canonicalUrl);

  if (loader || loading) return <LoadingUI />;

  return (
    <div>
      {(loader || loading) && <LoadingUI />}
      {data && <BlogsListPage blogsHeaderData={data as IBlogsHomeContent} />}
    </div>
  );
};

export default BlogsPageCSR;
