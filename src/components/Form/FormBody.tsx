'use client';

import 'tailwindcss/tailwind.css';
import { useEffect, useState } from 'react';
import { FormStep } from './components/FormStep';
import { FormHeader } from './components/FormHeader';
import { PersonalSection } from './formSections/PersonalSection';
import { LanguageSection } from './formSections/LanguageSection';
import { EducationSection } from './formSections/EducationSection';
import { WorkHistorySection } from './formSections/WorkHistorySection';
import { ExpressEntrySection } from './formSections/ExpressEntrySection';
import { JobOfferSection } from './formSections/JobOfferSection';
import { FamilyOrFriendsSection } from './formSections/FamilyFriendsSection';
import { NetWorthSection } from './formSections/NetWorthSection';
import { ContactSection } from './formSections/ContactSection';
import { FormButton } from './components/FormButton';

const FormBody = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isInvalid, setIsInValid] = useState<boolean>(true);

  const setTrigger = () => {
    if (isInvalid) return;
    const trigger = document.getElementById('submitButton');
    trigger?.click();
  };

  const onNextClick = () => {
    if (isInvalid) return;
    setCurrentStep((prevStep) => {
      return prevStep + 1;
    });
  };

  useEffect(() => {
    const initHubSpot = () => {
      const script = document.createElement('script');
      script.src = '//js.hs-scripts.com/43383438.js';
      document.body.appendChild(script);
    };
    initHubSpot();
  }, []);

  return (
    <div className="mt-2 h-full w-full">
      <form
        id="testFormPOC-optimized-test-run"
        onInvalid={(e) => {
          e.preventDefault();
          setIsInValid(true);
        }}
      >
        <FormStep currentStep={currentStep} stepNumber={1}>
          <FormHeader>Personal Profile</FormHeader>
          <PersonalSection onchange={setIsInValid} formNumber={currentStep} />
        </FormStep>

        <FormStep currentStep={currentStep} stepNumber={2}>
          <FormHeader>Your Language Skills</FormHeader>
          <LanguageSection />
        </FormStep>

        <FormStep currentStep={currentStep} stepNumber={3}>
          <FormHeader>Your Education and Training</FormHeader>
          <EducationSection onchange={setIsInValid} formNumber={currentStep} />
        </FormStep>

        <FormStep currentStep={currentStep} stepNumber={4}>
          <FormHeader>Your Work History</FormHeader>
          <WorkHistorySection onchange={setIsInValid} formNumber={currentStep} />
        </FormStep>

        <FormStep currentStep={currentStep} stepNumber={5}>
          <FormHeader>Express Entry Profile</FormHeader>
          <ExpressEntrySection />
        </FormStep>

        <FormStep currentStep={currentStep} stepNumber={6}>
          <FormHeader>Canadian Job Offer</FormHeader>
          <JobOfferSection />
        </FormStep>

        <FormStep currentStep={currentStep} stepNumber={7}>
          <FormHeader>Family or Friends in Canada</FormHeader>
          <FamilyOrFriendsSection />
        </FormStep>

        <FormStep currentStep={currentStep} stepNumber={8}>
          <FormHeader>Your Personal Net Worth</FormHeader>
          <NetWorthSection />
        </FormStep>

        <FormStep currentStep={currentStep} stepNumber={9}>
          <FormHeader>Enter Your Contact Information</FormHeader>
          <ContactSection onchange={setIsInValid} formNumber={currentStep} />
        </FormStep>

        {/* ======================================== BUTTONS =============================================== */}
        <div className="flex justify-between w-full mt-10">
          <FormButton
            displayCondition={currentStep !== 1 && currentStep <= 9}
            buttonText="Previous"
            onClickHandler={() => {
              setCurrentStep((prevStep) => {
                return Math.max(1, prevStep - 1);
              });
            }}
          />
          <FormButton
            displayCondition={currentStep < 9}
            buttonText="Next"
            onClickHandler={onNextClick}
            disabled={isInvalid}
          />
          <FormButton
            displayCondition={currentStep === 9}
            buttonText="Submit Form"
            onClickHandler={setTrigger}
            disabled={isInvalid}
          />
        </div>

        {/* This button will be hidden and will be triggered using another buttons onclick . */}
        <button type="submit" className="btn json-form-submit mt-4 p-4 border hidden" id="submitButton">
          Submit Form
        </button>
      </form>
    </div>
  );
};

export default FormBody;
