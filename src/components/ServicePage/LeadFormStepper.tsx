'use client';

import { FormConstants } from '@/app/constants/hubspotConfig';
import { SERVICES_TITLE } from '@/app/constants/textConstants';
import { useEffect, useRef, useState } from 'react';

type FormTargetProps = {
  target: string;
  onNextClick: () => void;
  onBackClick: () => void;
  disableNextButton: boolean;
  disableBackButton: boolean;
  showError: boolean;
};

const FormTarget = ({
  target,
  showError,
  onNextClick,
  onBackClick,
  disableNextButton,
  disableBackButton,
}: FormTargetProps) => {
  return (
    <div className="mt-12 h-full w-full">
      <div className=" h-full w-full" id={target} />
      <div className=" flex justify-between w-full mt-10">
        <button
          disabled={disableBackButton}
          type="button"
          className=" bg-black text-white px-4 py-3.5 w-[100px] text-sm"
          onClick={onBackClick}
        >
          Back
        </button>
        {disableNextButton || (
          <button type="button" className=" bg-black text-white px-4 py-3.5 w-[100px] text-sm" onClick={onNextClick}>
            Next
          </button>
        )}
      </div>
      {showError && <p className=" text-right text-[#ff0000]"> {SERVICES_TITLE.formError} </p>}
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
  const noOfFieldsAtaTime = 3;
  const showFrom = useRef<number>(0);
  const showTo = useRef<number>(noOfFieldsAtaTime);

  const [disableNextButton, setDisableNextButton] = useState(false);
  const [disableBackButton, setDisableBackButton] = useState(true);
  const [showError, setShowError] = useState(false);

  const [showCalender, setShowCalender] = useState(false);

  const stepNo = useRef<number>(1);
  const formLength = useRef<number>(0);

  const calculateProgress = () => {
    const progress = (stepNo.current / formLength.current) * 100;
    onProgress(progress);
  };

  const hideSubmitButton = (hide: boolean) => {
    (document.querySelector('.actions') as HTMLDivElement).style.display = hide ? 'none' : 'block';
  };

  // eslint-disable-next-line no-undef
  const handleMultiStep = (formEl: NodeListOf<Element>) => {
    for (let i = 0; i < (formEl?.length ?? 0); i += 1) {
      const child = formEl[i];
      if (child?.tagName === 'FIELDSET' && i < showTo.current && i >= showFrom.current) {
        (child as HTMLDivElement).style.display = 'block';
      } else {
        (child as HTMLDivElement).style.display = 'none';
      }
    }
    calculateProgress();
  };

  const hideAllErrorMessages = () => {
    const form = document.getElementsByTagName('form');
    const fieldsets = form[0].querySelectorAll('fieldset');
    for (let i = 0; i < fieldsets.length; i += 1) {
      const fieldset = fieldsets[i];
      const errorList = fieldset.querySelector('.no-list') as HTMLUListElement;
      if (errorList) {
        errorList.style.display = 'none';
      }
    }
  };

  const showAllErrorMessages = () => {
    const form = document.getElementsByTagName('form');
    const fieldsets = form[0].querySelectorAll('fieldset');
    for (let i = 0; i < fieldsets.length; i += 1) {
      const fieldset = fieldsets[i];
      const errorList = fieldset.querySelector('.no-list') as HTMLUListElement;
      if (errorList) {
        errorList.style.display = 'block';
      }
    }
  };

  const checkForErrors = () => {
    const form = document.getElementsByTagName('form');
    const fieldsets = form[0].querySelectorAll('fieldset');

    let hasError = false;

    for (let i = 0; i < fieldsets.length; i += 1) {
      const fieldset = fieldsets[i];
      hasError =
        fieldset.style.display !== 'none' &&
        (fieldset.querySelector('fieldset')?.querySelectorAll('.no-list').length ?? 0) > 0;

      if (hasError) {
        break;
      }
    }

    debugger;
    if (hasError) {
      setShowError(true);
      showAllErrorMessages();
      return true;
    }

    setShowError(false);
    hideAllErrorMessages();
    return false;
  };

  const checkForMandatoryFields = () => {
    const checkIfCheckboxOrRadioAnyIschecked = (fields: Element | null) => {
      const checkboxes = fields?.querySelectorAll('input');
      debugger;

      let checked = false;
      for (let i = 0; i < (checkboxes?.length ?? 0); i += 1) {
        if (checkboxes && checkboxes[i]) {
          checked = checkboxes[i].checked;
        }

        if (checked) {
          break;
        }
      }

      return checked;
    };

    const checkValue = (input: Element) => {
      let hasValue = false;

      let tagname =
        input?.querySelector('input')?.tagName ||
        input?.querySelector('select')?.tagName ||
        input?.querySelector('textarea')?.tagName;

      if (input.querySelector('input')?.type === 'checkbox') {
        tagname = 'CHECKBOX';
      } else if (input.querySelector('input')?.type === 'radio') {
        tagname = 'RADIO';
      } else if (input.querySelector('input')?.type === 'tel') {
        tagname = 'PHONE';
      }

      switch (tagname) {
      case 'INPUT':
        if ((input.querySelector('input') as HTMLInputElement).value) {
          hasValue = true;
        }
        break;
      case 'PHONE':
        if ((input.querySelector('input') as HTMLInputElement).value.split('').length > 5) {
          hasValue = true;
        }
        break;
      case 'SELECT':
        if ((input.querySelector('select') as HTMLSelectElement).value) {
          hasValue = true;
        }
        break;
      case 'CHECKBOX':
        if (checkIfCheckboxOrRadioAnyIschecked(input.querySelector('.input'))) {
          hasValue = true;
        }
        break;
      case 'RADIO':
        if (checkIfCheckboxOrRadioAnyIschecked(input.querySelector('.input'))) {
          hasValue = true;
        }
        break;
      case 'TEXTAREA':
        if ((input.querySelector('textarea') as HTMLTextAreaElement).value) {
          hasValue = true;
        }
        break;
      default:
        hasValue = false;
      }

      return hasValue;
    };

    const form = document.getElementsByTagName('form');
    const fieldsets = form[0].querySelectorAll('fieldset');

    let hasError: boolean = false;

    for (let i = 0; i < fieldsets.length; i += 1) {
      const inputs = fieldsets[i].querySelectorAll('.hs-form-field');

      if (fieldsets[i].style.display !== 'none') {
        for (let j = 0; j < inputs.length; j += 1) {
          const input = inputs[j];

          if (input.querySelector('.hs-form-required') && !checkValue(input)) {
            hasError = true;
          }

          setShowError(hasError ?? false);

          if (hasError) {
            break;
          }
        }
      }

      if (hasError) {
        break;
      }
    }

    return hasError;
  };

  const formReady = () => {
    const el = document.querySelectorAll('fieldset');
    formLength.current = (el?.length ?? 0) / noOfFieldsAtaTime + 1;
    handleMultiStep(el);
  };

  const triggerAfakeSubmit = () => {
    const form = document.getElementsByTagName('form')[0];
    form.querySelector('.actions')?.querySelector('input')?.click();
  };

  const onNextClick = () => {
    if (checkForErrors() || checkForMandatoryFields()) {
      triggerAfakeSubmit();
      return;
    }

    setDisableBackButton(false);
    const el = document.querySelectorAll('fieldset');
    if (showFrom.current < el.length - noOfFieldsAtaTime) {
      showFrom.current += noOfFieldsAtaTime;
      stepNo.current += 1;
    }

    if (showTo.current >= el.length - noOfFieldsAtaTime) {
      setDisableNextButton(true);
      debugger;
      hideSubmitButton(false);
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
    }

    if (showFrom.current === 0) {
      setDisableBackButton(true);
    }

    const el = document.querySelectorAll('.hs-form-field, .hs-submit');
    if (showTo.current < el.length + noOfFieldsAtaTime && showTo.current > noOfFieldsAtaTime) {
      showTo.current -= noOfFieldsAtaTime;
    }

    formReady();
  };

  useEffect(() => {
    const onFormBlur = () => {
      setShowError(false);
    };

    const onFormClick = (e: MouseEvent) => {
      if ((e?.target as HTMLInputElement).className === 'hs-button primary large') {
        showAllErrorMessages();
      }
    };

    const initHubSpot = () => {
      const script = document.createElement('script');
      script.src = FormConstants.SERVICE.hubspotSrc;
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
            onFormSubmit: (form: HTMLFormElement) => {
              if (onFormSubmit) {
                onFormSubmit(form);
              }
            },
            onFormSubmitted: () => {
              // show calender
              setShowCalender(true);
              stepNo.current += 1;
              calculateProgress();
            },
            onFormReady: () => {
              formReady();
              hideSubmitButton(true);
              const form = document.getElementsByTagName('form');
              form[0].addEventListener('change', onFormBlur);
              form[0].addEventListener('click', onFormClick);
            },
            cssClass: 'huform',
            submitText: 'Submit',
          });
        }
      });
    };

    initHubSpot();

    return () => {
      const form = document.getElementsByTagName('form');
      if (form[0]) {
        form[0].removeEventListener('change', onFormBlur);
        form[0].removeEventListener('click', onFormClick);
      }
    };
  }, []);

  return !showCalender ? (
    <FormTarget
      showError={showError}
      disableBackButton={disableBackButton}
      disableNextButton={disableNextButton}
      onBackClick={onBackClick}
      onNextClick={onNextClick}
      target={target}
    />
  ) : (
    <div className=" h-[54rem] mt-2">
      <iframe className=" w-full h-full" title="AA" src="https://meetings.hubspot.com/ajesh-ajayan" />
    </div>
  );
};

export default LeadFormStepper;
