import SectionContainer from '@/components/Containers/SectionContainers';
import SectionHeadings from '@/components/UIElements/SectionHeadings';
import React from 'react';
import { ITitleAttributes } from '../ServicesListing/interafces';
import Processes from './Processes';
import { IOurProcessData } from './interfaces';
import ProcessGrids from './Processes/ProcessGrids';

export interface IOurProcess extends ITitleAttributes {
  json_content: IOurProcessData;
  className?: string;
}

const OurProcess = ({ title, sub_title, json_content, className }: IOurProcess) => {
  return (
    json_content?.process && (
      <section className="relative overflow-y-hidden max-w-screen-max-screen mx-auto my-0">
        <SectionContainer cssClass={`${className} pt-10 md:pt-[100px] fgx`}>
          <SectionHeadings title={title} subTitle={sub_title} />
          <div className=' relative z-[1]'>
            <Processes process={json_content?.process} />
          </div>
          <div className="animate-pulse  absolute top-0 w-[1440px] overflow-y-hidden hidden  md:block  right-[-0.4px]">
            <ProcessGrids />
          </div>
        </SectionContainer>
      </section>
    )
  );
};

export default OurProcess;
