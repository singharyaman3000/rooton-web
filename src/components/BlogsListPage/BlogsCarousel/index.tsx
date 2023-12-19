'use client';

import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import Slider from '@/components/UIElements/Slider';
import useSliderData from '@/components/UIElements/Slider/hooks/useSliderData';
import ArticleCard from '../ArticleCard';
import SliderNav from '@/components/UIElements/Slider/sliderNav';
import {
  ArticleCategoryType,
  IBlogData,
  IBlogsListResponse,
  getBlogsList,
} from '@/app/services/apiService/blogsListAPI';
import MobilePagination from '../MobilePagination';
import ArticlePreLoader from '../ArticlePreLoader';
import Button from '@/components/UIElements/Button';
import Link from 'next/link';
import { SOURCE_PAGE } from '../constants';
import { useParams } from 'next/navigation';
import BlogsSectionHeadings from '../BlogsSectionHeadings';

type BlogsCarouselParamsType = {
  articleType: ArticleCategoryType;
  title: string;
  subHeading: string;
  id: string;
  sourcePage?: string;
  showMore?: boolean;
  serviceType?: string;
  containerStyle?: string;
};

const BlogsCarousel: React.FC<BlogsCarouselParamsType> = ({
  articleType,
  title,
  subHeading,
  id,
  showMore,
  serviceType,
  sourcePage = 'blog',
  containerStyle,
}) => {
  const [blogsListData, setBlogsListData] = useState<IBlogsListResponse>({} as IBlogsListResponse);
  const [allArticlesList, setAllArticlesList] = useState<IBlogData[]>([] as IBlogData[]);
  const [dotsToDisplay, setDotsToDisplay] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const { totalPages, incrementPage, decrementPage, pageNum, scrollAmt } = useSliderData({
    slideId: id,
    sliderData: allArticlesList,
    cardSpacing: 30,
  });
  const params = useParams();

  const initialApiCall = async () => {
    setLoading(true);
    const res = await getBlogsList(articleType, 1, sourcePage, serviceType, params?.blogId);
    if (res.status) {
      setBlogsListData(res?.res as IBlogsListResponse);
      setAllArticlesList(res?.res?.data ?? []);
      const initalDots = res?.res?.data?.map((_: unknown, index: number) => {
        return index;
      });
      setDotsToDisplay(initalDots || []);
      setLoading(false);
    }
  };

  useEffect(() => {
    initialApiCall();
  }, []);

  const getArticles = async () => {
    const currentPage = blogsListData?.meta?.pagination?.page || 0;
    const res = await getBlogsList(articleType, currentPage + 1, sourcePage, serviceType, params?.blogId);
    if (res?.status) {
      setBlogsListData(res?.res as IBlogsListResponse);
      setAllArticlesList((prev: IBlogData[]) => {
        return [...prev, ...(res?.res?.data ?? [])];
      });
    }
  };

  const dotsArray: number[] = allArticlesList?.map((_: unknown, index: number) => {
    return index;
  });

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      incrementPage();
      const currentPage = pageNum + 1;
      if (allArticlesList?.length > 0) {
        if (
          currentPage + 1 === allArticlesList.length - 2 &&
          allArticlesList?.length !== blogsListData?.meta?.pagination?.total
        )
          getArticles();
      }

      if (pageNum % 7 === 0 && pageNum <= allArticlesList?.length) {
        const slicedArray = dotsArray.slice(pageNum, pageNum + 8);
        setDotsToDisplay(slicedArray);
      }
    },
    onSwipedRight: () => {
      decrementPage();
      if (pageNum % 8 === 0 && pageNum > 0) {
        const slicedArray = dotsArray.slice(pageNum - 8, pageNum);
        setDotsToDisplay(slicedArray);
      }
    },
  });

  const handleIncrementPage = () => {
    incrementPage();
    if (allArticlesList?.length !== blogsListData?.meta?.pagination?.total) getArticles();
  };

  const removeDuplicates = (blogsList: IBlogData[]) => {
    const uniqueIds: { [key: number]: number } = {};
    const uniqueBlogs = blogsList.filter((blog) => {
      if (!uniqueIds[blog?.id]) {
        uniqueIds[blog.id] = blog.id;
        return blog;
      }
      return null;
    });
    return uniqueBlogs;
  };

  return allArticlesList?.length ? (
    <section
      className={`${containerStyle} ${serviceType ? 'pt-[40px] md:py-[80px]' : ''}
        md:border-none ${sourcePage === 'home' || sourcePage === 'service' ? 'max-w-screen-2k m-auto' : ''}`}
    >
      <div
        className={`pl-6 pb-8 md:pb-12 xl:px-20 flex justify-between items-end
          ${serviceType ? 'md:px-20' : ''}`}
      >
        <div>
          <BlogsSectionHeadings title={title} subTitle={subHeading} />
        </div>
        <div className="hidden md:flex">
          {showMore && (
            <Link href={'/immigration-insights'} className="mr-[30px]">
              <Button
                cssClass="border-0 slider-nav bg-white font-bold"
                label="More"
                tabIndex={0}
                handleOnClick={() => {
                  return null;
                }}
                ariaLabel="More  News"
              />
            </Link>
          )}
          <SliderNav handleOnClick={decrementPage} cssClass="mr-[16px]" disable={pageNum === 0} leftNav />
          <SliderNav handleOnClick={handleIncrementPage} disable={pageNum === totalPages - 1} />
        </div>
      </div>
      {/* eslint-disable react/jsx-props-no-spreading */}
      <div className={`w-[100%] pl-0 xl:pl-20 ${serviceType ? 'md:pl-20' : 'md:pl-6 '}`} {...handlers}>
        <Slider
          scrollPercent={`${-scrollAmt}px`}
          id={id}
          pageNum={pageNum}
          loading={loading}
          loadingUI={<ArticlePreLoader />}
          slideParentClass="!justify-start md:gap-[30px]"
          slideClass="!w-full md:!w-[380px] !px-0"
        >
          {removeDuplicates(allArticlesList)?.map((detail: IBlogData) => {
            return <ArticleCard key={detail.id} attributes={detail.attributes} articleId={detail.id} />;
          })}
        </Slider>
        <MobilePagination
          className={sourcePage === SOURCE_PAGE.SERVICE ? 'bg-secondary-grey' : 'bg-white-fixed'}
          dotsToDisplay={dotsToDisplay}
          pageNum={pageNum}
          pageMeta={blogsListData?.meta && blogsListData?.meta}
        />
      </div>
    </section>
  ) : null;
};

export default BlogsCarousel;
