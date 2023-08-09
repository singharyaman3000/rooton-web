import ServiceListingOnAdvice from '@/components/HomePage/ServiceListingOnAdvice';
import React from 'react';

const TalkToOurExpert = () => {
    
  return (
    <div className="relative">
      <button className="hidden text-sm font-bold h-[52px] text-white lg:block bg-black lg:w-[157px] px-5 py-4">
        Talk to our Expert
      </button>

      <div className="absolute right-0 top-[61px] ">
        <ServiceListingOnAdvice/>
      </div>
    </div>
  );
};

export default TalkToOurExpert;
