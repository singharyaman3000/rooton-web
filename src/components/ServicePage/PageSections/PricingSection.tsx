import { pricingPlansDetails } from '@/app/services/apiService/coachingContentsAPI';
import PricingSection from '@/components/CoachingPage-Services/PricingSection';
import SignRetainerAgreementModal from '@/components/ProfilePage/SignRetainerAgreementModal';
import { useHeaderData } from '@/hooks/HeaderDataProvider';
import React, { useEffect, useState } from 'react';

interface PricingSectionProps {
  filteredPricings: pricingPlansDetails[];
}

function PricingSectionWrapper({ filteredPricings }: PricingSectionProps) {
  const [currentDomain, setCurrentDomain] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  const { email } = useHeaderData();

  const handleGetDomain = () => {
    setCurrentDomain(window.location.origin);
  };

  useEffect(() => {
    handleGetDomain();
  }, []);

  return (
    <div className="px-[24px] md:px-[48px] lg:px-[80px]  mt-20 !py-0 pt-10 md:pt-[100px] m-auto max-w-screen-2k">
      <h2
        className={
          'max-w-[340px] md:max-w-none md:text-5xl gradient-text text-primary-text font-extrabold not-italic !leading-[1.42] tracking-[normal] text-[1.75rem]'
        }
      >
        Our Plans
      </h2>
      {currentDomain.length !== 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto w-full">
          {Array.isArray(filteredPricings) &&
            filteredPricings.map((pricing, index) => {
              return (
                <PricingSection
                  key={`${index.toString()}`}
                  our_plans={pricing}
                  domain={currentDomain}
                  onPricingCTAButtonClick={() => {
                    setShowModal(true);
                  }}
                />
              );
            })}
        </div>
      )}

      {email.length !== 0 && (
        <SignRetainerAgreementModal
          toggleModal={() => {
            return setShowModal(false);
          }}
          email={email}
          isModalOpen={showModal}
        />
      )}
    </div>
  );
}

export default PricingSectionWrapper;
