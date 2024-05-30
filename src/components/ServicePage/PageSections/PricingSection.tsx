import { pricingPlansDetails } from '@/app/services/apiService/coachingContentsAPI';
import PricingSection from '@/components/CoachingPage-Services/PricingSection';
import React, { useEffect, useState } from 'react';

interface PricingSectionProps {
  filteredPricings: pricingPlansDetails[];
}

function PricingSectionWrapper({ filteredPricings }: PricingSectionProps) {
  const [currentDomain, setCurrentDomain] = useState<string>('');

  const handleGetDomain = () => {
    setCurrentDomain(window.location.origin);
  };

  useEffect(()=>{
    handleGetDomain();
  },[]);

  return (
    <div className="px-[24px] md:px-[48px] lg:px-[80px]  mt-20 !py-0 pt-10 md:pt-[100px] m-auto max-w-screen-2k">
      <h2
        className={'max-w-[340px] md:max-w-none md:text-5xl gradient-text text-primary-text font-extrabold not-italic !leading-[1.42] tracking-[normal] text-[1.75rem]'}
      >
        Our Plans
      </h2>
      {currentDomain.length!==0 && <div className="flex flex-col gap-3 md:flex-row justify-evenly mx-auto w-full">
        {Array.isArray(filteredPricings) &&
          filteredPricings.map((pricing, index) => {
            return (
              <PricingSection
                key={`${index.toString()}`}
                our_plans={pricing}
                domain={currentDomain}
                onPricingCTAButtonClick={() => {}}
              />
            );
          })}
      </div>}
    </div>
  );
}

export default PricingSectionWrapper;
