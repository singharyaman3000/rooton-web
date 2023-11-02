'use client';

import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import SectionHeadings from '@/components/UIElements/SectionHeadings';
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

type BlogsCarouselParamsType = {
  articleType: ArticleCategoryType;
  title: string;
  subHeading: string;
  id: string;
  showMore?: boolean;
};

const BlogsCarousel: React.FC<BlogsCarouselParamsType> = ({ articleType, title, subHeading, id, showMore }) => {
  const [blogsListData, setBlogsListData] = useState<IBlogsListResponse>({} as IBlogsListResponse);
  const [allArticlesList, setAllArticlesList] = useState<IBlogData[]>([] as IBlogData[]);
  const [dotsToDisplay, setDotsToDisplay] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const { totalPages, incrementPage, decrementPage, pageNum, scrollAmt } = useSliderData({
    slideId: id,
    sliderData: allArticlesList,
  });

  const initialApiCall = async () => {
    setLoading(true);
    const res = await getBlogsList(articleType, 1);
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
    const res = await getBlogsList(articleType, currentPage + 1);
    if (res?.status) {
      setBlogsListData(res?.res as IBlogsListResponse);
      setAllArticlesList((prev: IBlogData[]) => {
        return [...prev, ...res?.res?.data ?? []];
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

  return (
    <section className="border-b-2 md:border-none">
      <div className=" pl-6 pb-8 md:pb-12 xl:px-20 flex justify-between items-end">
        <div>
          <SectionHeadings title={title} subTitle={subHeading} />
        </div>
        <div className="hidden md:flex">
          {showMore && (
            <Link href={'/blogs'} className="mr-[30px]">
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
      <div className="w-[100%] pl-0 md:pl-6 xl:pl-20" {...handlers}>
        <Slider
          scrollPercent={`${-scrollAmt}px`}
          id={id}
          pageNum={pageNum}
          loading={loading}
          loadingUI={<ArticlePreLoader />}
          slideParentClass="!justify-start"
          slideClass="!w-full md:!w-[380px] !px-0 md:mr-[30px]"
        >
          {allArticlesList?.map((detail: IBlogData) => {
            return <ArticleCard key={detail.id} attributes={detail.attributes} />;
          })}
        </Slider>
        <MobilePagination
          dotsToDisplay={dotsToDisplay}
          pageNum={pageNum}
          pageMeta={blogsListData?.meta && blogsListData?.meta}
        />
      </div>
    </section>
  );
};

export default BlogsCarousel;
