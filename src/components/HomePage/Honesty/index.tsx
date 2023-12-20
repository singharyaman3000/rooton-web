'use client';

import React, { useEffect, useState } from 'react';
import Container from '@/components/UIElements/wrapperContainer';
import Description from '@/components/UIElements/Description';
import SectionTitle from '@/components/UIElements/SectionHeadings/SectionTitle';
import SubSectionTitle from '@/components/UIElements/SectionHeadings/SubSectiontitle';
import { motion } from 'framer-motion';
import HonestyCard, { IWhyRootON } from './honestyCard';
import { ITitleAttributes } from '../ServicesListing/interafces';
import HonestyGrid from './HonestyGrid';

export type IJsonContent = {
  /* eslint-disable no-unused-vars */
  [key in 'why-rooton']: IWhyRootON[] | null;
};

type PositionMapType = { [x: string]: number };

export interface IHonesty extends ITitleAttributes {
  json_content: IJsonContent;
}

const Honesty = ({ json_content, title, sub_title, description }: IHonesty) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cardsArray, setCardsArray] = useState<IWhyRootON[]>(json_content?.['why-rooton'] ?? []);
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);

  const length = json_content?.['why-rooton']?.length ?? 0;

  const generateCardsToDisplay = (cardsPerRow: 2 | 3, positionMap: PositionMapType) => {
    const lastCardPosition = length % cardsPerRow;

    if (lastCardPosition === 0) {
      setCardsArray(json_content?.['why-rooton'] ?? []);
      return;
    }

    const extraCards = [...Array(positionMap[lastCardPosition.toString()])].map((_) => {
      return { key: '', icon: '', value: '', position: '' };
    });

    // eslint-disable-next-line no-extra-parens
    const cardsToDisplay = [...(json_content?.['why-rooton'] ?? []), ...extraCards];
    setCardsArray(cardsToDisplay as IWhyRootON[]);
  };

  const handleResize = () => {
    setWindowWidth(window?.innerWidth);
  };

  useEffect(() => {
    if (windowWidth && windowWidth > 1024) {
      const positionMap: PositionMapType = { '1': 2, '2': 1 };
      generateCardsToDisplay(3, positionMap);
    }
    if (windowWidth && windowWidth < 1024 && windowWidth > 768) {
      const positionMap: PositionMapType = { '1': 1 };
      generateCardsToDisplay(2, positionMap);
    }
    if (windowWidth&& windowWidth < 768) {
      setCardsArray(json_content?.['why-rooton'] ?? []);
    }
  }, [windowWidth]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
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
        <div className="mb-6  lg:mb-[69px]">
          <div className="honestyBackground honestycard grid grid-cols-1 border-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px]">
            {cardsArray?.map((whyRootOn, index) => {
              return (
                <HonestyCard
                  // eslint-disable-next-line react/no-array-index-key
                  key={index.toString()}
                  title={whyRootOn?.key}
                  value={whyRootOn.value}
                  icon={whyRootOn.icon}
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
};

export default Honesty;
