'use client';

import { useEffect, useRef, useState } from 'react';

type FormTargetProps = {
  target: string;
  onNextClick: () => void;
  onBackClick: () => void;
  disableNextButton: boolean;
  disableBackButton: boolean;
};

const FormTarget = ({ target, onNextClick, onBackClick, disableNextButton, disableBackButton }: FormTargetProps) => {
  return (
    <div className="mt-12 h-full w-full">
      <div className=" h-full w-full" id={target} />
      <div className=" flex justify-between w-full mt-10">
        <button
          disabled={disableBackButton}
          type="button"
          className=" bg-black text-white px-4 py-2 "
          onClick={onBackClick}
        >
          Back
        </button>
        {disableNextButton || (
          <button type="button" className=" bg-black text-white px-4 py-2" onClick={onNextClick}>
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
  // eslint-disable-next-line no-unused-vars
  onProgress: (progress: number) => void;
};

const LeadFormStepper = ({ region, portalId, formId, target, onFormSubmit, onProgress }: LeadFormStepperProps) => {
  const noOfFieldsAtaTime = 7;
  const showFrom = useRef<number>(0);
  const showTo = useRef<number>(7);

  const [disableNextButton, setDisableNextButton] = useState(false);
  const [disableBackButton, setDisableBackButton] = useState(true);

  const [showCalender, setShowCalender] = useState(false);

  const stepNo = useRef<number>(1);
  const formLength = useRef<number>(0);

  // const isThereAnyValidationErrors = () => {
  //   const errors = document.querySelectorAll('.hs-error-msgs');
  //   errors.forEach((err) => {
  //     console.log((err as HTMLUListElement).style.display);
  //     if ((err as HTMLUListElement).style.display === 'block') {
  //       console.log('True');
  //     } else {
  //       console.log('False');
  //     }
  //   });
  // };

  const calculateProgress = () => {
    const progress = (stepNo.current / formLength.current) * 100;
    onProgress(progress);
  };

  const handleMultiStep = (formEl: HTMLFormElement) => {
    for (let i = 0; i < (formEl?.children?.length ?? 0); i += 1) {
      const child = formEl?.children[i];
      if (child?.tagName === 'DIV' && i < showTo.current && i >= showFrom.current) {
        (child as HTMLDivElement).style.display = 'block';
      } else {
        (child as HTMLDivElement).style.display = 'none';
      }
    }
    calculateProgress();
  };

  const formReady = () => {
    const formEl = document.querySelector('.huform');
    const el = document.querySelectorAll('.hs-form-field .hs-dependent-field');
    formLength.current = (el?.length ?? 0) / noOfFieldsAtaTime + 1;
    // formEl?.addEventListener('change', () => {
    //   setTimeout(() => {
    //     return isThereAnyValidationErrors();
    //   }, 100);
    // });
    handleMultiStep(formEl as HTMLFormElement);
  };

  const onNextClick = () => {
    setDisableBackButton(false);
    const el = document.querySelectorAll('.hs-form-field');
    if (showFrom.current < el.length - noOfFieldsAtaTime) {
      showFrom.current += noOfFieldsAtaTime;
      stepNo.current += 1;
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
    if (showFrom.current > 1) {
      showFrom.current -= noOfFieldsAtaTime;
      stepNo.current -= 1;
    };

    if(showFrom.current === 0) {
      setDisableBackButton(true);
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
              stepNo.current += 1;
              calculateProgress();
            },
            onFormReady: formReady,
            cssClass: 'huform',
            submitText: 'Proceed',
          });
        }
      });
    };

    initHubSpot();
  }, []);

  return !showCalender ? (
    <FormTarget
      disableBackButton={disableBackButton}
      disableNextButton={disableNextButton}
      onBackClick={onBackClick}
      onNextClick={onNextClick}
      target={target}
    />
  ) : (
    <div className=" h-[54rem]">
      <iframe className=" w-full h-full" title="AA" src="https://meetings.hubspot.com/ajesh-ajayan" />
    </div>
  );
};

export default LeadFormStepper;
