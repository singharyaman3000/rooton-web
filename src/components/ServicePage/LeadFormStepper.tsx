'use client';

import { useEffect, useRef, useState } from 'react';

type FormTargetProps = {
  target: string;
  onNextClick: () => void;
  onBackClick: () => void;
  disableNextButton: boolean;
};

const FormTarget = ({ target, onNextClick, onBackClick, disableNextButton }: FormTargetProps) => {
  return (
    <div className="mt-12 h-full w-full">
      <div className=" h-full w-full" id={target} />
      <div className=" flex justify-between w-full mt-10">
        <button type="button" className=" bg-black text-white px-4 py-2 " onClick={onBackClick}>
          Back
        </button>
        {disableNextButton || (
          <button
            disabled={disableNextButton}
            type="button"
            className=" bg-black text-white px-4 py-2"
            onClick={onNextClick}
          >
            Next
          </button>
        )}
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

const LeadFormStepper = ({ region, portalId, formId, target, onFormSubmit, onFormSubmitted }: LeadFormStepperProps) => {
  const noOfFieldsAtaTime = 7;
  const showFrom = useRef<number>(0);
  const showTo = useRef<number>(7);

  const [disableNextButton, setDisableNextButton] = useState(false);
  const [showCalender, setShowCalender] = useState(false);

  const isThereAnyValidationErrors = () => {
    const errors = document.querySelectorAll('.hs-error-msgs');
    errors.forEach((err) => {
      console.log((err as HTMLUListElement).style.display);
      if ((err as HTMLUListElement).style.display === 'block') {
        console.log('True');
      } else {
        console.log('False');
      }
    });
  };

  const formReady = () => {
    const formEl = document.querySelector('.huform');
    formEl?.addEventListener('change', () => {
      setTimeout(() => {
        return isThereAnyValidationErrors();
      }, 100);
    });
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
    const el = document.querySelectorAll('.hs-form-field');
    if (showFrom.current < el.length - noOfFieldsAtaTime) {
      showFrom.current += noOfFieldsAtaTime;
    }

    if (showTo.current >= el.length - noOfFieldsAtaTime) {
      setDisableNextButton(true);
    }

    if (showTo.current < el.length) {
      showTo.current += noOfFieldsAtaTime;
    }
    formReady();
  };

  const onBackClick = () => {
    setDisableNextButton(false);
    if (showFrom.current > 0) {
      showFrom.current -= noOfFieldsAtaTime;
    }

    const el = document.querySelectorAll('.hs-form-field');
    if (showTo.current < el.length + noOfFieldsAtaTime && showTo.current > noOfFieldsAtaTime) {
      showTo.current -= noOfFieldsAtaTime;
    }
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
            onFormSubmitted: () => {
              // show calender
              setShowCalender(true);
            },
            onFormReady: formReady,
            cssClass: 'huform',
          });
        }
      });
    };

    initHubSpot();
  }, []);

  return !showCalender ? (
    <FormTarget
      disableNextButton={disableNextButton}
      onBackClick={onBackClick}
      onNextClick={onNextClick}
      target={target}
    />
  ) : (
    <div>cal</div>
  );
};

export default LeadFormStepper;
