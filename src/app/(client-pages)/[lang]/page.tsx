'use client';

import { metaInfo } from '@/app/constants/pageMetaInfo';
import HomePageClient from '@/components/HomePage/HomePageClient';
import useSetMetaInfo from '@/hooks/useSetMetaInfo';
import { useParams } from 'next/navigation';

export default function Home() {
  const params = useParams();

  const canonicalUrl = `https://rooton.ca/${params?.lang}`;
  useSetMetaInfo(metaInfo.home.title, metaInfo.home.description, canonicalUrl);

  return <HomePageClient />;
}
