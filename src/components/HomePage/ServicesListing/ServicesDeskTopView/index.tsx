'use client';

import Tabs from '@/components/UIElements/Tabs';
import React, { useState } from 'react';
import { ITabHeaderData } from '@/components/UIElements/Tabs/TabsHeader';
import { appendAssetUrl } from '@/utils';
import ServicesListing from './TabBody';
import { ICoreServices } from '../interafces';

export interface IServicesDeskTopView {
  serviceData: ICoreServices;
}

const ServicesDeskTopView = ({ serviceData }: IServicesDeskTopView) => {
  const getHeaderData = (): ITabHeaderData[] => {
    const headerdata = serviceData.data?.map((res) => {
      return {
        service: res.attributes.title,
        icon: appendAssetUrl(res.attributes.media_url.data[0].attributes.url),
      };
    });
    return headerdata ?? [];
  };

  const [tab, updateTab] = useState<ITabHeaderData>(getHeaderData()[0]);

  const getServises = () => {
    return serviceData.data?.map((service) => {
      return (
        <ServicesListing
          cssClass={service.attributes.title === tab.service ? 'block' : 'hidden'}
          key={service.attributes.title}
          services={service.attributes.sub_services?.data ?? []}
        />
      );
    });
  };

  const changeSelectedTab = (data: { service: string }) => {
    const updatedTabData = serviceData.data?.find((service) => service.attributes.title === data.service);
    updateTab({
      service: updatedTabData?.attributes.title ?? '',
      icon: appendAssetUrl(updatedTabData?.attributes.media_url.data[0].attributes.url ?? ''),
    });
  };

  return (
    <Tabs
      cssClass="hidden md:block"
      onTabChange={(data) => changeSelectedTab(data)}
      selectedTab={tab}
      headerData={getHeaderData()}
      tabBody={getServises()}
    />
  );
};

export default ServicesDeskTopView;
