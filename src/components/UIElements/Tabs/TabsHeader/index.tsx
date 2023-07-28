import React from 'react';
import NextImage from '../../NextImage';
import { motion } from 'framer-motion';

export interface ITabHeaderData {
  service: string;
  icon: string;
}
export interface ITabHeader {
  headerData: ITabHeaderData[];
  handleOnClick: (tabData:{service:string}) => void; // eslint-disable-line no-unused-vars
  selectedTab: ITabHeaderData;
}

const containerVarient = {
  // hidden: { rotate: 90 },
  show: {
      rotate: 0,
      transition: {
          staggerChildren: 0.1,
          delayChildren: 0.3
      }
  }
};

const btnVarient  = {
  hidden: { scale: 0, top: 100 },
  show: { scale: 1, top: 30 }
};


const TabHeader = ({ headerData, handleOnClick, selectedTab }: ITabHeader) => {
  console.log(headerData , "000000000000000")
  return (
    <motion.div
    variants={containerVarient}
    initial="hidden"
    animate="show"
    className="flex items-center">
      {headerData.map(({ icon, service }) => {
        return (
          <motion.button
            variants={btnVarient}
            type="button"
            onClick={() => handleOnClick({service})}
            className={`p-[15px] text-primary-text  w-[180px] flex items-center flex-col ${
              service === selectedTab.service ? 'bg-primary-black text-primary-white' : ''
            }`}
            key={service}
            aria-label={service}
          >
            <div className="relative square-[30px] mb-[8px]">
             {icon && <NextImage
                sizes="100vw"
                altText={`${service}-icon`}
                title={`${service}-icon`}
                src={icon}
                fill
                style={{ objectFit: 'cover' }}
              />}
            </div>
            <div className="text-lg not-italic leading-[normal] tracking-[normal] text-center">{service}</div>
          </motion.button>
        );
      })}
    </motion.div>
  );
};

export default TabHeader;
