'use client';

import { useEffect } from 'react';

type FormTargetProps = {
  target: string;
};

const FormTarget = ({ target }: FormTargetProps) => {
  return (
    <div className=" h-full w-full">
      <div className="bg-[#fff6e7] p-5 h-full w-full" id={target} />
    </div>
  );
};

type LeadFormProps = {
  region: string;
  portalId: string;
  formId: string;
  target: string;
  onFormSubmit: () => void;
  onFormSubmitted: () => void;
  onFormReady: () => void;
};

export const LeadForm = ({
  region,
  portalId,
  formId,
  target,
  onFormReady,
  onFormSubmit,
  onFormSubmitted,
}: LeadFormProps) => {

  useEffect(() => {
    const initHubSpot = () => {
      const script = document.createElement('script');
      script.src = process.env.NEXT_PUBLIC_HUBSPOT_SRC as string;
      document.body.appendChild(script);
      script.addEventListener('load', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((window as any).hbspt) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).hbspt.forms.create({
            region,
            portalId,
            formId,
            target: `#${target}`,
            onFormSubmit,
            onFormSubmitted,
            onFormReady,
            cssClass: 'huform',
          });
        }
      });
    };

    initHubSpot();
  }, [region, portalId, formId, target, onFormSubmit, onFormSubmitted, onFormReady]);

  return <FormTarget target={target} />;
};
