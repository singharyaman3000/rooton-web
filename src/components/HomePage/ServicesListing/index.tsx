import { SERVICES_TITLE } from '@/app/constants/textConstants';
import SectionContainer from '@/components/Containers/SectionContainers';
import Accordion from '@/components/UIElements/Accordions';
import SectionHeadings from '@/components/UIElements/SectionHeadings';
import Tabs from '@/components/UIElements/Tabs';
import React from 'react';
import ServicesMobileView from './ServicesMobileView';
import ServicesDeskTopView from './ServicesDeskTopView';

export interface IServiceData  {
  serviceData:IService[]
}

export interface IService {
    service :string;
    icon:string;
    services :string[]
}

const servicedata = [
  {
    service: 'Temporary Residence',
    icon: '/images/tempImages/service-icon.svg',
    services: [
      'Study Visa',
      'Work Permit(Open and Closed)',
      'Visitor Visa',
      'Super Visa',
      'Visitor Visa',
      'Post-graduation Work Permit',
      'CAQ Extension',
      'Bridging Open Work Permit',
      'TRV for Inside Canada Permit',
      'Co-op Work Permit',
    ],
  },
  {
    service: 'Permanent Residence',
    icon: '/images/tempImages/service-icon.svg',
    services: [
      'Study Visa',
      'Work Permit(Open and Closed)',
      'Visitor Visa',
      'Super Visa',
      'Visitor Visa',
      'Post-graduation Work Permit',
      'CAQ Extension',
      'Bridging Open Work Permit',
      'TRV for Inside Canada Permit',
      'Co-op Work Permit',
    ],
  },
  {
    service: 'Family Sponsorship',
    icon: '/images/tempImages/service-icon.svg',
    services: [
      'Study Visa',
      'Work Permit(Open and Closed)',
      'Visitor Visa',
      'Super Visa',
      'Visitor Visa',
      'Post-graduation Work Permit',
      'CAQ Extension',
      'Bridging Open Work Permit',
      'TRV for Inside Canada Permit',
      'Co-op Work Permit',
    ],
  },
];

const ServicesListing = () => {
  return (
    <section className="w-full bg-primary-white ">
      <SectionContainer >
        <div className="flex items-center justify-between md:pr-[80px] mb-[54px]">
          <div>
            <SectionHeadings title={SERVICES_TITLE.title} subTitle={SERVICES_TITLE.subTitle} />
          </div>
        </div>
        <div >
            <ServicesDeskTopView serviceData={servicedata}/>
            {/* <Tabs cssClass='hidden md:block' headerData={servicedata}/> */}
            {/* <ServicesMobileView  /> */}

        </div>
      </SectionContainer>
    </section>
  );
};

export default ServicesListing;
