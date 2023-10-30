'use client';

import React, { useState } from 'react';
import { appendAssetUrl } from '@/utils';
import TextTabs, { TabType } from './TextTabs';
import BlogsCarousel from './BlogsCarousel';
import { BLOG_CATEGORY, tabsData } from './constants';
import { IBlogsHomeContent } from '@/app/services/apiService/blogsHomeAPI';
import BlogsBanner from './BlogsBanner';

type BlogsListPropType = {
  blogsHeaderData: IBlogsHomeContent;
};

const BlogsListPage: React.FC<BlogsListPropType> = ({ blogsHeaderData }) => {
  const [selectedTab, setSelectedTab] = useState<TabType>(tabsData[0]);
  const headerData = blogsHeaderData?.data[0] ?? {};
  return (
    <>
      <BlogsBanner
        heroText={headerData?.attributes?.title ?? ''}
        description={headerData?.attributes?.sub_title ?? ''}
        backgroundImageUrl={appendAssetUrl(headerData?.attributes?.media_url?.data[0]?.attributes?.url ?? '')}
        addGradient
      />
      <TextTabs tabs={tabsData} onChange={setSelectedTab} />
      <div className='pt-10 md:py-20 bg-secondary-grey flex flex-col gap-[60px] md:gap-20'>
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
    </>
  );
};

export default BlogsListPage;
