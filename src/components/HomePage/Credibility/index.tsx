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
import useSliderData from '@/components/UIElements/Slider/hooks/useSliderData';
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
      return index === pageNum * 2 - 1 || index === pageNum * 2;
    } else {
      const currentIndex = pageNum * 2;
      const nextIndex = pageNum * 2 + 1;
      return currentIndex === index || nextIndex === index || currentIndex + 1 === media_url.data.length;
    }
  };

  return (
    <div className="relative overflow-x-hidden overflow-y-hidden">
      <Container>
        <div className="mt-10 lg:mt-[120px] md:flex md:justify-between md:w-full xl:max-h-[534px]">
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
          <div className="z-10 mx-auto relative  md:!h-[520px]  md:w-[43.8%] md:mr-[40px]  mt-8 lg:mt-0 items-center  lg:h-full">
            {media_url.data?.map((lisenseImage, index) => {
              return (
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
                  whileInView={{
                    opacity: isVisible(index) ? 1 : 0,
                    x: isVisible(index) ? 0 : index % 2 === 0 ? 100 : -100,
                  }}
                  transition={{
                    ease: 'easeInOut',
                    duration: 0.6,
                    delay: 0.12,
                  }}
                  className={`w-full  ${index % 2 === 0 ? 'top-0' : 'bottom-0'} absolute `}
                  key={`${lisenseImage?.id}`}
                >
                  {index}
                  <ImageCard
                    index={index}
                    key={`${lisenseImage?.id}`}
                    cssClass={`h-[50.7px] sm:w-[80%] md:h-[16.7vw] mx-auto my-0 flex item-center`}
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
              disable={pageNum === Math.ceil(media_url.data.length - 1 / 2)}
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
