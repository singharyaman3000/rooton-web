'use client';

import React from 'react';
import { MediaUrl } from '@/app/services/apiService/interfaces';
import { motion } from 'framer-motion';
import Description from '../home-contents/Description';
import ImageCard from '../UIElements/image-card';
import Container from '../UIElements/wrapper-container';
import SectionTitle from '../UIElements/SectionHeadings/SectionTitle';
import SubSectionTitle from '../UIElements/SectionHeadings/SubSectiontitle';

interface ICredibilitycontent {
  sub_title: string;
  title: string;
  description: string;
  media_url: MediaUrl;
}

const Credibility = ({ description, title, sub_title, media_url }: ICredibilitycontent) => {
  return (
    <Container cssBgClass="credibilityGrid">
      <div className="mt-10 md:flex md:justify-between md:w-full xl:max-h-[534px]">
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
          className="w-full md:w-[50vw] xl:w-[40vw] max-w-[576px]"
        >
          <SectionTitle title={title} />
          <SubSectionTitle title={sub_title} />
          <Description cssClass="mt-6" description={description} />
        </motion.div>
        <div className="flex flex-col gap-6 lg:gap-[52px] mt-8 lg:mt-0 items-center md:w-[27.7vw] max-w-[399px] xl:mr-[120px] lg:h-full">
          {media_url.data?.map((lisenseImage, index) => (
            <ImageCard
              index={index}
              key={`${lisenseImage?.id}`}
              cssClass="h-[50.7px] sm:w-[80%] md:w-full"
              imageUrl={lisenseImage?.attributes.url}
              sizes={'30vw'}
              title={lisenseImage?.attributes.caption ?? ''}
              altText={lisenseImage?.attributes.alternativeText ?? ''}
              iconClass={''}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Credibility;
