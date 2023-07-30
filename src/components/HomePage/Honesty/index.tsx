'use client';

import React from 'react';
import Container from '@/components/UIElements/wrapper-container';
import Description from '@/components/home-contents/Description';
import SectionTitle from '@/components/UIElements/SectionHeadings/SectionTitle';
import SubSectionTitle from '@/components/UIElements/SectionHeadings/SubSectiontitle';
import { motion } from 'framer-motion';
import HonestyCard, { IWhyRootON } from './honestyCard';
import { ITitleAttributes } from '../ServicesListing/interafces';

export type IJsonContent = {
  [key in 'why-rooton']: IWhyRootON[] | null;
};

export interface IHonesty extends ITitleAttributes {
  json_content: IJsonContent;
}

const Honesty = ({ json_content, title, sub_title, description }: IHonesty) => (
  <>
    <Container cssBgClass="honestyGrid">
      <motion.div className="lg:flex lg:flex-row justify-between mb-11 lg:mb-14">
        <div className="mb-2.5 lg:w-[24.58vw]">
          <SectionTitle title={title} />
          <SubSectionTitle title={sub_title} />
        </div>
        <motion.div
          transition={{
            ease: 'easeInOut',
            duration: 0.6,
            delay: 0.02,
          }}
          className="lg:w-[56.875vw] "
        >
          <Description cssClass="mt-6" description={description ?? ''} />
        </motion.div>
      </motion.div>
    </Container>
    <Container>
      <div className="mb-[40px]  lg:mb-[100px]">
        <div className=" grid grid-cols-1 divide-y border-1 border-white lg:divide-x md:grid-cols-2 lg:grid-cols-3 gap-6">
          {json_content?.['why-rooton']?.map((whyRootOn) => (
            <HonestyCard
              key={whyRootOn?.key}
              value={whyRootOn.value}
              icon={process.env.NEXT_ASSETS_BASEURL + whyRootOn.icon}
              position={whyRootOn.position}
            />
          ))}
        </div>
      </div>
    </Container>
  </>
);

export default Honesty;
