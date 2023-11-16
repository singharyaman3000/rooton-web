'use client';

import { IBlogContentData, IBlogDetails } from '@/app/services/apiService/blogDetailAPI';
import NavigationPanel from './NavigationPanel';
import React, { RefObject, useState } from 'react';
import BlogBody from './BlogBody';
import { getAllPageIndex } from './BlogBody/helpers';
import BlogHeader from './BlogHeader';
import { ArticleCategoryType } from '@/app/services/apiService/blogsListAPI';
import BlogsCarousel from '../BlogsListPage/BlogsCarousel';
import BookAnAppointment from '../UIElements/BookAnAppointment';
import { useParams, useRouter } from 'next/navigation';
import { getServicePageURL, getTranslatedURL } from '@/utils';
import { BOOK_AN_APPOINTMENT } from '@/constants/navigation';
import { SOURCE_PAGE } from '../BlogsListPage/constants';
import { BLOG_DETAILS_BREADCRUMBS, BLOG_DETAILS_BREADCRUMBS_COACHING } from './constants';
import SocialMediaShare from './SocialMediaShare';

type BlogDetailsParamsType = {
  details: IBlogDetails;
  blogType: ArticleCategoryType;
  fromCoachingPage?: boolean;
};

export type SelectedTagType = { tag: string; activeRef: RefObject<HTMLSpanElement>; type: 'scrolled' | 'selected' };

const BlogDetails: React.FC<BlogDetailsParamsType> = ({ details, blogType, fromCoachingPage = false }) => {
  const params = useParams();
  const router = useRouter();
  const breadcrumbsData = fromCoachingPage ? BLOG_DETAILS_BREADCRUMBS_COACHING : BLOG_DETAILS_BREADCRUMBS;
  const [selectedSection, setSelectedSection] = useState<SelectedTagType>({} as SelectedTagType);
  const blogContents = details?.attributes?.blog_contents?.data || [];
  const sortedContent = blogContents.sort((a, b) => {
    return (a?.attributes?.position ?? 0) - (b?.attributes?.position ?? 0);
  });

  const allHeadingsList = sortedContent?.length
    ? getAllPageIndex(sortedContent[0]?.attributes.body_content, '<heading>', '</heading>')
    : [];

  const handleCTAButton = () => {
    const serviceId = details?.attributes?.sub_service?.data?.id;
    if (serviceId) {
      const route = getTranslatedURL(getServicePageURL(serviceId), params?.lang);
      router.push(route + BOOK_AN_APPOINTMENT);
    }
  };

  return (
    <div className="mt-[60px] lg:mt-20 text-primary-font-color flex flex-col justify-start min-w-[360px]">
      <div
        id="scroll-container"
        className="flex px-6 lg:px-0"
        style={{ alignSelf: allHeadingsList?.length === 0 ? 'center' : '' }}
      >
        {/* Article navigation */}
        <NavigationPanel
          content={allHeadingsList}
          selectedTag={selectedSection}
          setSelectedTag={setSelectedSection}
          breadcrumbsData={breadcrumbsData}
        />
        {/* Blogbody */}
        <div id="section-container" className="w-full min-w-[312px] md:w-full lg:max-w-[800px] lg:mr-[160px]">
          <BlogHeader blogDetails={details} />
          <BlogBody blogContent={sortedContent?.length ? sortedContent[0] : ({} as IBlogContentData)} />
        </div>
      </div>
      {/* CTA Section */}
      <div className="py-8 lg:py-[60px]">{!fromCoachingPage && <BookAnAppointment onClick={handleCTAButton} />}</div>
      {/* SocialMediaShare for small screens */}
      <div className=" lg:hidden mb-10 self-center">
        <SocialMediaShare />
      </div>
      {/* Related Articles */}
      <BlogsCarousel
        articleType={blogType}
        title=""
        subHeading="Related Articles"
        id={`${blogType}_listing`}
        sourcePage={SOURCE_PAGE.BLOG_DETAILS}
        serviceType={details?.attributes?.service_type}
        containerStyle="w-full bg-secondary-grey"
      />
    </div>
  );
};

export default BlogDetails;
