'use client';
import HomePage from '@/components/HomePage';
import { getHomePageContents } from '../../services/apiService/homeAPI';
import useClientAPI from '@/components/UIElements/Slider/hooks/useClientAPI';

export default function Home() {
  const { data, error } = useClientAPI({ apiFn: getHomePageContents });

  return data && <HomePage homePageConfig={data} />;
}
