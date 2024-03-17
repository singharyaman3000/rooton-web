/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */

'use client';

import { FormConstants } from '@/app/constants/hubspotConfig';
import { SERVICES_TITLE } from '@/app/constants/textConstants';
import { useHeaderData } from '@/hooks/HeaderDataProvider';
import { useEffect, useState } from 'react';
import { ProfileDataLoader } from '../ProfilePage/ProfileSliderOverlay';

type FormTargetProps = {
  target: string;
  isLoaded: boolean;
};

const FormTarget = ({ target, isLoaded }: FormTargetProps) => {
  return (
    <>
      <div className="" id="lead-form">
        <div id={SERVICES_TITLE.leadForm.wrapperId} className="h-full w-full">
          <div className=" h-full w-full" id={target} />
        </div>
      </div>
      {isLoaded && (
        <div className='m-auto'>
          <ProfileDataLoader />
        </div>
      )}
    </>
  );
};

type FeedbackStepperProps = {
  region: string;
  portalId: string;
  formId: string;
  target: string;
  onFormSubmit?: () => void;
};

const FeedbackStepper = ({ region, portalId, formId, target, onFormSubmit }: FeedbackStepperProps) => {
  const { logo_name, email } = useHeaderData();
  const emailValue = email || '';
  const nameParts = logo_name ? logo_name.split(' ') : ['', ''];
  const firstName = nameParts[0];
  const Lastname = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
  const [isFormLoaded, setIsFormLoaded] = useState(false);
  useEffect(() => {
    const initHubSpot = () => {
      const script = document.createElement('script');
      script.src = FormConstants.SERVICE.hubspotSrc;
      document.body.appendChild(script);
      script.addEventListener('load', () => {
        if ((window as any).hbspt) {
          (window as any).hbspt.forms.create({
            region,
            portalId,
            formId,
            target: `#${target}`,
            onFormSubmitted: () => {
              if (onFormSubmit) {
                onFormSubmit();
              }
            },
            onFormReady: () => {
              setIsFormLoaded(false);
              const emailInputContainer: HTMLInputElement | null = document.querySelector('.hs_email');
              if (emailInputContainer) {
                const emailInput: HTMLInputElement | null = emailInputContainer.querySelector('input[name="email"]');
                if (emailInput) {
                  emailInput.value = emailValue;
                }
                emailInputContainer.style.display = 'none';
              }

              const firstNameInputContainer: HTMLInputElement | null = document.querySelector('.hs_firstname');
              if (firstNameInputContainer) {
                const nameInput: HTMLInputElement | null =
                  firstNameInputContainer.querySelector('input[name="firstname"]');
                if (nameInput) {
                  nameInput.value = firstName;
                }
                firstNameInputContainer.style.display = 'none';
              }

              const lastNameInputContainer: HTMLInputElement | null = document.querySelector('.hs_lastname');
              if (lastNameInputContainer) {
                const lastNameInput: HTMLInputElement | null =
                  lastNameInputContainer.querySelector('input[name="lastname"]');
                if (lastNameInput) {
                  lastNameInput.value = Lastname;
                }
                lastNameInputContainer.style.display = 'none';
              }
            },
            cssClass: 'huform',
            submitText: 'Submit',
          });
        }
      });
    };

    initHubSpot();
    setIsFormLoaded(true);
  }, []);

  return <FormTarget target={target} isLoaded={isFormLoaded} />;
};

export default FeedbackStepper;
