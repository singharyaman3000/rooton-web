'use client';

import { RefObject, useState } from 'react';
import { appendAssetUrl } from '@/utils';
import TextTabs, { TabType } from './TextTabs';
import BlogsCarousel from './BlogsCarousel';
import { BLOG_CATEGORY, tabsData } from './constants';
import RTONBanner from '../RTONBanner';

type PropType = {};

const heroText = 'Immigration Insights';
const description =
  'Unlocking Boundless Horizons: Expert Blogs and Resources for Effortless Immigration, Visas, and Citizenship Guidance';

const BlogsListPage = () => {
  const [selectedTab, setSelectedTab] = useState<TabType>(tabsData[0]);

  return (
    <>
      <RTONBanner
        heroText={heroText}
        description={description}
        backgroundImageUrl={appendAssetUrl('')}
        // isVideoBanner={false}
        button={<div></div>}
        addGradient
      />
      <TextTabs tabs={tabsData} onChange={setSelectedTab} />
      {(selectedTab.id === BLOG_CATEGORY.ALL || selectedTab.id === BLOG_CATEGORY.NEWS) && <BlogsCarousel />}
      {(selectedTab.id === BLOG_CATEGORY.ALL || selectedTab.id === BLOG_CATEGORY.BLOGS) && <BlogsCarousel />}
      {(selectedTab.id === BLOG_CATEGORY.ALL || selectedTab.id === BLOG_CATEGORY.CASE_STUDIES) && <BlogsCarousel />}
    </>
  );
};

export default BlogsListPage;
