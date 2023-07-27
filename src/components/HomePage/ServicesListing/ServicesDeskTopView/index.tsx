'use client';

import Tabs from '@/components/UIElements/Tabs';
import React, { useState } from 'react';
import { ITabData } from '@/components/UIElements/Tabs/TabsHeader';
import ServicesListing from './TabBody';
import { IServiceData } from '..';


export interface IServicesDeskTopView extends IServiceData {}

const ServicesDeskTopView = ({ serviceData }: IServicesDeskTopView) => {
  const [tab, updateTab] = useState<ITabData>(serviceData[0]);

  const getServises = () => {
    return serviceData.map((service) => {
      return (
        <ServicesListing
          cssClass={tab.service === service.service ? 'block' : 'hidden'}
          key={service.service}
          services={service.services}
        />
      );
    });
  };
  return (
    <Tabs
      cssClass="hidden md:block"
      onTabChange={(data) => updateTab(data)}
      selectedTab={tab}
      headerData={serviceData}
      tabBody={getServises()}
    />
  );
};

export default ServicesDeskTopView;
