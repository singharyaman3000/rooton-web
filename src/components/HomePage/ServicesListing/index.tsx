import SectionContainer from '@/components/Containers/SectionContainers';
import SectionHeadings from '@/components/UIElements/SectionHeadings';
import React from 'react';
import ServicesMobileView from './ServicesMobileView';
import ServicesDeskTopView from './ServicesDeskTopView';
import { IService } from './interafces';

const ServicesListing = ({ core_services, title, sub_title }: IService) => {
  return (
    <section className="w-full bg-primary-white ">
      <SectionContainer cssClass='py-[80px] md:pt-[106px] md:pb-[27px]'>
        <div className="flex items-center justify-between md:pr-[80px] mb-[54px]">
          <div>
            <SectionHeadings title={title} subTitle={sub_title} />
          </div>
        </div>
        <div>
          <ServicesDeskTopView serviceData={core_services} />
          <ServicesMobileView serviceData={core_services} />
        </div>
      </SectionContainer>
    </section>
  );
};

export default ServicesListing;
