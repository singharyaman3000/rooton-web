'use client';

import LoadingUI from '@/components/LoadingUI';
import SiteMap from '@/components/SiteMapPage';
import { useTranslationLoader } from '@/providers/translationLoadingProvider';

const SitemapPageCSR = () => {
  const { loader } = useTranslationLoader();

  if (loader) return <LoadingUI />;

  return (
    <div>
      {loader && <LoadingUI />}
      <SiteMap />
    </div>
  );
};

export default SitemapPageCSR;
