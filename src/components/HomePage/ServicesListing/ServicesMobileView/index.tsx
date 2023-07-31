'use client';

import Accordion from '@/components/UIElements/Accordions';
import React, { useState } from 'react';
import { AccordionHeader } from './AccordionHeader';
import AccordionBody from './AccordionBody';
import { ICoreServices } from '../interafces';

export interface IServicesMobileView {
  serviceData: ICoreServices;
}

const ServicesMobileView = ({ serviceData }: IServicesMobileView) => {
  const [clickedAccordionId, updateAccordion] = useState<string | null>(null);
  return serviceData.data?.map((sevice) => {
    return (
      <Accordion
        cssClass={'block md:hidden'}
        handleOnClick={(accordionId) => updateAccordion(accordionId === clickedAccordionId ? null : accordionId)}
        accordionId={sevice.attributes?.title}
        openAccordion={clickedAccordionId === sevice?.attributes?.title}
        accordionBodyCss="bg-pale-yellow py-0"
        accordionBody={<AccordionBody data={sevice.attributes?.sub_services?.data} />}
        key={sevice.attributes?.title}
        header={<AccordionHeader service={sevice.attributes?.title} icon={''} />}
      />
    );
  });
};

export default ServicesMobileView;
