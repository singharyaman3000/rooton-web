import React, { useState, useRef } from 'react';
import { IPricing, ICoachingServicePageContent, ILeadForm } from '@/app/services/apiService/coaching_contentsAPI';
import { CoachingPageWrapper } from '../Wrapper';
import LeadFormSection from './LeadFormSection';

type TrainingCardProps = {
  response: ICoachingServicePageContent;
  our_plans: IPricing;
  isBookAppointment: boolean;
};


const PricingSection: React.FC<TrainingCardProps> = ({ our_plans, isBookAppointment, response}) => {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [selectedLeadForms, setSelectedLeadForms] = useState<ILeadForm[] | null>(null);
  const leadFormRef = useRef<HTMLDivElement>(null);

  const pricingDetailsKey = Object.keys(our_plans.json_content?.pricingDetails ?? {})[0];
const pricingPlans = pricingDetailsKey ? our_plans.json_content.pricingDetails[pricingDetailsKey] : '';


const [expanded, setExpanded] = useState<boolean[]>(pricingPlans ? new Array(pricingPlans.length).fill(false) : []);

  const handleCTAButtonClick = (leadForms: ILeadForm[]) => {
    setShowLeadForm(true);
    setSelectedLeadForms(leadForms);
    setTimeout(() => {
      window.scrollTo({
        top: leadFormRef.current?.getBoundingClientRect().top - 150 + window.pageYOffset,
        behavior: 'smooth',
      });
    }, 0);
  };

  console.log("dsdsdsd",our_plans.planName);

  return (
    <>
     {pricingPlans && pricingPlans.map((plan, index) => (
    <div key={index} className="flex flex-row relative my-5">
      <div className="bg-[#f5f5f5] shadow-xl mr-[30px] min-w-[350px] w-full xl:max-w-[442px]">
       
        {our_plans.popular && (
          <div className="absolute top-0 right-5 mr-6 -mt-4">
            <div className="inline-flex items-center text-xs font-semibold py-1.5 px-3 bg-[#f59723] text-white rounded-full shadow-sm shadow-slate-950/5">
              Most Popular
            </div>
          </div>
        )}
        <div className="text-black bg-[#EBEBEB] justify-center items-center text-center font-extrabold text-2xl mb-8 py-3.5">{our_plans.planName}</div>
        <div className="px-6 pb-6">
        <div className="mb-5 md:text-xs sm:text-xs">
          
          <div className="flex items-center justify-center items-baseline mb-5">
            <div className="text-black font-bold text-4xl">${our_plans.price}</div>
          </div>
          <div className="font-semibold text-sm h-[70px] text-black mb-5">{our_plans.planDescription}</div>
          <a
            className="bg-[#FFCB70] hover:bg-[#f59723] w-full inline-flex justify-center whitespace-nowrap px-3.5 py-3 text-[17px] font-bold text-black hover:text-white focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150"
            onClick={() => handleCTAButtonClick(plan.lead_forms)}
          >
            Purchase Plan
          </a>
        </div>
        <div className="text-black font-medium font-semibold mb-3">Validity: {our_plans.validity}</div>
        <div className="text-black font-medium mb-3">Includes:</div>
        <ul className="text-black text-sm space-y-3 grow">
          {our_plans.features.map((feature: any, index: any) => {
            const isExpanded = expanded[index];
            const subFeatures = feature.slice(1);

            return (
              <li key={index} className="flex flex-col text-base font-medium cursor-pointer" onClick={() => {
                const newExpanded = [...expanded];
                newExpanded[index] = !isExpanded;
                setExpanded(newExpanded);
              }}>
                <div className="flex items-center">
                  <svg
                    className={`w-4 h-4.5 fill-{#333333} mr-2 shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
                    viewBox="0 0 12 12"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => {
                      const newExpanded = [...expanded];
                      newExpanded[index] = !isExpanded;
                      setExpanded(newExpanded);
                    }}
                  >
                   <path d="M2.293 4.293a1 1 0 011.414 0L6 6.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" />
                  </svg>
                  <span>{feature[0]}</span>
                </div>
                {isExpanded && (
                  <ul className="text-black text-sm space-y-4 grow ml-5 font-normal">
                    {subFeatures.map((subFeature: any, subIndex: any) => (
                      <li key={subIndex} className="flex mt-[8px] items-center">
                        <svg
                          className="w-2 h-2 text-[#f59723] mr-3 shrink-0"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="10" cy="10" r="8" fill="currentColor" />
                        </svg>
                        <div>{subFeature}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
        </div>
      </div>
    </div>
    ))}
   {showLeadForm && selectedLeadForms && (
        <CoachingPageWrapper
          className="block p-5 lg:px-[80px] lg:pt-[84] mt-20 m-auto max-w-screen-2k"
        >
          <LeadFormSection
            leadForm={selectedLeadForms}
            leadFormRef={leadFormRef}
            handleCTAButtonClick={() => setShowLeadForm(false)}
            isBookAppointment={isBookAppointment}
          />
        </CoachingPageWrapper>
      )}
    </>
  );
};

export default PricingSection;


