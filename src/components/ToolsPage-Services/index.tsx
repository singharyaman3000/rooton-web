/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable max-len */

'use client';

import React, { useEffect } from 'react';
import { CoachingPageWrapper } from './Wrapper';
import { appendAssetUrl } from '@/utils';
import { CoachingDescription } from './Description';
import { IToolServicePageContent } from '@/app/services/apiService/toolsContentsAPI';
import Builder from './Builder';
import SOWPBuilder from './BuilderSOWP';
import { CRS } from './CRS';
import { useParams } from 'next/navigation';
import DynamicBannerSection from '@/components/AboutUsPage/DynamicBannerSection';

type ToolsServicePageProps = {
  response: IToolServicePageContent;
};

export const ToolsServicePageComponent = ({ response }: ToolsServicePageProps) => {
  const params = useParams();

  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem('token');

    if (!isLoggedIn) {
      const loginUrl = params.lang ? `/${params.lang}/login` : '/login';
      window.location.href = loginUrl;
    }
  }, []);

  const builder = response?.data?.attributes?.tools_contents?.data?.find((i) => {
    return i.attributes.unique_identifier_name === 'statement-of-purpose-builder-canada';
  });

  const uniqueIdentifierName = response?.data?.attributes?.unique_identifier_name;

  const sectionsByPosition = [builder].filter(Boolean);

  sectionsByPosition.sort((first, second) => {
    // Using optional chaining to safely access properties
    return (first?.attributes?.position ?? 0) - (second?.attributes?.position ?? 0);
  });

  const renderBuilderSection = () => {
    switch (uniqueIdentifierName) {
    case 'statement-of-purpose-builder-canada':
      return <Builder response={response} />;

    case 'sowp-statement-builder-canada':
      return <SOWPBuilder response={response} />;

    case 'canada-course-recommendation-tool':
      return <CRS />;
    default:
      return null; // Return null or any default component if needed
    }
  };

  const pathPath = [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'Tools',
      path: '/tools',
    },
    {
      title: response.data?.attributes?.title,
      path: '',
    },
  ];

  return (
    <div className=" relative pb-20">
      <DynamicBannerSection
        bannerHeightTailwind="!h-[531px] !max-h-[531px] sm:!max-h-[400px] sm:!h-[400px] 2k:!h-[531px] 2k:!max-h-[531px]"
        breadCrumbData={pathPath}
        addGradient={false}
        backgroundImageUrl={appendAssetUrl(response.data?.attributes?.media_url?.data?.[0]?.attributes.url ?? '')}
        heroText={response.data?.attributes?.title}
        description={response.data?.attributes?.sub_title}
      />
      <CoachingPageWrapper className="pt-20 px-6 xl:px-20 m-auto max-w-screen-2k lg:px-[80px]">
        <CoachingDescription text={response.data?.attributes?.description} />
      </CoachingPageWrapper>
      {renderBuilderSection()}
    </div>
  );
};
