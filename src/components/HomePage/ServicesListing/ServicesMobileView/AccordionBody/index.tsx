import React from 'react';
import ArrowIcon from '@/components/Icons/ArrowIcon';
import { ISubServices } from '../../interafces';
import HtmlParser from 'react-html-parser';

const AccordionBody = ({ data }: ISubServices) => {
  return data?.map((service) => {
    return (
      <div className="w-full" key={service.attributes.title + service.attributes.publishedAt}>
        <div className="py-[24px] flex items-center justify-between text-sm font-bold not-italic leading-[normal] tracking-[normal] text-black">
          {HtmlParser(service.attributes.title)}
          <ArrowIcon cssClas="fill-golden-yellow" />
        </div>
        <div className="w-full h-[1px] bg-[#b17900] opacity-[0.27]"></div>
      </div>
    );
  });
};

export default AccordionBody;
