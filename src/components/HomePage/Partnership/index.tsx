'use client';

import React, { useEffect } from 'react';
import Container from '@/components/UIElements/wrapper-container';
import SectionTitle from '@/components/UIElements/SectionHeadings/SectionTitle';
import SubSectionTitle from '@/components/UIElements/SectionHeadings/SubSectiontitle';
import { motion } from 'framer-motion';
import ImageCard, { IimageCard } from './imageCard';
import { ITitleAttributes } from '../ServicesListing/interafces';
import PartnerShipGrid from './PartnerShipGrid';
import useSliderPagination from '@/components/UIElements/Slider/hooks/useSlider';

export interface IPartnershipData extends ITitleAttributes {
  data: IimageCard[];
}

const SLIDES_PER_PAGE = 3;

const PartnerShip = ({ data, title, sub_title }: IPartnershipData) => {
  const { jumpToPage, incrementPage, pageNum } = useSliderPagination({ slidesLength: 3, initialPage: 0 });

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    intervalId = setInterval(() => {
      console.log(pageNum)
      const isLastPage = 3;
      if (pageNum + 1 === isLastPage) {
        jumpToPage(0);
      } else {
        incrementPage();
      }
    }, 2500);
    console.log('herere');
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [pageNum, data.length]);

  const isVisible = (index: number) => {
    const firstPage = pageNum * SLIDES_PER_PAGE + pageNum;
    const lastPage = firstPage + SLIDES_PER_PAGE;
    // console.log(firstPage, lastPage, firstPage === index || lastPage === index);
    return firstPage <= index && index <= lastPage;
  };

  return (
    <div className="relative">
      <Container>
        <div>
          <SectionTitle title={title} />
          <SubSectionTitle title={sub_title} />
        </div>
        <motion.div className="  pb-[45.5px] pt-[37px] lg:pb-[106px] lg:pt-[110px] gap-y-[15.3px] gap-x-[6.38%] grid grid-cols-2  content-center items-center border-1 md:grid-cols-3 lg:grid-cols-4 lg:gap-[5%]">
          {[...data,...data ,...data]?.map((card, index) => {
            return (
              <motion.div
                className={` transition-all duration-[700ms]  ${
                  isVisible(index)
                    ? 'flex-shrink-0 w-[40.55vw] h-[112.7px] md:w-full lg:w-full lg:h-[177px]'
                    : 'square-[0px]  overflow-hidden'
                }`}
                key={card.attributes.url}
              >
                <ImageCard key={card.attributes.url} attributes={card.attributes} />
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
      <div className="mt-[93px] absolute top-0 z-[-1] w-full hidden lg:block overflow-clip">
        <PartnerShipGrid />
      </div>
    </div>
  );
};

export default PartnerShip;
