'use client';

import { IBlogContentData, IBlogDetails } from '@/app/services/apiService/blogDetailAPI';
import { Breadcrumbs } from '../Breadcrumbs';
import NavigationPanel from './NavigationPanel';
import React, { RefObject, useState } from 'react';
import BlogBody from './BlogBody';
import { getAllPageIndex } from './BlogBody/helpers';
import BlogHeader from './BlogHeader';
import { ArticleCategoryType, IBlogsListResponse } from '@/app/services/apiService/blogsListAPI';
import BlogsCarousel from '../BlogsListPage/BlogsCarousel';
import BookAnAppointment from '../UIElements/BookAnAppointment';

type BlogDetailsParamsType = {
  details: IBlogDetails;
  relatedArticlesList: IBlogsListResponse;
  blogType: ArticleCategoryType;
};

export type SelectedTagType = { tag: string; activeRef: RefObject<HTMLSpanElement>; type: 'scrolled' | 'selected' };

const BlogDetails: React.FC<BlogDetailsParamsType> = ({ details, relatedArticlesList, blogType }) => {
  const [selectedSection, setSelectedSection] = useState<SelectedTagType>({} as SelectedTagType);

  const sortedContent = details?.attributes?.blog_contents?.data?.toSorted((a, b) => {
    return (a?.attributes?.position ?? 0) - (b?.attributes?.position ?? 0);
  });
  const allHeadingsList = sortedContent?.length
    ? getAllPageIndex(sortedContent[0]?.attributes.body_content, '<heading>', '</heading>')
    : [];

  return (
    <div className="mt-6 lg:mt-20 text-primary-font-color flex flex-col">
      <div className="fixed p-5">
        <Breadcrumbs
          data={[
            {
              title: 'Home',
              path: '/',
            },
            {
              title: 'Blogs',
              path: '/blogs',
            },
            {
              title: 'Article',
              path: '',
            },
          ]}
          isStatic
        />
      </div>
      <div id="scroll-container" className="flex px-6 lg:px-0">
        <NavigationPanel content={allHeadingsList} selectedTag={selectedSection} setSelectedTag={setSelectedSection} />
        <div id="section-container" className="max-w-[800px] lg:mr-[160px]">
          <BlogHeader blogDetails={details} />
          <BlogBody blogContent={sortedContent?.length ? sortedContent[0] : ({} as IBlogContentData)} />
        </div>
      </div>
      <div className="py-8 lg:py-[60px]">
        <BookAnAppointment
          onClick={() => {
            return null;
          }}
        />
      </div>
      {relatedArticlesList?.data?.length > 0 && (
        <div className="py-[60px] bg-secondary-grey">
          <BlogsCarousel articleType={blogType} title="" subHeading="Related Articles" id={`${blogType}_listing`} />
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
