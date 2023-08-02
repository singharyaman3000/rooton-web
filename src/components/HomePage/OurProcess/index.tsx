import SectionContainer from '@/components/Containers/SectionContainers';
import SectionHeadings from '@/components/UIElements/SectionHeadings';
import React from 'react';
import { ITitleAttributes } from '../ServicesListing/interafces';
import Processes from './Processes';
import { IOurProcessData } from './interfaces';
import ProcessGrids from './Processes/ProcessGrids';

export interface IOurProcess extends ITitleAttributes {
  json_content: IOurProcessData;
}

const OurProcess = ({ title, sub_title, json_content }: IOurProcess) => {
  return (
    <section className="relative">
      <SectionContainer cssClass='pt-10 md:pt-[100px]'>
        <SectionHeadings title={title} subTitle={sub_title} />
        <Processes process={json_content.process} />
        <div className="animate-pulse  absolute top-0 w-[1440px] overflow-y-hidden hidden  md:block  right-[-1px]">
          <ProcessGrids />
        </div>
      </SectionContainer>
    </section>
  );
};

export default OurProcess;
