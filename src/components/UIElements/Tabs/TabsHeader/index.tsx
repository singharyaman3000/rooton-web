import React from 'react';
import { motion } from 'framer-motion';
import NextImage from '../../NextImage';

export interface ITabHeaderData {
  service: string;
  icon: string;
}
export interface ITabHeader {
  headerData: ITabHeaderData[];
  handleOnClick: (tabData: { service: string }) => void; // eslint-disable-line no-unused-vars
  selectedTab: ITabHeaderData;
}

const containerVarient = {
  show: {
    rotate: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const btnVarient = {
  hidden: { scale: 0, top: 100 },
  show: { scale: 1, top: 0 },
};

const TabHeader = ({ headerData, handleOnClick, selectedTab }: ITabHeader) => {
  return (
    <motion.div variants={containerVarient} initial="hidden" animate="show" className="flex items-center">
      {headerData.map(({ icon, service }) => {
        return (
          <motion.button
            variants={btnVarient}
            type="button"
            onClick={() => handleOnClick({ service })}
            className={`relative p-[15px] tab-header text-primary-text  w-[180px] flex items-center flex-col ${
              service === selectedTab.service ? 'tab-selectedBg text-primary-white' : ''
            }`}
            key={service}
            aria-label={service}
          >
            <div className='relative after:content-[""] after:opacity-[0.25] after:top-0 after:right-[-15px] after:absolute after:w-[1px] after:h-full '>
              <div className="relative w-[30px] my-0 mx-auto h-[25px] ">
                {icon && (
                  <NextImage
                    sizes="100vw"
                    altText={`${service}-icon`}
                    title={`${service}-icon`}
                    src={icon}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                )}
              </div>
              <div className="mt-[8px] text-lg not-italic leading-[normal] tracking-[normal] text-center">
                {service}
              </div>
            </div>
            {service === selectedTab.service && (
              <span className="absolute tab-selectedBg  rotate-45 square-[18px] bottom-[-9px]"></span>
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
};

export default TabHeader;
