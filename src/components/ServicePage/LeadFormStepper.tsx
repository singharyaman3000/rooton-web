'use client';

import { FormConstants } from '@/app/constants/hubspotConfig';
import { SERVICES_TITLE } from '@/app/constants/textConstants';
import { IMeetingData } from '@/app/services/apiService/serviceAPI';
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

export const CONSULTATION_TYPES = {
  PAID: 'PAID',
  FREE: 'FREE',
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
      <div className={`${showNavButtons ? 'flex' : 'hidden'} justify-between w-full mt-10`}>
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
  calenderLink: IMeetingData | undefined;
  isBookAppointment: boolean;
  singlePageForm?: boolean;
  ctaClickSource: string;
  // eslint-disable-next-line no-unused-vars
  onFormSubmit?: (data: HTMLFormElement) => void;
  // eslint-disable-next-line no-unused-vars
  onFormSubmitted?: (data: HTMLFormElement) => void;
  // eslint-disable-next-line no-unused-vars
  onProgress?: (progress: number) => void;
  // eslint-disable-next-line no-unused-vars
  scrollToTop: () => void;
  // eslint-disable-next-line no-unused-vars
  initScroll?: () => void;
};

const LeadFormStepper = (
  {
    region,
    portalId,
    formId,
    target,
    onFormSubmit,
    onProgress,
    scrollToTop,
    calenderLink,
    isBookAppointment,
    initScroll,
    singlePageForm = false,
    ctaClickSource,
  }: LeadFormStepperProps) => {
  const { noOfFieldsAtaTime } = SERVICES_TITLE.leadForm;
  const showFrom = useRef<number>(0);
  const showTo = useRef<number>(noOfFieldsAtaTime);

  const [disableNextButton, setDisableNextButton] = useState(false);
  const [disableBackButton, setDisableBackButton] = useState(true);
  const [userData, setUserData] = useState({ firstname: '', lastname: '', email: '' });
  const [consultationType, setConsultationType] = useState('');
  const [showError, setShowError] = useState(false);

  const [showCalender, setShowCalender] = useState(false);

  const stepNo = useRef<number>(1);
  const formLength = useRef<number>(0);
  const ctaClickType = useRef<string>('');

  const calculateProgress = () => {
    const progress = (stepNo.current / formLength.current) * 100;
    if (onProgress) onProgress(progress);
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

  const hideAllErrorMessages = (hide: boolean) => {
    const form = document.getElementById(SERVICES_TITLE.leadForm.wrapperId)?.getElementsByTagName('form');
    const fieldsets = (form && form[0].querySelectorAll('fieldset')) || [];
    for (let i = 0; i < fieldsets.length; i += 1) {

      const fields = fieldsets[i].querySelectorAll('.hs-form-field');

      for (let j = 0; j < fields.length; j += 1) {
        const errorList = fields[j].querySelector('.no-list') as HTMLUListElement;

        if (errorList) {
          errorList.style.display = hide ? 'none' : 'block';
        }

      }

    }
  };

  const checkForErrors = () => {
    const form = document.getElementById(SERVICES_TITLE.leadForm.wrapperId)?.getElementsByTagName('form');
    const fieldsets = (form && form[0].querySelectorAll('fieldset')) || [];

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

      const inputQuerySelectedInput = input?.querySelector('input');

      let tagname =
        inputQuerySelectedInput?.tagName ||
        input?.querySelector('select')?.tagName ||
        input?.querySelector('textarea')?.tagName;

      if (inputQuerySelectedInput?.type === 'checkbox') {
        tagname = 'CHECKBOX';
      } else if (inputQuerySelectedInput?.type === 'radio') {
        tagname = 'RADIO';
      } else if (inputQuerySelectedInput?.type === 'tel') {
        tagname = 'PHONE';
      }

      switch (tagname) {
      case 'INPUT':
        if ((input.querySelector('input') as HTMLInputElement).value) {
          hasValue = true;
        }
        break;
      case 'PHONE': {
        const { value } = (input.querySelector('input') as HTMLInputElement);
        if (value.split('').length > 5 && value.split(' ')[1].match(/^\d+$/)) {
          hasValue = true;
        }
        break;
      }
      case 'SELECT':
        if ((input.querySelector('select') as HTMLSelectElement).value) {
          hasValue = true;
        }
        break;
      case 'CHECKBOX':
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

    const form = document.getElementById(SERVICES_TITLE.leadForm.wrapperId)?.getElementsByTagName('form');
    const fieldsets = (form && form[0].querySelectorAll('fieldset')) || [];

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
    formLength.current = (el?.length ?? 0) / noOfFieldsAtaTime;
    handleMultiStep(el);
  };

  const triggerAfakeSubmit = () => {
    const form = document.getElementById(SERVICES_TITLE.leadForm.wrapperId)?.getElementsByTagName('form')[0];
    form?.querySelector('.actions')?.querySelector('input')?.click();
  };

  const onNextClick = () => {
    if (checkForErrors() || checkForMandatoryFields()) {
      triggerAfakeSubmit();
      return;
    }
    scrollToTop();
    setDisableBackButton(false);
    const el = document.querySelectorAll('fieldset');
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
    scrollToTop();
    setDisableNextButton(false);
    hideSubmitButton(true);
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
    ctaClickType.current = ctaClickSource;
  }, [ctaClickSource]);

  const getConsultationType = (form: HTMLFormElement) => {
    if (form) {
      const consulationFields = Array.from(form.querySelectorAll('input')).filter((ele) => {
        return ele.name.includes('preferred_consultation_type_');
      });
      const isFree = consulationFields.length ?
        !(consulationFields.length &&
          consulationFields.find((item) => { return item.value.toLowerCase().includes('paid'); })?.checked) :
        !(ctaClickType.current && ctaClickType.current === CONSULTATION_TYPES.PAID);
      // eslint-disable-next-line no-nested-ternary
      const selectedType = isFree && calenderLink?.free ? 'free' : calenderLink?.paid ? 'paid' : 'free';
      setConsultationType(selectedType);
    }
  };

  const getMeetingUrl = () => {
    if (!calenderLink) return '';
    const { firstname, lastname, email } = userData;
    const meetingLink = calenderLink[consultationType as keyof IMeetingData];

    let finalFirstName = firstname.trim();
    let finalLastName = lastname ? lastname.trim() : '';

    if (!finalLastName && finalFirstName.includes(' ')) {
      const names = firstname.split(' ');
      finalLastName = names.length > 1 ? names.pop() || '' : '';
      finalFirstName = names.join(' ');
    }

    const encodedFirstName = encodeURIComponent(finalFirstName);
    const encodedLastName = encodeURIComponent(finalLastName);
    const encodedEmail = encodeURIComponent(email);

    return `${meetingLink}?firstname=${encodedFirstName}&lastname=${encodedLastName}&email=${encodedEmail}&name=${encodedFirstName} ${encodedLastName}`;
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
              if (form) getConsultationType(form);
              if (onFormSubmit) {
                onFormSubmit(form);
              }
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onFormSubmitted: (event: HTMLFormElement, form: {redirectUrl: string; submissionValues: any}) => {
              setUserData(form.submissionValues);
              // show calender
              scrollToTop();
              setShowCalender(true);
              stepNo.current += 1;
              calculateProgress();
            },
            onFormReady: () => {
              formReady();
              if (!singlePageForm) hideSubmitButton(true);
              const form = document.getElementById(SERVICES_TITLE.leadForm.wrapperId)?.getElementsByTagName('form');
              if (form) {
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
    if (isBookAppointment) {
      if (initScroll) initScroll();
    }
  }, [isBookAppointment, initScroll]);

  return !showCalender ? (
    <FormTarget
      showError={showError}
      disableBackButton={disableBackButton}
      disableNextButton={disableNextButton}
      onBackClick={onBackClick}
      onNextClick={onNextClick}
      target={target}
      showNavButtons={!singlePageForm}
    />
  ) : (
    <div id='scheduler-container' className="bg-hubspot-meeting-background h-[54rem] mt-2">
      <iframe className=" w-full h-full" title="AA" src={getMeetingUrl()} />
    </div>
  );
};

export default LeadFormStepper;
