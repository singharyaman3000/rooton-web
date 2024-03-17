'use client';

import Honesty, { IJsonContent } from './Honesty';
import OurProcess from '@/components/HomePage/OurProcess';
import { CONTENT_TYPES, IToolsPage_Data } from '@/app/services/apiService/ToolsAPI';
import { appendAssetUrl, getSectionToolsData, isVideo } from '@/utils';
import { IOurProcessData } from '@/components/HomePage/OurProcess/interfaces';
import RootOnBanner from '@/components/CoachingPage/RootOnBanner';
import FaqListing, { IFaqData } from '@/components/HomePage/FaqListings';
import { Breadcrumbs } from '../Breadcrumbs';

type ToolsPageProps = {
  toolsPageConfig: IToolsPage_Data;
};

const ToolsPage = ({ toolsPageConfig }: ToolsPageProps) => {

  const data = toolsPageConfig?.attributes?.tools_page_contents?.data || [];

  const getComponentsAboveBookAppointments = () => {
    return data?.map((contents) => {
      const { title, sub_title, description } = contents.attributes;
      switch (contents.attributes.unique_identifier_name) {
      case CONTENT_TYPES.WHY_ROOT_ON:
        return (
          <Honesty
            title={title}
            description={description ?? ''}
            sub_title={sub_title}
            json_content={contents.attributes.json_content as IJsonContent}
          />
        );
      case CONTENT_TYPES.OUR_PROCESSES:
        return (
          <div className=" mb-20">
            <OurProcess
              title={title}
              sub_title={sub_title}
              json_content={contents.attributes.json_content as IOurProcessData}
            />
          </div>
        );
      default:
        return null;
      }
    });
  };

  const faqData = getSectionToolsData(toolsPageConfig, CONTENT_TYPES.QUESTIONS);

  return (
    <>
      <Breadcrumbs
        className=" z-50 hidden lg:flex"
        data={[
          {
            title: 'Home',
            path: '/',
          },
          {
            title: 'Tools',
            path: '/tools',
          },
        ]}
      />
      <RootOnBanner
        isVideoBanner={isVideo(toolsPageConfig.attributes.media_url.data[0].attributes.mime)}
        backgroundImageUrl={appendAssetUrl(toolsPageConfig?.attributes?.media_url?.data?.[0]?.attributes.url ?? '')}
        heroText={toolsPageConfig?.attributes?.title}
        description={toolsPageConfig?.attributes?.sub_title}
        button={<span></span>}
      />
      {getComponentsAboveBookAppointments()}
      {faqData && (
        <FaqListing
          sub_title={faqData?.attributes?.sub_title}
          title={faqData?.attributes?.title}
          json_content={faqData?.attributes?.json_content as IFaqData}
        />
      )}
    </>
  );
};

export default ToolsPage;
