'use client';

import React from 'react';
import Container from '@/components/UIElements/wrapper-container';
import SectionTitle from '@/components/UIElements/SectionHeadings/SectionTitle';
import SubSectionTitle from '@/components/UIElements/SectionHeadings/SubSectiontitle';
import GridContainer from '@/components/Containers/GridContainers';
import { motion } from 'framer-motion';
import ImageCard, { IimageCard } from './imageCard';
import { ITitleAttributes } from '../ServicesListing/interafces';

export interface IPartnershipData extends ITitleAttributes {
  data: IimageCard[];
}

const PartnerShip = ({ data, title, sub_title }: IPartnershipData) => {
  return (
    <Container>
      <div>
        <SectionTitle title={title} />
        <SubSectionTitle title={sub_title} />
      </div>
      <GridContainer cssBgClass="partnersGrid md:py-[100px]">
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
          className=" grid grid-cols-2  content-center items-center border-1 md:grid-cols-3 lg:grid-cols-4 gap-20"
        >
          {data?.map((card) => <ImageCard key={card.attributes.url} attributes={card.attributes} />)}
        </motion.div>
      </GridContainer>
    </Container>
  );
};

export default PartnerShip;
