'use client';

import React, { useEffect } from 'react';
import Container from '@/components/UIElements/wrapperContainer';
import SectionTitle from '@/components/UIElements/SectionHeadings/SectionTitle';
import SubSectionTitle from '@/components/UIElements/SectionHeadings/SubSectiontitle';
import ImageCard, { IimageCard } from './imageCard';
import { ITitleAttributes } from '../ServicesListing/interafces';
import PartnerShipGrid from './PartnerShipGrid';
import useSliderPagination from '@/components/UIElements/Slider/hooks/useSlider';
import Marquee from 'react-fast-marquee';

export interface IPartnershipData extends ITitleAttributes {
  data: IimageCard[];
}

const PartnerShip = ({ data, title, sub_title }: IPartnershipData) => {
  const { jumpToPage, incrementPage, pageNum } = useSliderPagination({ slidesLength: 3, initialPage: 0 });

  useEffect(() => {
    // eslint-disable-next-line no-undef
    let intervalId: NodeJS.Timeout | null = null;
    intervalId = setInterval(() => {
      const isLastPage = 3;
      if (pageNum + 1 === isLastPage) {
        jumpToPage(0);
      } else {
        incrementPage();
      }
    }, 2500);
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [pageNum, data.length]);

  return (
    <div className="relative">
      <Container>
        <div>
          <SectionTitle title={title} />
          <SubSectionTitle title={sub_title} />
        </div>
        <div className="gap-x-[6.38%] flex content-center items-center border-1 lg:gap-[5%]">
          <Marquee style={{ display: 'flex' }} pauseOnClick pauseOnHover>
            {data?.map((card) => <ImageCard key={card.attributes.url} attributes={card.attributes} />)}{' '}
          </Marquee>
        </div>
      </Container>
      <div className="mt-[93px] absolute top-0 z-[-1] w-full hidden lg:block overflow-clip">
        <PartnerShipGrid />
      </div>
    </div>
  );
};

export default PartnerShip;
