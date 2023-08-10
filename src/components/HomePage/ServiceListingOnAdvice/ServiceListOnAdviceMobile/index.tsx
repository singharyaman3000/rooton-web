'use client';

import React from 'react';
import ListHeading from '../ListHeading';
import ListContainer from '../ListContainer';
import { useEffect } from 'react';

export interface IserviceList {
  serviceType: string;
  services: string[];
}

const ServiceListingOnAdviceMobile = () => {

    useEffect(() => {

        const appBody = document.getElementById('appBody') as HTMLDivElement
        appBody.style.overflow = 'hidden';
    }, []);

  const serviceListObjectStructure:IserviceList[] = [
    {
      serviceType: 'Temporary residence',
      services: [
        'Study Visa',
        'Closed Work Permit (LMIA Based)',
        ' Open Work Permit (LMIA Based)',
        'Visitor Visa',
        'Super Visa',
        'Study Permit Extension',
        'Post-graduation Work Permit',
        'Post-graduation Work Permit',
        'CAQ Extension',
        'Bridging Open Work Permit',
        'TRV for Inside Canada Permit',
        'Co-op Work Permit',
      ],
    },
    {
      serviceType: 'Permanent Residence',
      services: ['Express Entry - FSW', 'Express Entry CEC', 'Express Entry - FSTP', 'PNP', 'QSWP'],
    },
    {
      serviceType: 'Family Sponsorship',
      services: ['Parents & grandparents', 'Spousal Sponsorship'],
    },
    {
      serviceType: 'Business Immigration',
      services: ['Start-up Visa', 'Self - Employed', 'Investors', 'Entrepreneurs', 'Provincial Nomination Program'],
    },
    {
      serviceType: 'Business Immigration',
      services: ['Start-up Visa', 'Self - Employed', 'Investors', 'Entrepreneurs', 'Provincial Nomination Program'],
    },
    {
      serviceType: 'Business Immigration',
      services: ['Start-up Visa', 'Self - Employed', 'Investors', 'Entrepreneurs', 'Provincial Nomination Program'],
    },
    {
      serviceType: 'Business Immigration',
      services: ['Start-up Visa', 'Self - Employed', 'Investors', 'Entrepreneurs', 'Provincial Nomination Program'],
    },
  ];
  const getServiceListing = (): any => {
    return serviceListObjectStructure.map((serviceListIem) => {
      return (
        <div className="mb-7">
          <ListHeading serviceTitle={serviceListIem?.serviceType} />
          <ListContainer services={serviceListIem?.services} />
        </div>
      );
    });
  };

 
  return (
    <div className="fixed z-[1000] md:hidden w-[100vw] h-[100vh] bg-white  pl-9  pt-[41px]  pb-[36px]">
      <h1 className=" mb-10 text-[22px] tracking-normal font-bold text-black ">
        Select a service for which you need advice on.
      </h1>
      <div className="servicesListingOnAdvice flex flex-col gap-[6.8vw] overflow-y-scroll">
        {getServiceListing()}
      </div>
    </div>
  );
};

export default ServiceListingOnAdviceMobile;
