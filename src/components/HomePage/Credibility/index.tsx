'use client';

import React from 'react';
import { MediaUrl } from '@/app/services/apiService/interfaces';
import { motion } from 'framer-motion';
import Description from '../../UIElements/Description';
import ImageCard from '../../UIElements/image-card';
import Container from '../../UIElements/wrapper-container';
import SectionTitle from '../../UIElements/SectionHeadings/SectionTitle';
import SubSectionTitle from '../../UIElements/SectionHeadings/SubSectiontitle';
import CredibilityGrid from './CredibilityGrid';
import SliderNav from '@/components/UIElements/Slider/sliderNav';
import useSliderPagination from '@/components/UIElements/Slider/hooks/useSlider';

interface ICredibilitycontent {
  sub_title: string;
  title: string;
  description: string;
  media_url: MediaUrl;
}

const Credibility = ({ description, title, sub_title, media_url }: ICredibilitycontent) => {
  const { pageNum, incrementPage, decrementPage } = useSliderPagination({
    slidesLength: media_url.data.length ? Math.ceil(media_url.data.length - 1 / 2) : 0,
    initialPage: 0,
  });

  const isVisible = (index: number) => {
    const isLastPage = Math.ceil(media_url.data.length / 2);
    if (pageNum + 1 === isLastPage) {
      return index === media_url.data.length - 1;
    }
    const currentIndex = pageNum * 2;
    const nextIndex = pageNum * 2 + 1;
    return currentIndex === index || nextIndex === index || currentIndex + 1 === media_url.data.length;
  };

  const getPosition = (index: number) => {
    if (index === media_url.data.length - 1) {
      return 'md:top-[29%]';
    }
    if (index % 2 === 0) {
      return 'top-0';
    }
    return 'bottom-0';
  };

  return (
    <div className="relative overflow-x-hidden overflow-y-hidden">
      <Container>
        <div className="mt-10 lg:mt-[120px] md:flex md:justify-between md:w-full">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              ease: 'easeInOut',
              duration: 0.6,
              delay: 0.12,
            }}
            className="w-full md:w-[45%]  max-w-[576px]"
          >
            <SectionTitle title={title} />
            <SubSectionTitle title={sub_title} />
            <Description cssClass="mt-6" description={description} />
          </motion.div>
          <div className="z-10 mx-auto relative h-[264px]  md:!h-[530px] mb-[50px]  md:w-[43.8%] md:mr-[40px]  mt-8 lg:mt-0 items-center  lg:h-full">
            {media_url.data?.map((lisenseImage, index) => {
              return (
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
                  whileInView={
                    isVisible(index) ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? 100 : -100 }
                  }
                  transition={{
                    ease: 'easeInOut',
                    duration: 0.3,
                    delay: 0.01,
                  }}
                  className={`w-full  ${getPosition(index)} absolute `}
                  key={`${lisenseImage?.id}`}
                >
                  <ImageCard
                    key={`${lisenseImage?.id}`}
                    cssClass='h-[120px] sm:w-full md:h-[240px] mx-auto my-0 flex item-center'
                    borderClass={`${lisenseImage?.attributes?.name}`}
                    imageUrl={lisenseImage?.attributes.url}
                    sizes={'30vw'}
                    title={lisenseImage?.attributes.caption ?? ''}
                    altText={lisenseImage?.attributes.alternativeText ?? ''}
                    iconClass={''}
                  />
                </motion.div>
              );
            })}
            <SliderNav
              disable={pageNum === 0}
              cssClass="absolute top-[46%] !right-[unset] -left-[40px]"
              leftNav
              handleOnClick={() => decrementPage()}
            />
            <SliderNav
              disable={pageNum === Math.ceil(media_url.data.length / 2) - 1}
              cssClass="absolute top-[46%] -right-[40px] !left-[unset]"
              handleOnClick={() => incrementPage()}
            />
          </div>
        </div>
      </Container>
      <div className="absolute bottom-0 right-0 hidden lg:block">
        <CredibilityGrid />
      </div>
    </div>
  );
};

export default Credibility;
