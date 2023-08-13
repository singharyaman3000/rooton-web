'use client';

import React, { useContext } from 'react';
import PopUpOverlayWrapper from '../../../UIElements/PopUp/PopUpOverLayWrapper';
import { ModalShowContextname } from '@/providers/coreServicesMOdalOpenContext';
import ServiceListingWrapper from '../UIElements/ServiceListinWrapper';
import ServiceListContent from '../UIElements/ServiceListContent';
import CloseIconButton from '../UIElements/CloseIcon';

const ServicesPopUpModal = () => {
  const { isModalShown, toggleModalShown } = useContext(ModalShowContextname);

  return (
    <div className="hidden lg:block">
      <PopUpOverlayWrapper onClose={toggleModalShown} showPopUp={isModalShown}>
        <ServiceListingWrapper cssClass="!md:h-[755px]">
          <CloseIconButton onClick={toggleModalShown} />
          <ServiceListContent />
        </ServiceListingWrapper>
      </PopUpOverlayWrapper>
    </div>
  );
};

export default ServicesPopUpModal;
