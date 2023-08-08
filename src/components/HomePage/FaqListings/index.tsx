'use client';

import SectionContainer from '@/components/Containers/SectionContainers';
import React, { useState } from 'react';
import Accordion from '@/components/UIElements/Accordions';
import SectionHeadings from '@/components/UIElements/SectionHeadings';
import { ITitleAttributes } from '../ServicesListing/interafces';
import ToggleIcon from '../ChallengesListing/ToggleIcon';
import { AccordionBody, AccordionHeader } from '../ChallengesListing/ChallengeListingElements';

export interface IFaqData {
  faq: { key: string; value: string; position: string }[];
}

export interface IFaQListing extends ITitleAttributes {
  json_content: IFaqData;
}

const FaqListing = ({ json_content, title, sub_title }: IFaQListing) => {
  const [accordionId, setAccordionId] = useState<string | null>(null);

  return (
    <section>
      <SectionContainer cssClass="py-10 md:pt-[20px] md:pb-[100px]">
        <SectionHeadings subCssClass="mb-[2px] md:mb-[38px]" title={title} subTitle={sub_title} />
        {json_content?.faq?.map(({ key, value, position }) => {
          return (
            <div key={key} className="border-b-sandal  border-b-[1px] pt-[5px] pb-[8px] md:p-[12px_0px]">
              <Accordion
                accordionId={position.toString()}
                header={<AccordionHeader value={key} />}
                openAccordion={position.toString() === accordionId}
                handleOnClick={(selectedAccordionId) => {
                  setAccordionId(selectedAccordionId === accordionId ? null : selectedAccordionId.toString());
                }}
                cssClass="faq-accordion md:p-[0px_12px] "
                accordionBody={<AccordionBody value={value} />}
                accordionBodyCss={'md:!pb-[24px]'}
                customToggle={<ToggleIcon isOpen={position.toString() === accordionId} />}
                customSpacer={<span></span>}
              />
            </div>
          );
        })}
      </SectionContainer>
    </section>
  );
};

export default FaqListing;
