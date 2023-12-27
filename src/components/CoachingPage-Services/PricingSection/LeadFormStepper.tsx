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
  showNavButtons: boolean;
};

const FormTarget = ({
  target,
  onNextClick,
  onBackClick,
  disableNextButton,
  disableBackButton,
  showNavButtons,
}: FormTargetProps) => {
  return (
    <div id={SERVICES_TITLE.leadForm.wrapperId} className="mt-12 h-full w-full">
      <div className=" h-full w-full" id={target} />
      <div className={`${showNavButtons? 'flex': 'hidden'} justify-between w-full mt-10`}>
        <button
          disabled={disableBackButton}
          type="button"
          className=" bg-black text-white px-4 py-3.5 min-w-[100px] text-sm font-bold"
          onClick={onBackClick}
        >
          Back
        </button>
        {disableNextButton || (
          <button
            type="button"
            className=" bg-black text-white px-4 py-3.5 min-w-[100px] text-sm font-bold"
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
  calenderLink: string;
  isBookAppointment: boolean;
  singlePageForm?: boolean;
  // eslint-disable-next-line no-unused-vars
  onFormSubmit?: (data: HTMLFormElement) => void;
  // eslint-disable-next-line no-unused-vars
  onFormSubmitted?: (data: HTMLFormElement) => void;
  // eslint-disable-next-line no-unused-vars
  onProgress: (progress: number) => void;
  // eslint-disable-next-line no-unused-vars
  initScroll: () => void;
};

const LeadFormStepper = (
  {
    region,
    portalId,
    formId,
    target,
    onFormSubmit,
    onProgress,
    calenderLink,
    isBookAppointment,
    initScroll,
    singlePageForm = false,
  }: LeadFormStepperProps) => {
  const noOfFieldsAtaTime = 4;
  const showFrom = useRef<number>(0);
  const showTo = useRef<number>(noOfFieldsAtaTime);
  const [disableNextButton, setDisableNextButton] = useState(false);
  const [disableBackButton, setDisableBackButton] = useState(true);
  const [showError, setShowError] = useState(false);

  const [showCalender, setShowCalender] = useState(false);
  const [userData, setUserData] = useState({ firstname: '', lastname: '', email: '' });
  const stepNo = useRef<number>(1);
  const formLength = useRef<number>(0);

  const calculateProgress = () => {
    const progress = (stepNo.current / formLength.current) * 100;
    onProgress(progress);
  };

  const hideSubmitButton = (hide: boolean) => {
    (document.querySelector(`#${target} .actions`) as HTMLDivElement).style.display = hide ? 'none' : 'block';
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

  const hideAllErrorMessages = (hide: boolean) => {
    const form = document.getElementById(SERVICES_TITLE.leadForm.wrapperId)?.getElementsByTagName('form');
    const fieldsets = (form && form[0].querySelectorAll('fieldset')) || [];
    for (let i = 0; i < fieldsets.length; i += 1) {

      const fields = fieldsets[i].querySelectorAll('.hs-form-field');

      for(let j = 0; j < fields.length; j+=1) {
        const errorList = fields[j].querySelector(`#${target} .no-list`) as HTMLUListElement;

        if (errorList) {
          errorList.style.display = hide ? 'none' : 'block';
        }

      }

    }
  };

  const checkForErrors = () => {
    const form = document.getElementById(SERVICES_TITLE.leadForm.wrapperId)?.getElementsByTagName('form');
    const fieldsets = (form && form[0].querySelectorAll(`#${target} fieldset`)) || [];

    let hasError = false;

    for (let i = 0; i < fieldsets.length; i += 1) {
      const fieldset = fieldsets[i] as HTMLElement;
      hasError =
        fieldset.style.display !== 'none' &&
        (fieldset.querySelector(`#${target} fieldset`)?.querySelectorAll(`#${target} .no-list`).length ?? 0) > 0;

      if (hasError) {
        break;
      }
    }

    if (hasError) {
      setShowError(true);
      hideAllErrorMessages(false);
      return true;
    }

    setShowError(false);
    hideAllErrorMessages(true);
    return false;
  };

  const checkForMandatoryFields = () => {
    const checkIfCheckboxOrRadioAnyIschecked = (fields: Element | null) => {
      const checkboxes = fields?.querySelectorAll('input');
      let checked = false;
      for (let i = 0; i < (checkboxes?.length ?? 0); i += 1) {
        if (checkboxes && checkboxes[i]) {
          checked = (checkboxes[i] as HTMLInputElement).checked;
        }

        if (checked) {
          break;
        }
      }

      return checked;
    };

    const checkValue = (input: Element) => {
      let hasValue = false;

      const inputQuerySelectedInput = input?.querySelector(`#${target} input`) as HTMLInputElement;

      let tagname =
        inputQuerySelectedInput?.tagName ||
        input?.querySelector(`#${target} select`)?.tagName ||
        input?.querySelector(`#${target} textarea`)?.tagName;

      if (inputQuerySelectedInput && inputQuerySelectedInput.type === 'checkbox') {
        tagname = 'CHECKBOX';
      } else if (inputQuerySelectedInput && inputQuerySelectedInput.type === 'radio') {
        tagname = 'RADIO';
      } else if (inputQuerySelectedInput && inputQuerySelectedInput.type === 'tel') {
        tagname = 'PHONE';
      }

      switch (tagname) {
      case 'INPUT':
        if ((input.querySelector(`#${target} input`) as HTMLInputElement).value) {
          hasValue = true;
        }
        break;
      case 'PHONE': {
        const { value } = (input.querySelector(`#${target} input`) as HTMLInputElement);
        if (value.split('').length > 5 && value.split(' ')[1].match(/^\d+$/)) {
          hasValue = true;
        }
        break;
      }
      case 'SELECT':
        if ((input.querySelector(`#${target} select`) as HTMLSelectElement).value) {
          hasValue = true;
        }
        break;
      case 'CHECKBOX' || 'RADIO':
        if (checkIfCheckboxOrRadioAnyIschecked(input.querySelector(`#${target} .input`))) {
          hasValue = true;
        }
        break;
      case 'TEXTAREA':
        if ((input.querySelector(`#${target} textarea`) as HTMLTextAreaElement).value) {
          hasValue = true;
        }
        break;
      default:
        hasValue = false;
      }

      return hasValue;
    };

    const form = document.getElementById(SERVICES_TITLE.leadForm.wrapperId)?.getElementsByTagName('form');
    const fieldsets = (form && form[0].querySelectorAll(`#${target} fieldset`)) || [];

    let hasError: boolean = false;

    for (let i = 0; i < fieldsets.length; i += 1) {
      const inputs = fieldsets[i].querySelectorAll('.hs-form-field');

      if ((fieldsets[i] as HTMLElement).style.display !== 'none') {
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
    const el = document.querySelectorAll(`#${target} fieldset`);
    formLength.current = (el?.length ?? 0) / noOfFieldsAtaTime;
    handleMultiStep(el);
  };

  const triggerAfakeSubmit = () => {
    const form = document.getElementById(SERVICES_TITLE.leadForm.wrapperId)?.getElementsByTagName('form')[0];
    const button = form?.querySelector(`#${target} .actions`)?.querySelector(`#${target} input`) as HTMLButtonElement;
    button?.click();
  };
  const onNextClick = () => {
    if (checkForErrors() || checkForMandatoryFields()) {
      triggerAfakeSubmit();
      return;
    }

    setDisableBackButton(false);
    const el = document.querySelectorAll(`#${target} fieldset`);
    if (showFrom.current < el.length - noOfFieldsAtaTime) {
      showFrom.current += noOfFieldsAtaTime;
      stepNo.current += 1;
    }

    if (showTo.current >= el.length - noOfFieldsAtaTime) {
      setDisableNextButton(true);
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
      hideSubmitButton(true);
    }

    formReady();
  };

  useEffect(() => {
    const onFormBlur = () => {
      setShowError(false);
    };

    const onFormClick = (e: MouseEvent) => {
      if ((e?.target as HTMLInputElement).className === 'hs-button primary large') {
        hideAllErrorMessages(false);
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onFormSubmitted: (event: HTMLFormElement, form: {redirectUrl: string; submissionValues: any}) => {
              setUserData(form.submissionValues);
              // show calender
              setShowCalender(true);
              stepNo.current += 1;
              calculateProgress();
            },
            onFormReady: () => {
              formReady();
              if (singlePageForm) hideSubmitButton(true);
              const form = document.getElementById(SERVICES_TITLE.leadForm.wrapperId)?.getElementsByTagName('form');
              if(form) {
                form[0].addEventListener('change', onFormBlur);
                form[0].addEventListener('click', onFormClick);
              }
            },
            cssClass: 'huform',
            submitText: 'Submit',
          });
        }
      });
    };

    initHubSpot();

    return () => {
      const form = document.getElementById(SERVICES_TITLE.leadForm.wrapperId)?.getElementsByTagName('form');
      if (form && form[0]) {
        form[0].removeEventListener('change', onFormBlur);
        form[0].removeEventListener('click', onFormClick);
      }
    };
  }, []);

  useEffect(() => {
    if(isBookAppointment) {
      initScroll();
    }
  }, [isBookAppointment, initScroll]);

  const getMeetingUrl = () => {
    if (calenderLink)
      // eslint-disable-next-line max-len
      return `${calenderLink}?firstname=${userData.firstname}&lastname=${userData.lastname}&email=${userData.email}`;
    return '';

  };

  return !showCalender ? (
    <FormTarget
      showError={showError}
      disableBackButton={disableBackButton}
      disableNextButton={disableNextButton}
      onBackClick={onBackClick}
      onNextClick={onNextClick}
      target={target}
      showNavButtons={singlePageForm}
    />
  ) : (
    <div className=" h-[54rem] mt-2">
      <iframe className=" w-full h-full" title="AA" src={getMeetingUrl()} />
    </div>
  );
};

export default LeadFormStepper;
