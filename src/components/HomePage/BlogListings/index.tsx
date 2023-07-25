'use client';
import { NEWS_TITLE } from '@/app/constants/textConstants';
import SectionContainer from '@/components/Containers/SectionContainers';
import Button from '@/components/UIElements/Button';
import BlogCard from '@/components/UIElements/Cards/BlogCard';
import SectionHeadings from '@/components/UIElements/SectionHeadings';
import Slider from '@/components/UIElements/Slider';
import useSliderPagination from '@/components/UIElements/Slider/hooks/useSlider';
import useSliderData from '@/components/UIElements/Slider/hooks/useSliderData';
import SliderNav from '@/components/UIElements/Slider/sliderNav';
import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

const BlogListings = () => {
  // const [scrollAmt, setScrollAmt] = useState(0);
  // const [unitPageWidth, setPageWidth] = useState(0);
  // const [totalPages, setTotalPages] = useState(0);
  const {totalPages , incrementPage ,decrementPage , pageNum ,scrollAmt} = useSliderData({slideId :'news-listing' });
  // const { pageNum, incrementPage, decrementPage } = useSliderPagination();

  // useEffect(() => {
  //   setScrollAmt(unitPageWidth * pageNum);
  // }, [pageNum]);

  // useEffect(() => {
  //   const slide = document.getElementById('news-listing');
  //   if (slide) {
  //     let totalWidth = 0;
  //     let itemsPerPage = 0;
  //     const children = slide.children;
  //     if (children && children.length > 0) {
  //       for (const key in children) {
  //         if (children[key].clientWidth) {
  //           if (totalWidth + children[key].clientWidth < slide.clientWidth) {
  //             totalWidth = totalWidth + children[key].clientWidth;
  //             itemsPerPage += 1;
  //           }
  //         }
  //       }
  //     }
  //     setTotalPages(Math.ceil(slide.childElementCount / itemsPerPage));
  //     setPageWidth(totalWidth);
  //   }
  // }, []);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
     incrementPage()  
    },
    onSwipedRight: () => {      
      decrementPage()
    },
  });

  return (
    <section className="w-full bg-secondary-grey">
      <SectionContainer cssClass="!pr-[0px]">
        <div className="flex items-center justify-between md:pr-[80px]">
          <div>
            <SectionHeadings title={NEWS_TITLE.title} subTitle={NEWS_TITLE.subTitle} />
          </div>
          <div className="items-center hidden md:flex">
            <div className="mr-[30px]">
              <Button label="More" tabIndex={0} handleOnClick={() => null} ariaLabel="More  News" />
            </div>
            <div>
              <SliderNav handleOnClick={decrementPage} cssClass="mr-[16px]" disable={pageNum === 0} leftNav />
              <SliderNav handleOnClick={incrementPage} disable={pageNum === totalPages - 1} />
            </div>
          </div>
        </div>
        <div className="pt-[24px] md:pt-[80px]" {...handlers}>
          <Slider
            scrollPercent={-scrollAmt + 'px'}
            id="news-listing"
            pageNum={pageNum}
            slideClass="!w-[73.4%] !min-w-[264px] md:!w-[29.2%] w-full md:!min-w-[404px] !md:max-w-[400px]"
          >
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
