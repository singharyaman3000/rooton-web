'use client';

import React from 'react';
import { motion } from 'framer-motion';
import TabHeader, { ITabHeader, ITabHeaderData } from './TabsHeader';
import NextImage from '../NextImage';
import TabOverlay from '../../../../public/images/overlay/services-tab-overlay.png';

export type ITabs = Pick<ITabHeader, 'headerData'> & {
  cssClass?: string;
  tabBody: React.ReactNode[] | undefined;
  selectedTab: ITabHeaderData;
  onTabChange: (selectedTabData: { service: string }) => void; // eslint-disable-line no-unused-vars
};

const Tabs = ({ headerData, cssClass, tabBody, onTabChange, selectedTab }: ITabs) => {
  return (
    <div className={cssClass}>
      <TabHeader
        selectedTab={selectedTab}
        handleOnClick={(selectedTabData) => onTabChange(selectedTabData)}
        headerData={headerData}
      />
      <div className="min-h-[550px] max-h-[500px] mt-[26px] bg-pale-yellow relative">
        <div className="w-[67%] p-[24px] flex items-center flex-wrap justify-between">{tabBody}</div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.3,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          viewport={{ once: true }}
          className="absolute top-0 w-[23.5rem] h-full right-0  flex items-end"
        >
          <NextImage
            src={TabOverlay}
            fill
            altText="Tab background image"
            title=""
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Tabs;
