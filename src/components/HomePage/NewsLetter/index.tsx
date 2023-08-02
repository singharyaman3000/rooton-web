import SectionContainer from '@/components/Containers/SectionContainers';
import React from 'react';

const NewsLetter = () => {
  return (
    <SectionContainer>
      <div className="bg-pale-sandal  py-6 px-5 md:pt-16 md:pb-[71px] md:px-[52px] flex flex-col md:flex-row md:gap-x-[4%]">
        <div className=" w-full md:w-[30.34vw]">
          <h4
            className='text-2xl lg:text-[40px] gradient-text text-primary-text font-extrabold not-italic !leading-[1.42] tracking-[normal] mb-2 md:mb-[11px]'
          >
            Sign up for Newsletter
          </h4>
          <p className="text-xs md:text-lg ">
            Let us keep you updated on what`&apos;`s happening in Canada and on how you can broaden your horizons.
          </p>
        </div>
        <div className="mt-[19px] mb-[21px] ">form here</div>
      </div>
    </SectionContainer>
  );
};

export default NewsLetter;
