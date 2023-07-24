'use client'
import { NEWS_TITLE } from '@/app/constants/textConstants';
import SectionContainer from '@/components/Containers/SectionContainers';
import BlogCard from '@/components/UIElements/Cards/BlogCard';
import SectionHeadings from '@/components/UIElements/SectionHeadings';
import Slider from '@/components/UIElements/Slider';
import useSliderPagination from '@/components/UIElements/Slider/hooks/useSlider';
import SliderNav from '@/components/UIElements/Slider/sliderNav';
import React from 'react';

const BlogListings = () => {

  const {pageNum , incrementPage , decrementPage , } = useSliderPagination({slidesLength :3 , initialPage : 0 })

  return (
    <section className="bg-grey w-full">
      <SectionContainer>
        <div className="flex items-center justify-between">
          <div>
            <SectionHeadings title={NEWS_TITLE.title} subTitle={NEWS_TITLE.subTitle} />
          </div>
          <div>
            <SliderNav handleOnClick={decrementPage} cssClass='mr-[16px]' disable={pageNum === 0} leftNav  />
            <SliderNav handleOnClick={incrementPage} disable={pageNum === 2} />{pageNum}
          </div>
        </div>
        <div className="pt-[24px] md:pt-[80px]">
          <Slider pageNum={pageNum} slideClass="md:!w-[28.7%] w-full !md:max-w-[400px]  ">
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </Slider>
        </div>
      </SectionContainer>
    </section>
  );
};

export default BlogListings;
