'use client';

import { metaInfo } from '@/app/constants/pageMetaInfo';
import HomePageClient from '@/components/HomePage/HomePageClient';
import useSetMetaInfo from '@/hooks/useSetMetaInfo';

export default function Home() {
  const canonicalUrl = 'https://rooton.ca';
  useSetMetaInfo(metaInfo.home.title, metaInfo.home.description, canonicalUrl);

  return <HomePageClient />;
}
