'use client';

import LoadingUI from '@/components/LoadingUI';
import SiteMap from '@/components/SiteMapPage';
import useSetMetaInfo from '@/hooks/useSetMetaInfo';
import { useTranslationLoader } from '@/providers/translationLoadingProvider';
import { useParams } from 'next/navigation';

const SitemapPageCSR = () => {
  const params = useParams();
  const { loader } = useTranslationLoader();

  const canonicalUrl = `https://rooton.ca/${params.lang}/sitemap`;
  useSetMetaInfo('Sitemap', 'sitemap', canonicalUrl);

  if (loader) return <LoadingUI />;

  return (
    <div>
      {loader && <LoadingUI />}
      <SiteMap />
    </div>
  );
};

export default SitemapPageCSR;
