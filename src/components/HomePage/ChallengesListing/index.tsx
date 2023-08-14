'use client';

import SectionContainer from '@/components/Containers/SectionContainers';
import React, { useContext, useState } from 'react';
import SectionHeadings from '@/components/UIElements/SectionHeadings';
import HtmlParser from 'react-html-parser';
import Accordion from '@/components/UIElements/Accordions';
import NextImage from '@/components/UIElements/NextImage';
import { appendAssetUrl } from '@/utils';
import { MediaUrl } from '@/app/services/apiService/interfaces';
import CalenderIconYellow from '@/components/Icons/CalendarIconYellow';
import Button from '@/components/UIElements/Button';
import { ITitleAttributes } from '../ServicesListing/interafces';
import ToggleIcon from './ToggleIcon';
import { AccordionBody, AccordionHeader } from './ChallengeListingElements';
import { ModalShowContextname } from '@/providers/coreServicesMOdalOpenContext';

export interface IChallenge {
  key: string;
  value: string;
  position: string;
}

export interface IChallenges {
  challenges: IChallenge[];
}

export interface IChallengesListing extends ITitleAttributes {
  json_content: IChallenges;
  media_url: MediaUrl;
}

const ChallengesListing = ({ title, sub_title, description, json_content, media_url }: IChallengesListing) => {
  const [accordionId, setAccordionId] = useState<string | null>(null);
  const { toggleModalShown } = useContext(ModalShowContextname);

  return (
    <section className="challenges-listing">
      <SectionContainer cssClass="pt-10 pb-[39px] md:py-[80px]">
        <div className="md:flex">
          <div className="md:w-[48.8%] md:pr-[80px]">
            <SectionHeadings title={title} subTitle={sub_title} />
            <p
              className="mt-[34px] md:mt-[24px] text-light-brown md:text-faded-black text-sm font-medium not-italic leading-[1.71] tracking-[normal]
           md:text-base
           "
            >
              {HtmlParser(description ?? '')}
            </p>
            <Button
              label="Get your queries solved"
              ariaLabel="Get your queries solved"
              cssClass="text-white bg-black border-0 !py-[17px] mt-5 mb-3 gap-[4px]"
              handleOnClick={() => {
                toggleModalShown();
              }}
              tabIndex={0}
              icon={<CalenderIconYellow />}
            />
            <div className="relative autoh-image mb-[12px] md:mb-[0px] max-w-[500px] lg:max-w-unset">
              <NextImage
                sizes="(max-width: 768px) 100vw, 50vw"
                title={media_url?.data?.[0]?.attributes?.alternativeText}
                altText={media_url?.data?.[0]?.attributes?.alternativeText}
                fill
                style={{ objectFit: 'contain' }}
                src={appendAssetUrl(media_url?.data?.[0]?.attributes?.url)}
              />
            </div>
          </div>
          <div className="md:w-[43.8%]">
            {json_content.challenges.map((challengObj, index) => {
              return (
                <div
                  className="w-full border-b-sandal last:border-b-0 border-b-[1px] pt-[5px] pb-[8px] md:p-[12px_0px] md:pt-0"
                  key={challengObj?.position}
                >
                  <Accordion
                    openAccordion={challengObj?.position.toString() === accordionId}
                    accordionId={challengObj?.position.toString()}
                    handleOnClick={(selectedAccordionId) => {
                      setAccordionId(selectedAccordionId === accordionId ? null : selectedAccordionId);
                    }}
                    accordionBodyCss={'md:!pb-[24px]'}
                    customToggle={<ToggleIcon isOpen={challengObj?.position.toString() === accordionId} />}
                    customSpacer={<span></span>}
                    cssClass="challenges-accordion  md:p-[0px_12px]  "
                    header={<AccordionHeader value={challengObj?.key} index={index} />}
                    accordionBody={<AccordionBody value={challengObj?.value} />}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default ChallengesListing;
