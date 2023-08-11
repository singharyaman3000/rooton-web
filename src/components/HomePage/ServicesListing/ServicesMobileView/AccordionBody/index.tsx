import React from 'react';
import ArrowIcon from '@/components/Icons/ArrowIcon';
import { ISubServices } from '../../interafces';
import Markdown from 'marked-react';

const AccordionBody = ({ data }: ISubServices) => {
  return data?.map((service) => {
    return (
      <div className="w-full" key={service.attributes.title + service.attributes.publishedAt}>
        <div className="py-[24px] flex items-center justify-between text-sm font-bold not-italic leading-[normal] tracking-[normal] text-black">
          <Markdown>{service.attributes.title}</Markdown>
          <ArrowIcon cssClas="fill-golden-yellow" />
        </div>
        <div className="w-full h-[1px] bg-[#b17900] opacity-[0.27]"></div>
      </div>
    );
  });
};

export default AccordionBody;
