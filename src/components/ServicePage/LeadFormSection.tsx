'use client';

import { useState } from 'react';
import { ILeadForm } from '@/app/services/apiService/serviceAPI';
import { LeadForm } from './LeadForm';

type LeadFormSectionProps = {
    forms: ILeadForm[]
}

const LeadFormSection = ({ forms }: LeadFormSectionProps) => {

  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div className={`${isLoading ? 'hidden' : 'block'} w-full h-full`}>
        <LeadForm
          key={forms[step].formId}
          region={forms[step].region}
          portalId={forms[step].portalId}
          formId={forms[step].formId}
          onFormSubmitted={() => {}}
          onFormSubmit={() => {
            setIsLoading(true);
            setStep((s) => {
              return s + 1;
            });
          }}
          onFormReady={() => {
            if (isLoading) {
              setIsLoading(false);
            }
          }}
          target={`studyvisa${forms[step].formId}`}
        />
      </div>
      <div
        className={` min-h-[350px] bg-[#fff6e7] ${isLoading ? ' flex' : ' hidden'} flex justify-center items-center`}
      >
        Loading...
      </div>
    </>
  );
};

export default LeadFormSection;
