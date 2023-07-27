'use client';

import Accordion from '@/components/UIElements/Accordions';
import React, { useState } from 'react';
import { AccordionHeader } from './AccordionHeader';
import AccordionBody from './AccordionBody';
import { IServiceData } from '../interafces';

export interface IServicesMobileView extends IServiceData {}

const ServicesMobileView = ({ serviceData }: IServicesMobileView) => {
  const [clickedAccordionId, updateAccordion] = useState<string | null>(null);
  return serviceData.map((sevice) => {
    return (
      <Accordion
        cssClass={'block md:hidden'}
        handleOnClick={(accordionId) => updateAccordion(accordionId === clickedAccordionId ? null : accordionId)}
        accordionId={sevice.service}
        openAccordion={clickedAccordionId === sevice.service}
        accordionBodyCss="bg-pale-yellow py-0"
        accordionBody={<AccordionBody serviceData={serviceData} />}
        key={sevice.service}
        header={<AccordionHeader service={sevice.service} services={sevice.services} icon={sevice.icon} />}
      />
    );
  });
};

export default ServicesMobileView;
