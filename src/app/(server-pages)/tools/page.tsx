import { Metadata } from 'next';
import ToolsPage from '@/components/ToolsPage';
import { getToolsPageContents } from '@/app/services/apiService/ToolsAPI';
import { metaInfo } from '@/app/constants/pageMetaInfo';

export const metadata: Metadata = {
  title: metaInfo.tools.title,
  description: metaInfo.tools.description,
  alternates: { canonical: 'https://rooton.ca/tools' },
  robots: {
    index: process.env.NEXT_APP_ENVIRONMENT === 'production',
  },
};

export default async function ToolPage() {
  const apiRes = await getToolsPageContents();
  return apiRes?.length > 0 && <ToolsPage toolsPageConfig={apiRes[0]} />;
}
