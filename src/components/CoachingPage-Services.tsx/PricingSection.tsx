import React, { useState } from 'react';
import { IPricing } from '@/app/services/apiService/coaching_contentsAPI';

type TrainingCardProps = {
  our_plans: IPricing;
};

const PricingSection: React.FC<TrainingCardProps> = ({ our_plans}) => {
  const [expanded, setExpanded] = useState<boolean[]>(our_plans.features.map(() => false));
  return (
    <div className="flex flex-row relative my-5">
      <div className="price-tab p-6 shadow-xl border-t-[60px] border-[#EBEBEB] mr-[30px] min-w-[350px] max-w-full items-start lg:max-w-none">
        <style jsx>{`
        
        .price-tab {
         background-color: #f5f5f5;
        }

        .purchase-btn{
           background-color: #FFCB70;
        }

        .purchase-btn:hover{
          background-color: #f59723;
        }
        
        .sub-list{
          margin-top: 8px !important;
        }

        .plan-name-rel{
          position: relative;
          bottom: 69px;
        }

        @media (min-width: 1658px) {
          .price-tab {
            width: 440px;
            padding: 40px;
          }

          .plan-name-rel{
            bottom: 85px;
          }
        }

          @media (max-width: 768px) {
            .price-tab-text {
              font-size: 13px;
            }
          }
  
          @media (max-width: 480px) {
            .price-tab-text {
              font-size: 12px;
            }
            .price-tab {
              min-width: 300px;
              max-width: 100%;
              padding: 40px;
            }

            .plan-name-rel{
              bottom: 85px;
            }
          }
        `}</style>
        {our_plans.popular && (
          <div className="absolute top-0 right-5 mr-6 -mt-4">
            <div className="inline-flex items-center text-xs font-semibold py-1.5 px-3 bg-[#f59723] text-white rounded-full shadow-sm shadow-slate-950/5">
              Most Popular
            </div>
          </div>
        )}
        <div className="mb-5 price-tab-text">
          <div className="plan-name-rel text-black text-center font-extrabold text-2xl">{our_plans.planName}</div>
          <div className="flex items-center justify-center items-baseline mb-5">
            <div className="text-black font-bold text-4xl">${our_plans.price}</div>
          </div>
          <div className="font-semibold text-sm h-[70px] text-black mb-5">{our_plans.planDescription}</div>
          <a
            className="purchase-btn w-full inline-flex justify-center whitespace-nowrap px-3.5 py-3 text-[17px] font-bold text-black hover:text-white focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150"
            href="#0">
            Purchase Plan
          </a>
        </div>
        <div className="text-black font-medium font-semibold mb-3">Validity: {our_plans.validity}</div>
        <div className="text-black font-medium mb-3">Includes:</div>
        <ul className="text-black text-sm space-y-3 grow">
          {our_plans.features.map((feature, index) => {
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
                    {subFeatures.map((subFeature, subIndex) => (
                      <li key={subIndex} className="flex sub-list items-center">
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
  );
};

export default PricingSection;


