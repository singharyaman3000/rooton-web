'use client';

import React, { useState } from 'react';
import { appendAssetUrl } from '@/utils';
import TextTabs, { TabType } from './TextTabs';
import BlogsCarousel from './BlogsCarousel';
import { BLOG_CATEGORY, BREAD_CRUMBS_LIST, tabsData } from './constants';
import { IBlogsHomeContent } from '@/app/services/apiService/blogsHomeAPI';
import RTONBanner from '../RTONBanner';

type BlogsListPropType = {
  blogsHeaderData: IBlogsHomeContent;
};

const BlogsListPage: React.FC<BlogsListPropType> = ({ blogsHeaderData }) => {
  const [selectedTab, setSelectedTab] = useState<TabType>(tabsData[0]);
  const headerData = blogsHeaderData?.data?.length ? blogsHeaderData?.data[0] : ({} as IBlogsHomeContent['data'][0]);

  return (
    <>
      <RTONBanner
        breadCrumbData={BREAD_CRUMBS_LIST}
        heroText={headerData?.attributes?.title ?? ''}
        description={headerData?.attributes?.sub_title ?? ''}
        backgroundImageUrl={appendAssetUrl(headerData?.attributes?.media_url?.data[0]?.attributes?.url ?? '')}
        noGrid
        fontSizes={{ description: 'text-[15px] lg:text-2xl' }}
        heightStyle='h-[67.5vh] max-h-[500px] min-h-[400px]'
      />
      <TextTabs tabs={tabsData} onChange={setSelectedTab} />
      <div className="pt-10 md:py-20 bg-secondary-grey">
        <div className='flex flex-col gap-[60px] md:gap-20'>
          {(selectedTab.id === BLOG_CATEGORY.ALL || selectedTab.id === BLOG_CATEGORY.NEWS) && (
            <BlogsCarousel articleType="news" title="NEWS" subHeading="Latest Immigration Alerts" id="news_listing" />
          )}
          {(selectedTab.id === BLOG_CATEGORY.ALL || selectedTab.id === BLOG_CATEGORY.BLOGS) && (
            <BlogsCarousel articleType="blog" title="BLOGS" subHeading="Immigration Articles" id="blogs_listing" />
          )}
          {(selectedTab.id === BLOG_CATEGORY.ALL || selectedTab.id === BLOG_CATEGORY.CASE_STUDIES) && (
            <BlogsCarousel
              articleType="case-study"
              title="CASE STUDIES"
              subHeading="Immigration Success Stories"
              id="case_study_listing"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default BlogsListPage;
