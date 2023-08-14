'use client';

import { useEffect, useRef } from 'react';

type FormTargetProps = {
  target: string;
  onNextClick: () => void;
  onBackClick: () => void;
};

const FormTarget = ({ target, onNextClick, onBackClick }: FormTargetProps) => {
  return (
    <div className="mt-12 h-full w-full">
      <div className=" h-full w-full" id={target} />
      <div className=" flex justify-between w-full">
        <button type="button" className=" bg-black text-white px-4 py-2 mt-2" onClick={onBackClick}>
          Back
        </button>
        <button type="button" className=" bg-black text-white px-4 py-2 mt-2" onClick={onNextClick}>
          Next
        </button>
      </div>
    </div>
  );
};

type LeadFormStepperProps = {
  region: string;
  portalId: string;
  formId: string;
  target: string;
  // eslint-disable-next-line no-unused-vars
  onFormSubmit?: (data: HTMLFormElement) => void;
  // eslint-disable-next-line no-unused-vars
  onFormSubmitted?: (data: HTMLFormElement) => void;
};

const LeadFormStepper = ({
  region,
  portalId,
  formId,
  target,
  onFormSubmit,
  onFormSubmitted,
}: LeadFormStepperProps) => {
  const noOfFieldsAtaTime = 7;
  const showFrom = useRef<number>(0);
  const showTo = useRef<number>(7);

  const formReady = () => {
    const formEl = document.querySelector('.huform');
    for (let i = 0; i < (formEl?.children?.length ?? 0); i += 1) {
      const child = formEl?.children[i];
      if (child?.tagName === 'DIV' && i < showTo.current && i >= showFrom.current) {
        (child as HTMLDivElement).style.display = 'block';
      } else {
        (child as HTMLDivElement).style.display = 'none';
      }
    }
  };

  const onNextClick = () => {
    showFrom.current += noOfFieldsAtaTime;
    showTo.current += noOfFieldsAtaTime;
    formReady();
  };

  const onBackClick = () => {
    showFrom.current -= noOfFieldsAtaTime;
    showTo.current -= noOfFieldsAtaTime;
    formReady();
  };

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
            onFormReady: formReady,
            cssClass: 'huform',
          });
        }
      });
    };

    initHubSpot();
  }, []);

  return <FormTarget onBackClick={onBackClick} onNextClick={onNextClick} target={target} />;
};

export default LeadFormStepper;
