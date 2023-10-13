'use client';

import { useState } from 'react';

interface PricingTabProps {
  yearly: boolean;
  popular?: boolean;
  planName: string;
  price: number;
  planDescription: string;
  validity: string;
  features: string[][];
}

function PricingTab(props: PricingTabProps) {
  const [expanded, setExpanded] = useState<boolean[]>(props.features.map(() => false));

  return (
    <div className="h-full">
      <div className="relative flex flex-col h-full p-6 rounded-2xl shadow-xl border border-slate-300">
        {props.popular && (
          <div className="absolute top-0 right-0 mr-6 -mt-4">
            <div className="inline-flex items-center text-xs font-semibold py-1.5 px-3 bg-[#f59723] text-white rounded-full shadow-sm shadow-slate-950/5">
              Most Popular
            </div>
          </div>
        )}
        <div className="mb-5">
          <div className="text-black text-center font-extrabold mb-5 text-2xl">{props.planName}</div>
          <div className="flex items-center justify-center items-baseline mb-5">
            <div className="text-black font-bold text-4xl">${props.price}</div>
          </div>
          <div className="text-sm text-black mb-5">{props.planDescription}</div>
          <a
            className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-[#f59723] px-3.5 py-3 text-[17px] font-bold text-white hover:bg-[#F7AC50] focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150"
            href="#0">
            Purchase Plan
          </a>
        </div>
        <div className="text-black font-medium font-semibold mb-3">Validity: {props.validity}</div>
        <div className="text-black font-medium mb-3">Includes:</div>
        <ul className="text-black text-sm space-y-3 grow">
          {props.features.map((feature, index) => {
            const isExpanded = expanded[index];
            const subFeatures = feature.slice(1);

            return (
              <li key={index} className="flex flex-col">
                <div className="flex items-center">
                  <svg
                    className={`w-3 h-3 fill-emerald-500 mr-3 shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
                    viewBox="0 0 12 12"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => {
                      const newExpanded = [...expanded];
                      newExpanded[index] = !isExpanded;
                      setExpanded(newExpanded);
                    }}
                  >
                    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                  </svg>
                  <span>{feature[0]}</span>
                </div>
                {isExpanded && (
                  <ul className="text-black text-sm space-y-3 grow ml-5">
                    {subFeatures.map((subFeature, subIndex) => (
                      <li key={subIndex} className="flex items-center">
                        <svg
                          className="w-3 h-3 fill-emerald-500 mr-3 shrink-0"
                          viewBox="0 0 12 12"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
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
}

export default function PricingTable() {
  const [yearly, setYearly] = useState<boolean>(true);

  return (
    <div className="px-[24px] md:px-[48px] lg:px-[80px]   !py-0 pt-10 md:pt-[100px] fgx">
            <h4 className="max-w-[340px] md:max-w-none mb-10 md:text-5xl gradient-text text-primary-text font-extrabold not-italic !leading-[1.42] tracking-[normal] text-[1.75rem] undefined">
                Our Plans</h4>
      <div className="grid gap-6 lg:grid-cols-3 items-start lg:max-w-none">
        {/* Pricing tab 1 */}
        <PricingTab
          yearly={yearly}
          planName="IELTS My Pace"
          price={29}
          validity="90 days"
          planDescription="For students who wish to learn IELTS at their own speed and at their own time convenience."
          features={[
            [
              'Unlimited placeholder texts',
              'Consectetur adipiscing elit',
              'Excepteur sint occaecat cupidatat',
              'Officia deserunt mollit anim',
            ],
            [
              'Predefined chunks as necessary',
              'Officia deserunt mollit anim',
              'Consectetur adipiscing elit',
              'Excepteur sint occaecat cupidatat',
              'Free from repetition',
            ],
            [
              'Unlimited placeholder texts',
              'Consectetur adipiscing elit',
              'Excepteur sint occaecat cupidatat',
              'Officia deserunt mollit anim',
              'Predefined chunks as necessary',
              'Free from repetition',
            ],
          ]}
        />

        {/* Pricing tab 2 */}
        <PricingTab
          yearly={yearly}
          popular={true}
          planName="IELTS A la Carte"
          price={39}
          validity="Based on chosen modules"
          planDescription="A customized solution for students who want to focus on specific areas of weakness in the IELTS examination"
          features={[
            [
              'Unlimited placeholder texts',
              'Consectetur adipiscing elit',
              'Excepteur sint occaecat cupidatat',
              'Officia deserunt mollit anim',
            ],
            [
              'Predefined chunks as necessary',
              'Officia deserunt mollit anim',
              'Consectetur adipiscing elit',
              'Excepteur sint occaecat cupidatat',
              'Free from repetition',
            ],
            [
              'Unlimited placeholder texts',
              'Consectetur adipiscing elit',
              'Excepteur sint occaecat cupidatat',
              'Officia deserunt mollit anim',
              'Predefined chunks as necessary',
              'Free from repetition',
            ],
          ]}
        />

        {/* Pricing tab 3 */}
        <PricingTab
          yearly={yearly}
          planName="IELTS Velocity"
          price={49}
          validity="30 days"
          planDescription="Designed for those who want to fast-track their IELTS preparation."
          features={[
            [
              'Unlimited placeholder texts',
              'Consectetur adipiscing elit',
              'Excepteur sint occaecat cupidatat',
              'Officia deserunt mollit anim',
            ],
            [
              'Predefined chunks as necessary',
              'Officia deserunt mollit anim',
              'Consectetur adipiscing elit',
              'Excepteur sint occaecat cupidatat',
              'Free from repetition',
            ],
            [
              'Unlimited placeholder texts',
              'Consectetur adipiscing elit',
              'Excepteur sint occaecat cupidatat',
              'Officia deserunt mollit anim',
              'Predefined chunks as necessary',
              'Free from repetition',
            ],
          ]}
        />
      </div>
    </div>
  );
}
