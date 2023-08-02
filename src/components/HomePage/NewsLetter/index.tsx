import React from 'react';

import SectionContainer from '@/components/Containers/SectionContainers';
import NewsLetterGrid from './NewsLetterGrid';
import HubSpotForm from '../../HubSpotForm';

const NewsLetter = () => {
  return (
    <SectionContainer>
      <div className="bg-pale-sandal  py-6 px-5 md:pt-16 md:pb-[71px] md:px-[52px] flex flex-col md:flex-row md:justify-between md:gap-x-[4%] relative">
        <div className=" w-full md:w-[30.347vw]">
          <h4 className="text-2xl lg:text-[40px] gradient-text text-primary-text font-extrabold not-italic !leading-[1.42] tracking-[normal] mb-2 md:mb-[11px]">
            Sign up for Newsletter
          </h4>
          <p className="text-xs md:text-lg md:leading-[1.83rem]">
            Let us keep you updated on what&apos;s happening in Canada and on how you can broaden your horizons.
          </p>
        </div>
        <div className="mt-[19px] mb-[21px] w-[47.22%] bg-white p-6 z-[1]">
          <HubSpotForm region="na1" portalId="7535538" formId="6c79b7c2-a0bc-4f4e-a8ce-322859294240" />
        </div>
        <div className="top-0 right-0 hidden lg:block absolute z-[0]">
          <NewsLetterGrid />
        </div>
      </div>
    </SectionContainer>
  );
};

export default NewsLetter;
