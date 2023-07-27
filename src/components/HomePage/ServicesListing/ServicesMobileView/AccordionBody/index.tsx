import React from 'react';
import ArrowIcon from '@/components/Icons/ArrowIcon';
import { IServiceData } from '../../interafces';

const AccordionBody = ({ serviceData }: IServiceData) => {
  return serviceData.map((service) => {
    return (
      <div className="w-full" key={service.service}>
        <div className="py-[24px] flex items-center justify-between text-sm font-bold not-italic leading-[normal] tracking-[normal] text-black">
          {service.service}
          <ArrowIcon cssClas="fill-golden-yellow" />
        </div>
        <div className="w-full h-[1px] bg-[#b17900] opacity-20"></div>
      </div>
    );
  });
};

export default AccordionBody;
