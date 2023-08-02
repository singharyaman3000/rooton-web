'use client';

import { useState } from 'react';
import { ILeadForm } from '@/app/services/apiService/serviceAPI';
import { LeadForm } from './LeadForm';
import BookAppointment from '../book-appointment';

type LeadFormSectionProps = {
  forms: ILeadForm[];
};

const LeadFormSection = ({ forms }: LeadFormSectionProps) => {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className=" bg-[#fff6e7]">
      <div className={`${isLoading ? 'hidden' : 'block'} w-full h-full`}>
        {(forms[step].type ?? '') === 'form' ? (
          <LeadForm
            key={forms[step].formId}
            region={forms[step].region ?? ''}
            portalId={forms[step].portalId ?? ''}
            formId={forms[step].formId ?? ''}
            onFormSubmitted={() => {}}
            onFormSubmit={() => {
              if (forms[step + 1].type === 'calendly') {
                setIsLoading(true);
                setStep((s) => {
                  return s + 1;
                });
              } else {
                setIsLoading(true);
                setStep((s) => {
                  return s + 1;
                });
              }
            }}
            onFormReady={() => {
              if (isLoading) {
                setIsLoading(false);
              }
            }}
            target={`studyvisa${forms[step].formId}`}
          />
        ) : (
          <BookAppointment
            url={forms[step].url ?? ''}
            onEventTypeViewed={() => {
              setIsLoading(false);
            }}
          />
        )}
      </div>
      <div
        className={` min-h-[350px] bg-[#fff6e7] ${isLoading ? ' flex' : ' hidden'} flex justify-center items-center`}
      >
        Loading...
      </div>
    </div>
  );
};

export default LeadFormSection;
