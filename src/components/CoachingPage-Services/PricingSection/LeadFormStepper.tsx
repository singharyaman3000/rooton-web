/* eslint-disable no-console */

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
  disableNextButton = false,
  disableBackButton,
  showNavButtons,
}: FormTargetProps) => {
  return (
    <div id={SERVICES_TITLE.leadForm.wrapperId} className="mt-12 h-full w-full">
      <div className="h-full w-full" id={target} />

      {showNavButtons && (
        <div className="flex justify-between w-full mt-10">
          <button
            disabled={disableBackButton}
            type="button"
            className="bg-black text-white px-4 py-3.5 min-w-[100px] text-sm font-bold"
            onClick={onBackClick}
          >
            Back
          </button>

          {!disableNextButton && (
            <button
              type="button"
              className="bg-black text-white px-4 py-3.5 min-w-[100px] text-sm font-bold"
              onClick={onNextClick}
            >
              Next
            </button>
          )}
        </div>
      )}
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
  onProgress?: (progress: number) => void;
  // eslint-disable-next-line no-unused-vars
  scrollToTop: () => void;
  // eslint-disable-next-line no-unused-vars
  initScroll?: () => void;
};

const LeadFormStepper = ({
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
}: LeadFormStepperProps) => {
  const noOfFieldsAtaTime = singlePageForm ? 5 : SERVICES_TITLE.leadForm.noOfFieldsAtaTime;
  const showFrom = useRef<number>(0);
  const showTo = useRef<number>(noOfFieldsAtaTime);

  const [disableNextButton, setDisableNextButton] = useState(false);
  const [disableBackButton, setDisableBackButton] = useState(true);
  const [userData, setUserData] = useState({ firstname: '', lastname: '', email: '' });
  const [showError, setShowError] = useState(false);

  const [showCalender, setShowCalender] = useState(false);

  const stepNo = useRef<number>(1);
  const formLength = useRef<number>(0);

  const calculateProgress = () => {
    const progress = (stepNo.current / formLength.current) * 100;
    if (onProgress) onProgress(progress);
  };

  const hideSubmitButton = (hide: boolean) => {
    const form = document.getElementById(target);
    if (!form) {
      console.error(`Form with ID '${target}' not found.`);
      return;
    }
    (form.querySelector('.actions') as HTMLDivElement).style.display = hide ? 'none' : 'block';
  };

  const handleMultiStep = () => {
    const form = document.getElementById(target); // Get the form using the target ID
    if (!form) return;

    const fieldsets = form.querySelectorAll('fieldset');
    for (let i = 0; i < fieldsets.length; i += 1) {
      // Check if the current fieldset is within the range of the current step
      if (i >= showFrom.current && i < showTo.current) {
        fieldsets[i].style.display = 'block';
      } else {
        fieldsets[i].style.display = 'none';
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
    // Use the target prop to get the specific form
    const form = document.getElementById(target);
    if (!form) {
      console.error(`Form with ID '${target}' not found.`);
      return false;
    }

    // Get only the fieldsets that are currently displayed
    const displayedFieldsets = Array.from(form.querySelectorAll('fieldset')).filter((fieldset) => {
      return fieldset.style.display !== 'none';
    });

    // Check for errors in displayed fieldsets
    const hasError = displayedFieldsets.some((fieldset) => {
      return fieldset.querySelectorAll('.hs-error').length > 0;
    });

    // Update the showError state based on whether an error was found
    setShowError(hasError);
    return hasError;
  };

  const checkForMandatoryFields = () => {
    const checkIfCheckboxOrRadioAnyIsChecked = (fields: Element | null) => {
      return Array.from(fields?.querySelectorAll('input[type="checkbox"], input[type="radio"]') || []).some(
        (element) => {
          const input = element as HTMLInputElement;
          return input.checked;
        },
      );
    };

    const checkValue = (input: Element) => {
      const inputElement = input.querySelector('input, select, textarea') as HTMLInputElement;
      if (!inputElement) return false;

      const { type } = inputElement;
      switch (type) {
      case 'checkbox':
      case 'radio':
        return checkIfCheckboxOrRadioAnyIsChecked(input);
      default:
        return !!inputElement.value;
      }
    };

    const form = document.getElementById(target);
    if (!form) {
      console.error(`Form with ID '${target}' not found.`);
      return false;
    }

    // Only check the fieldsets that are currently displayed
    const displayedFieldsets = Array.from(form.querySelectorAll('fieldset')).filter((fieldset) => {
      return fieldset.style.display !== 'none';
    });

    for (const fieldset of displayedFieldsets) {
      const inputs = fieldset.querySelectorAll('.hs-form-field');
      for (const input of inputs) {
        if (input.querySelector('.hs-form-required') && !checkValue(input)) {
          setShowError(true);
          return true;
        }
      }
    }

    setShowError(false);
    return false;
  };

  const formReady = () => {
    const form = document.getElementById(target);
    if (!form) {
      console.error(`Form with ID '${target}' not found.`);
      return;
    }
    const el = form.querySelectorAll('fieldset');
    formLength.current = (el?.length ?? 0) / noOfFieldsAtaTime;
    handleMultiStep();
  };

  const triggerAfakeSubmit = () => {
    // Use the target prop to find the specific form
    const form = document.getElementById(target)?.querySelector('form');

    // Trigger a click on the submit button of the form
    (form?.querySelector('input[type="submit"], button[type="submit"]') as HTMLElement)?.click();

  };

  const onNextClick = () => {
    if (checkForErrors() || checkForMandatoryFields()) {
      triggerAfakeSubmit();
      return;
    }
    scrollToTop();
    setDisableBackButton(false);
    const form = document.getElementById(target);
    if (!form) {
      console.error(`Form with ID '${target}' not found.`);
      return;
    }
    const el = form.querySelectorAll('fieldset');
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

  const getMeetingUrl = () => {
    if (calenderLink)
      // eslint-disable-next-line max-len
      return `${calenderLink}?firstname=${userData.firstname}&lastname=${userData.lastname}&email=${userData.email}`;
    return '';
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
      // Function to initialize HubSpot form
      const loadHubSpotForm = () => {
        // Check if the HubSpot forms library is available
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
            onFormSubmitted: (event: HTMLFormElement, form: { redirectUrl: string; submissionValues: any }) => {
              setUserData(form.submissionValues);
              // show calendar
              scrollToTop();
              setShowCalender(true);
              stepNo.current += 1;
              calculateProgress();
            },

            onFormReady: () => {
              formReady();
              if (singlePageForm) hideSubmitButton(true);
              const formElement = document.getElementById(target)?.querySelector('form');
              if (formElement) {
                formElement.addEventListener('change', onFormBlur);
                formElement.addEventListener('click', onFormClick);
              }
            },
            cssClass: 'huform',
            submitText: 'Submit',
          });
        }
      };

      // Create script element to load HubSpot
      const script = document.createElement('script');
      script.src = FormConstants.SERVICE.hubspotSrc;
      script.async = true; // Load the script asynchronously
      document.body.appendChild(script);

      // Event listener for script load
      script.onload = loadHubSpotForm;
      script.onerror = () => {
        console.error('Error loading the HubSpot script.');
      };
    };

    // Ensuring the script is not already loaded before initializing
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!(window as any).hbspt) {
      initHubSpot();
    }

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
      showNavButtons={singlePageForm}
    />
  ) : (
    <div id="scheduler-container" className="bg-hubspot-meeting-background h-[54rem] mt-2">
      <iframe className=" w-full h-full" title="AA" src={getMeetingUrl()} />
    </div>
  );
};

export default LeadFormStepper;
