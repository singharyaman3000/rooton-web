/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { pricingPlansDetails } from '@/app/services/apiService/coachingContentsAPI';
import DropDownCaret from '@/components/Icons/DropDownCaret';
import { trackEvent } from '../../../../gtag';
// import SignRetainerAgreementModal from '@/components/ProfilePage/SignRetainerAgreementModal';
// import { useHeaderData } from '@/hooks/HeaderDataProvider';

type TrainingCardProps = {
  our_plans: pricingPlansDetails;
  onPricingCTAButtonClick: () => void;
  redirectUrl?: string;
  domain?: string;
  position?: number;
};

const PlanCard: React.FC<TrainingCardProps> = ({
  our_plans,
  onPricingCTAButtonClick,
  redirectUrl,
  domain,
  position,
}) => {
  const [expanded, setExpanded] = useState<boolean[]>(
    our_plans.features.map(() => {
      return false;
    }),
  );
  // const [showModal, setShowModal] = useState(false);

  // const { email } = useHeaderData();

  const handleButtonClick = () => {
    // Check if there is a redirect URL and use it if no lead forms are present
    if (redirectUrl && (!our_plans.lead_forms || our_plans.lead_forms.length === 0)) {
      window.open(redirectUrl, '_blank'); // Open the URL in a new tab
    } else if (our_plans.lead_forms && our_plans.lead_forms.length > 0) {
      onPricingCTAButtonClick();
    } else {
      // setShowModal(true);
    }
  };
  return (
    <div className="flex flex-row relative my-5">
      <div className={`pricing-card   shadow-xl w-full xl:max-w-[436px] ${position === 1 && 'mx-auto'} ${position===2 && 'ml-auto'}`}>
        {our_plans.popular && (
          <div className="absolute top-0 right-[-2.6rem] mr-6 -mt-4">
            <div
              className="inline-flex items-center text-xs font-semibold
               py-1.5 px-3 bg-[#f59723] text-white rounded-full shadow-sm shadow-slate-950/5"
            >
              Most Popular
            </div>
          </div>
        )}
        <div
          className="planName-heading text-black justify-center
           items-center text-center font-extrabold text-2xl py-3.5"
        >
          {our_plans.planName}
        </div>
        <div className="">
          <div className="px-6 pb-6 ">
            <div className="mb-5 md:text-xs sm:text-xs">
              <div className="flex justify-center items-baseline mb-5">
                {our_plans.price && <div className="pricing-text font-bold text-4xl pt-8">${our_plans.price}</div>}
              </div>
              <div className="font-semibold text-sm h-[70px] pricing-text mb-5">{our_plans.planDescription}</div>
              <button
                disabled
                className="bg-[#FFCB70] hover:bg-[#f59723] w-full
                inline-flex justify-center whitespace-nowrap px-3.5 py-3
                text-[17px] font-bold text-black hover:text-white focus-visible:outline-none
                focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600
                transition-colors duration-150 cursor-not-allowed"
                onClick={() => {
                  trackEvent({
                    action: 'Coaching Plans',
                    category: 'Coaching',
                    label: our_plans.planName,
                  });
                  handleButtonClick();
                }}
              >
                {our_plans.ctapurchase}
              </button>
            </div>
            {our_plans.validity && (
              <div className="pricing-text font-semibold mb-3">Validity: {our_plans.validity}</div>
            )}
            {!domain?.includes('rooton.ca') && our_plans.pricingINR && (
              <div className="pricing-text font-semibold mb-3">Pricing: {our_plans.pricingINR}</div>
            )}
            {domain?.includes('rooton.ca') && our_plans.pricingCAD && (
              <div className="pricing-text font-semibold mb-3">Pricing: {our_plans.pricingCAD}</div>
            )}
            <div className="pricing-text font-medium mb-3">Includes:</div>
            <ul className="pricing-text text-sm space-y-3 grow">
              {our_plans.features.map((feature, index) => {
                const isExpanded = expanded[index];
                const subFeatures = feature.slice(1);

                return (
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                  <li
                    key={feature[0]}
                    className="flex flex-col text-base font-medium cursor-pointer"
                    onClick={() => {
                      const newExpanded = [...expanded];
                      newExpanded[index] = !isExpanded;
                      setExpanded(newExpanded);
                    }}
                  >
                    <div className="flex items-center">
                      <div
                        tabIndex={0}
                        role="button"
                        onClick={() => {
                          const newExpanded = [...expanded];
                          newExpanded[index] = !isExpanded;
                          setExpanded(newExpanded);
                        }}
                        className={`${
                          isExpanded ? 'rotate-180' : 'rotate-0'
                        } line-clamp-2 flex-shrink-0 mr-[10px]  transition-all delay-75`}
                      >
                        <DropDownCaret />
                      </div>
                      <span>{feature[0]}</span>
                    </div>
                    {isExpanded && (
                      <ul className="pricing-text text-sm space-y-4 grow ml-5 font-normal">
                        {subFeatures.map((subFeature) => {
                          return (
                            <li key={subFeature} className="flex mt-[8px] items-center">
                              <svg
                                className="w-2 h-2 text-[#f59723] mr-3 shrink-0"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx="10" cy="10" r="8" fill="currentColor" />
                              </svg>
                              <div>{subFeature}</div>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      {/* <SignRetainerAgreementModal
        email={email}
        isModalOpen={showModal}
        docShorthand="sv"
        toggleModal={() => {
          setShowModal(false);
        }}
      /> */}
    </div>
  );
};

export default PlanCard;
