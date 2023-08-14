import React from 'react';
import ArrowIcon from '@/components/Icons/ArrowIcon';
import { ISubServiceData } from '../../interafces';
import HtmlParser from 'react-html-parser';

const ServicesListing = ({ services, cssClass }: { services: ISubServiceData[]; cssClass?: string }) => {
  return (
    <div className={`w-full flex items-center flex-wrap ${cssClass}`}>
      {services.map((service) => {
        return (
          <div
            className={
              'items-center service justify-between w-[45%] delay-75 cursor-pointer text-black hover:text-white transition-all hover:bg-deep-yellow  hover:[&svg]:fill-white [&>svg]:fill-deep-yellow p-[24px_24px_0px_24px]  text-lg font-bold not-italic leading-[normal] tracking-[normal] flex-shrink-0'
            }
            key={service.attributes.title}
          >
            <div className="w-full pb-[25px] flex items-center justify-between ">
              <span className="line-clamp-1 ">{HtmlParser(service.attributes.title)}</span>
              <ArrowIcon cssClas="ml-[8px] flex-shrink-0" />
            </div>
            <div className="w-full h-[1px] bg-[#b17900] opacity-20"></div>
          </div>
        );
      })}
    </div>
  );
};

export default ServicesListing;
