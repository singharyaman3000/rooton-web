'use client';

import React from 'react';
import Container from '@/components/UIElements/wrapper-container';
import SectionTitle from '@/components/UIElements/SectionHeadings/SectionTitle';
import SubSectionTitle from '@/components/UIElements/SectionHeadings/SubSectiontitle';
import { motion } from 'framer-motion';
import ImageCard, { IimageCard } from './imageCard';
import { ITitleAttributes } from '../ServicesListing/interafces';
import PartnerShipGrid from './PartnerShipGrid';

export interface IPartnershipData extends ITitleAttributes {
  data: IimageCard[];
}

const PartnerShip = ({ data, title, sub_title }: IPartnershipData) => {
  return (
    <div className="relative">
      <Container>
        <div>
          <SectionTitle title={title} />
          <SubSectionTitle title={sub_title} />
        </div>
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
          viewport={{ once: true }}
          className=" pb-[45.5px] pt-[37px] lg:pb-[106px] lg:pt-[110px] gap-y-[15.3px] gap-x-[6.38%] grid grid-cols-2  content-center items-center border-1 md:grid-cols-3 lg:grid-cols-4 lg:gap-[5%]"
        >
          {data?.map((card) => <ImageCard key={card.attributes.url} attributes={card.attributes} />)}
        </motion.div>
      </Container>
      <div className="mt-[93px] absolute top-0 z-[-1] w-full hidden lg:block overflow-clip">
        <PartnerShipGrid />
      </div>
    </div>
  );
};

export default PartnerShip;
