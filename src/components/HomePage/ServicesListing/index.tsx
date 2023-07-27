import { SERVICES_TITLE } from '@/app/constants/textConstants';
import SectionContainer from '@/components/Containers/SectionContainers';
import SectionHeadings from '@/components/UIElements/SectionHeadings';
import React from 'react';
import ServicesMobileView from './ServicesMobileView';
import ServicesDeskTopView from './ServicesDeskTopView';

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
      <SectionContainer>
        <div className="flex items-center justify-between md:pr-[80px] mb-[54px]">
          <div>
            <SectionHeadings title={SERVICES_TITLE.title} subTitle={SERVICES_TITLE.subTitle} />
          </div>
        </div>
        <div>
          <ServicesDeskTopView serviceData={servicedata} />
          <ServicesMobileView serviceData={servicedata} />
        </div>
      </SectionContainer>
    </section>
  );
};

export default ServicesListing;
