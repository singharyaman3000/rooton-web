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

interface ICredibilitycontent {
  sub_title: string;
  title: string;
  description: string;
  media_url: MediaUrl;
}

const Credibility = ({ description, title, sub_title, media_url }: ICredibilitycontent) => {
  return (
    <div className='relative overflow-x-hidden'>
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
            className="w-full md:w-[50vw] xl:w-[40vw] max-w-[576px]"
          >
            <SectionTitle title={title} />
            <SubSectionTitle title={sub_title} />
            <Description cssClass="mt-6" description={description} />
          </motion.div>
          <div className="z-10 mx-auto lg:mx-0 flex flex-col gap-6 lg:gap-[52px] mt-8 lg:mt-0 items-center md:w-[27.7vw] max-w-[399px] xl:mr-[120px] lg:h-full">
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
      <div className="absolute bottom-0 right-0 hidden lg:block">
        <CredibilityGrid />
      </div>
    </div>
  );
};

export default Credibility;
