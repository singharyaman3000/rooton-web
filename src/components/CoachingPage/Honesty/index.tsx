'use client';

import React from 'react';
import Container from '@/components/UIElements/wrapper-container';
import Description from '@/components/UIElements/Description';
import SectionTitle from '@/components/UIElements/SectionHeadings/SectionTitle';
import SubSectionTitle from '@/components/UIElements/SectionHeadings/SubSectiontitle';
import { motion } from 'framer-motion';
import HonestyCard, { IWhyRootON } from './honestyCard';
import { ITitleAttributes } from '../ServicesListing/interafces';
import HonestyGrid from './HonestyGrid';

export type IJsonContent = {
  'why_rooton': IWhyRootON[] | null;
};

export interface IHonesty extends ITitleAttributes {
  json_content: IJsonContent;
}

const Honesty = ({ json_content, title, sub_title, description }: IHonesty) => (
  <div className="relative md:pt-[73px] lg:mt-[50px]">
    <Container>
      <motion.div className="lg:flex lg:flex-row justify-between mb-11 lg:mb-[21px] relative">
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
          <Description cssClass="mt-[34px] md:mt-0" description={description ?? ''} />
        </motion.div>
      </motion.div>
      <div className="mb-6  lg:mt-[69px]">
        <div className="honestyBackground honestycard grid grid-cols-1 border-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px]">
          {json_content?.why_rooton?.map((whyRootOn) => {
            return (
              <HonestyCard
                key={''}
                title={whyRootOn.title}
                cardKey={whyRootOn.id}
                id={whyRootOn.id}
                value={whyRootOn.value}
                icon={process.env.NEXT_ASSETS_BASEURL + whyRootOn.icon}
                position={whyRootOn.position}
              />
            );
          })}
        </div>
      </div>
    </Container>
    <div className="absolute top-0 left-0 hidden lg:block w-full overflow-clip">
      <HonestyGrid />
    </div>
  </div>
);

export default Honesty;
