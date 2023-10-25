'use client';

import SectionHeadings from '@/components/UIElements/SectionHeadings';
import Slider from '@/components/UIElements/Slider';
import useSliderData from '@/components/UIElements/Slider/hooks/useSliderData';
import { useSwipeable } from 'react-swipeable';
import ArticleCard from '../ArticleCard';
import SliderNav from '@/components/UIElements/Slider/sliderNav';

const data = [...Array(20)].map((_, index) => ({
  key: index,
  img: '',
  heading: `1500-${index} Candidates were invited by IRCC in the Third Round of Express Entry Category Based Draw`,
  description:
    'Obtaining Canadian permanent residency is an exciting opportunity for individuals looking to settle in Canada. As part of the immigration …',
}));

const BlogsCarousel = () => {
  const { totalPages, incrementPage, decrementPage, pageNum, scrollAmt } = useSliderData({
    slideId: 'blogs-listing',
    sliderData: data,
  });

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      incrementPage();
    },
    onSwipedRight: () => {
      decrementPage();
    },
  });

  const numberOfDots = data.length >= 8 ? 8 : data.length;
  console.log(scrollAmt);

  return (
    <section>
      <div className="py-10 pl-6 md:px-20 flex bg-secondary-grey justify-between items-end">
        <div>
          <SectionHeadings title="Blogs" subTitle="Immigration Articles" />
        </div>
        <div className=" hidden md:block">
          <SliderNav handleOnClick={decrementPage} cssClass="mr-[16px]" disable={pageNum === 0} leftNav />
          <SliderNav handleOnClick={incrementPage} disable={pageNum === totalPages - 1} />
        </div>
      </div>
      <div className="w-[100%] md:pl-20 bg-secondary-grey" {...handlers}>
        <Slider
          scrollPercent={`${-scrollAmt}px`}
          id="blogs-listing"
          pageNum={pageNum}
          loading={false}
          loadingUI={<div>Loading...</div>}
          slideParentClass="!justify-start"
          // slideClass="w-[100%] md:max-w-[380px]"
          slideClass="!w-full md:!w-[380px] px-0 md:px-[12px]"

          //   slideClass='!w-[73.4%] px-[8px] md:px-[15px] !min-w-[264px] md:!w-[29.6%] w-full md:!min-w-[380px] md:!max-w-[430px]'
        >
          {data.map((detail) => {
            return <ArticleCard key={detail.key} attributes={{} as any} />;
          })}
        </Slider>
        <div className="md:hidden flex py-4 gap-4 align-center justify-center bg-secondary-grey">
          {[...Array(numberOfDots)].map((_, index) => (
            <span
              className="h-1 w-1 inline-block"
              style={{
                backgroundColor: pageNum === index ? '#F59723' : '#000',
              }}
              key={index}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogsCarousel;
