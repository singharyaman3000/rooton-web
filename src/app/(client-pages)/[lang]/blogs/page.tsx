'use client';

import { IBlogsHomeContent, getBlogsHomeContent } from '@/app/services/apiService/blogsHomeAPI';
import BlogsListPage from '@/components/BlogsListPage/BlogsListPage';
import LoadingUI from '@/components/LoadingUI';
import useClientAPI from '@/components/UIElements/Slider/hooks/useClientAPI';
import { useTranslationLoader } from '@/providers/translationLoadingProvider';

const BlogsPageCSR = () => {
  const { data, loading } = useClientAPI({
    apiFn: () => {
      return getBlogsHomeContent();
    },
  });
  const { loader } = useTranslationLoader();

  if (loader || loading) return <LoadingUI />;

  return (
    <>
      {(loader || loading) && <LoadingUI />}
      {data && <BlogsListPage blogsHeaderData={data as IBlogsHomeContent} />};
    </>
  );
};

export default BlogsPageCSR;
