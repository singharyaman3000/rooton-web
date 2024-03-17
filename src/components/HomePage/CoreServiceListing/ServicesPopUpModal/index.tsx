'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import PopUpOverlayWrapper from '../../../UIElements/PopUp/PopUpOverLayWrapper';
import { ModalShowContextname } from '@/providers/coreServicesMOdalOpenContext';
import ServiceListingWrapper from '../UIElements/ServiceListinWrapper';
import ServiceListContent from '../UIElements/ServiceListContent';
import CloseIconButton from '../UIElements/CloseIcon';
import { LG_SCREEN_SIZE } from '@/constants/screenSizes';

const ServicesPopUpModal = () => {
  const { isModalShown, closeCoreServiceList } = useContext(ModalShowContextname);
  const modalRef = useRef<HTMLDivElement | null>(null);

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
        setWindowWidth(window?.innerWidth);
      }
    };

    updateWidth();

    window?.addEventListener('resize', updateWidth);

    return () => {return window?.removeEventListener('resize', updateWidth);};
  }, []);

  const handleModalClose = () => {
    if(windowWidth > LG_SCREEN_SIZE) closeCoreServiceList();
  };

  return (
    <div ref={modalRef} className="hidden lg:block h-full w-full">
      <PopUpOverlayWrapper onClose={handleModalClose} showPopUp={isModalShown}>
        <ServiceListingWrapper cssClass="!md:h-[755px] flex flex-col">
          <div className="w-full flex justify-end px-5">
            <CloseIconButton onClick={closeCoreServiceList} />
          </div>
          <ServiceListContent />
        </ServiceListingWrapper>
      </PopUpOverlayWrapper>
    </div>
  );
};

export default ServicesPopUpModal;
