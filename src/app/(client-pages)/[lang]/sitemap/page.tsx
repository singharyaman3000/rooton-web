'use client';

import LoadingUI from '@/components/LoadingUI';
import SiteMap from '@/components/SiteMapPage';
import { useTranslationLoader } from '@/providers/translationLoadingProvider';

const SitemapPageCSR = () => {
  const { loader } = useTranslationLoader();

  if (loader) return <LoadingUI />;

  return (
    <>
      {loader && <LoadingUI />}
      <SiteMap />
    </>
  );
};

export default SitemapPageCSR;
