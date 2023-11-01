'use client';

import SectionContainer from '@/components/Containers/SectionContainers';
import Button from '@/components/UIElements/Button';
import BlogCard, { IBlogCardData } from '@/components/UIElements/Cards/BlogCard';
import SectionHeadings from '@/components/UIElements/SectionHeadings';
import Slider from '@/components/UIElements/Slider';
import useSliderData from '@/components/UIElements/Slider/hooks/useSliderData';
import SliderNav from '@/components/UIElements/Slider/sliderNav';
import React from 'react';
import { useSwipeable } from 'react-swipeable';
import { ITitleAttributes } from '../ServicesListing/interafces';

export interface IBlogCard {
  data: IBlogCardData[];
}
export interface IBlogListing extends ITitleAttributes {
  blogs: IBlogCard;
}

const BlogListings = ({ blogs, title, sub_title }: IBlogListing) => {
  const { totalPages, incrementPage, decrementPage, pageNum, scrollAmt } = useSliderData({
    slideId: 'news-listing',
    sliderData: blogs?.data,
  });
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      incrementPage();
    },
    onSwipedRight: () => {
      decrementPage();
    },
  });

  return (
    <section className="w-full blogs-listing overflow-x-hidden">
      <SectionContainer cssClass="!pr-[0px] py-10 md:py-[80px]">
        <div className="flex gap-2 flex-wrap items-end justify-between md:pr-[48px] lg:pr-[80px]">
          <div className="md:max-w-[70%] lg:max-w-none">
            <SectionHeadings title={title} subTitle={sub_title} />
          </div>
          <div className="items-center  flex md:mb-[8px]">
            <div className="mr-[30px]">
              <Button
                cssClass="border-0 slider-nav bg-white font-bold"
                label="More"
                tabIndex={0}
                handleOnClick={() => null}
                ariaLabel="More  News"
              />
            </div>
            <div className=" hidden md:block">
              <SliderNav handleOnClick={decrementPage} cssClass="mr-[16px]" disable={pageNum === 0} leftNav />
              <SliderNav handleOnClick={incrementPage} disable={pageNum === totalPages - 1} />
            </div>
          </div>
        </div>
        {/* eslint-disable react/jsx-props-no-spreading */}
        <div className="pt-[24px] md:pt-[48px]" {...handlers}>
          <Slider
            scrollPercent={`${-scrollAmt}px`}
            id="news-listing"
            slideParentClass="!justify-start"
            pageNum={pageNum}
            slideClass="!w-[73.4%] md:px-[15px] !min-w-[264px] md:!w-[29.6%] max-w-[380px] w-full md:!min-w-[380px] md:!max-w-[430px] "
          >
            {blogs?.data?.map((blogData) => {
              return <BlogCard id={blogData.id} key={blogData.id} attributes={blogData.attributes} />;
            })}
          </Slider>
        </div>
      </SectionContainer>
    </section>
  );
};

export default BlogListings;
