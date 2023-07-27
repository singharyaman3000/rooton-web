'use client';
import Accordion from '@/components/UIElements/Accordions';
import React, { useState } from 'react';
import { IServiceData } from '..';
import TabHeader from '@/components/UIElements/Tabs/TabsHeader';
import { AccordionHeader } from './AccordionHeader';
import AccordionBody from './AccordionBody';

export interface IServicesMobileView extends IServiceData {}

const ServicesMobileView = ({ serviceData }: IServicesMobileView) => {
  const [clickedAccordionId , updateAccordion] = useState<string|null>(null)
  return serviceData.map((sevice) => {
    return <Accordion cssClass={'block md:hidden'} handleOnClick={(accordionId)=>updateAccordion(accordionId === clickedAccordionId ? null : accordionId)} accordionId={sevice.service} openAccordion={clickedAccordionId === sevice.service }  accordionBodyCss='bg-pale-yellow py-0'  accordionBody={<AccordionBody serviceData={serviceData} />} key={sevice.service} header={<AccordionHeader {...sevice} />} />;
  });
};

export default ServicesMobileView;
