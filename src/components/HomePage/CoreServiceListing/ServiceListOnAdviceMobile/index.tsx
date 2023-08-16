'use client';

import React, { useContext, useEffect, useState } from 'react';
import ListHeading from '../UIElements/ListHeading';
import ListContainer from '../UIElements/ListContainer';
import { useHeaderFooterContext } from '@/providers/headerFooterDataProvider';
import { motion } from 'framer-motion';
import CloseIconButton from '../UIElements/CloseIcon';
import { MobileModalShowContextname } from '@/providers/coreServicesModalMobileContext';

export interface IserviceList {
  serviceType: string;
  services: string[];
}

const ServiceListingOnAdviceMobile = () => {
  const { headerFooterData } = useHeaderFooterContext();
  const { isModalShown, toggleModalShown } = useContext(MobileModalShowContextname);
  const [xValue, setxValue] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    if (isModalShown) {
      document.body.style.overflow = 'hidden';
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalShown]);

  useEffect(() => {
    const updateWidth = () => {
      if (window?.innerWidth) {
        const screenWidth = window?.innerWidth;
        setWindowWidth(window?.innerWidth);
        const xvalue = screenWidth < 448 ? 0 : window.innerWidth - 448 || 0;
        setxValue(xvalue);
      }
    };

    updateWidth();

    window?.addEventListener('resize', updateWidth);

    return () => window?.removeEventListener('resize', updateWidth);
  }, []);

  const getServiceListing = () => {
    const ServicesList = headerFooterData && headerFooterData[0]?.attributes?.core_services?.data;
    /* eslint-disable no-unsafe-optional-chaining */
    ServicesList?.sort((a,b) => a?.id - b?.id);
    return ServicesList?.map((listItem) => {
      return (
        <div className="mb-7" key={listItem?.id}>
          <ListHeading serviceTitle={listItem?.attributes?.title || ''} />
          <ListContainer services={listItem?.attributes?.sub_services || []} />
        </div>
      );
    });
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isModalShown && headerFooterData && headerFooterData[0]?.attributes?.core_services && (
        <motion.div
          initial={{ opacity: 1, x: windowWidth }}
          whileInView={{
            opacity: 1,
            x: xValue,
          }}
          transition={{
            ease: 'easeInOut',
            duration: 0.5,
            delay: 0,
          }}
          className="fixed pt-5 z-[1001] max-w-[448px] lg:hidden w-[100vw] h-[100vh] bg-white"
        >
          <div className='w-full flex justify-end px-5'>
            <CloseIconButton onClick={toggleModalShown} />
          </div>
          <div className="max-h-[calc(100vh-96px)] px-5 my-6 overflow-y-scroll">
            <h1 className=" mb-10 text-[22px] tracking-normal font-bold text-black ">
              Select a service for which you need advice on.
            </h1>
            <div className="flex flex-col pb-[36px] w-full">{getServiceListing()}</div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ServiceListingOnAdviceMobile;
