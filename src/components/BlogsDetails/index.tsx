'use client';

import { IBlogContentData, IBlogDetails } from '@/app/services/apiService/blogDetailAPI';
import NavigationPanel from './NavigationPanel';
import React, { useEffect, useState } from 'react';
import BlogBody from './BlogBody';
import BlogHeader from './BlogHeader';
import { ArticleCategoryType } from '@/app/services/apiService/blogsListAPI';
import BlogsCarousel from '../BlogsListPage/BlogsCarousel';
import BookAnAppointment from '../UIElements/BookAnAppointment';
import { useParams, useRouter } from 'next/navigation';
import { BOOK_AN_APPOINTMENT_QUERY } from '@/constants/navigation';
import { SOURCE_PAGE } from '../BlogsListPage/constants';
import { BLOG_DETAILS_BREADCRUMBS, BLOG_DETAILS_BREADCRUMBS_COACHING } from './constants';
import SocialMediaShare from './SocialMediaShare';

type BlogDetailsParamsType = {
  details: IBlogDetails;
  blogType: ArticleCategoryType;
  fromCoachingPage?: boolean;
};

const BlogDetails: React.FC<BlogDetailsParamsType> = ({ details, blogType, fromCoachingPage = false }) => {
  const params = useParams();
  const router = useRouter();
  // eslint-disable-next-line no-undef
  const [allHeadingsList, setAllHeadingsList] = useState<Element[]>([]);

  const breadcrumbsData = fromCoachingPage ? BLOG_DETAILS_BREADCRUMBS_COACHING : BLOG_DETAILS_BREADCRUMBS;
  const blogContents = details?.attributes?.blog_contents?.data || [];
  const sortedContent = blogContents.sort((a, b) => {
    return (a?.attributes?.position ?? 0) - (b?.attributes?.position ?? 0);
  });

  useEffect(() => {
    const allHeadings = document?.querySelectorAll('heading');
    allHeadings.forEach((heading, index) => {
      heading.setAttribute('data-id', index.toString());
    });
    setAllHeadingsList(Array.from(allHeadings));
  }, []);

  const handleCTAButton = () => {
    const serviceName = details?.attributes?.sub_service?.data.attributes.unique_identifier_name;
    if (serviceName) {
      const route = params?.lang ? `/${params?.lang}/${serviceName}` : `/${serviceName}`;
      router.push(`${route}?${BOOK_AN_APPOINTMENT_QUERY}=true`);
    }
  };

  return (
    <div className="mt-[60px] lg:mt-20 text-primary-font-color flex flex-col justify-start min-w-[360px]">
      <div id="scroll-container" className="flex px-6 lg:px-0">
        {/* Article navigation */}
        <NavigationPanel breadcrumbsData={breadcrumbsData} allHeadingsList={allHeadingsList} />
        {/* Blogbody */}
        <div
          id="section-container"
          className="w-full min-w-[312px] md:w-full lg:max-w-[800px] lg:mr-[160px] pb-8 lg:pb-[60px] lg:pl-[50px]"
        >
          <BlogHeader blogDetails={details} />
          <BlogBody blogContent={sortedContent?.length ? sortedContent[0] : ({} as IBlogContentData)} />
        </div>
      </div>
      {/* CTA Section */}
      {details?.attributes?.sub_service?.data?.id ? (
        <div className="pb-8 lg:pb-[60px]">{!fromCoachingPage && <BookAnAppointment onClick={handleCTAButton} />}</div>
      ) : null}
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
