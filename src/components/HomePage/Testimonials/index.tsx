'use client';
import { NEWS_TITLE, TESTIMONIAL_TITLE } from '@/app/constants/textConstants';
import SectionContainer from '@/components/Containers/SectionContainers';
import Button from '@/components/UIElements/Button';
import BlogCard from '@/components/UIElements/Cards/BlogCard';
import TestimonialCard from '@/components/UIElements/Cards/TestimonialCard';
import SectionHeadings from '@/components/UIElements/SectionHeadings';
import Slider from '@/components/UIElements/Slider';
import useSliderPagination from '@/components/UIElements/Slider/hooks/useSlider';
import useSliderData from '@/components/UIElements/Slider/hooks/useSliderData';
import SliderNav from '@/components/UIElements/Slider/sliderNav';
import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

const Testimonials = () => {
    const {totalPages , incrementPage ,decrementPage , pageNum ,scrollAmt} = useSliderData({slideId :'testimonial-listing' });
    const handlers = useSwipeable({
      onSwipedLeft: () => {
       incrementPage()  
      },
      onSwipedRight: () => {      
        decrementPage()
      },
    });

  return (
    <section className="w-full bg-primary-white ">
      <SectionContainer cssClass="!pr-[0px]">
        <div className="flex items-center justify-between md:pr-[80px]">
          <div>
            <SectionHeadings title={TESTIMONIAL_TITLE.title} subTitle={TESTIMONIAL_TITLE.subTitle} />
          </div>
          <div className="items-center hidden md:flex">
            <div>
              <SliderNav handleOnClick={decrementPage} cssClass="mr-[16px]" disable={pageNum === 0} leftNav />
              <SliderNav handleOnClick={incrementPage} disable={pageNum === totalPages - 1} />
            </div>
          </div>
        </div>
        <div className="pt-[24px] md:pt-[80px]" {...handlers}>
          <Slider
            scrollPercent={-scrollAmt + 'px'}
            id="testimonial-listing"
            pageNum={pageNum}
            slideClass="!w-[73.4%] !min-w-[264px] md:!w-[29.2%] w-full md:!min-w-[404px] !md:max-w-[400px]"
          >
            <TestimonialCard type='video'/>
            <TestimonialCard type='text' />
            <TestimonialCard type='text' />
            <TestimonialCard type='text' />

          </Slider>
        </div>
      </SectionContainer>
    </section>
  );
};

export default Testimonials;
