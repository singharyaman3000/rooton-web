'use client';

import 'tailwindcss/tailwind.css';
import { FormEvent, useState } from 'react';
import { FormStep } from './components/FormStep';
import { FormHeader } from './components/FormHeader';
import { servicesForm } from '@/app/constants/hubspotConfig';
import { PersonalSection } from './formSections/PersonalSection';
import { FormButton } from './components/FormButton';
import { useHeaderFooterContext } from '@/providers/headerFooterDataProvider';
import { LanguageSection } from './formSections/LanguageSection';
import { initialStates } from './config/intialState';
import { postPRSubmission } from '@/app/services/apiService/prFormSubmission';
import { EducationSection } from './formSections/EducationSection';
import { WorkHistorySection } from './formSections/WorkHistorySection';
import { ContactSection } from './formSections/ContactSection';
import { ExpressEntrySection } from './formSections/ExpressEntrySection';
import { FamilyOrFriendsSection } from './formSections/FamilyFriendsSection';
import { JobOfferSection } from './formSections/JobOfferSection';
import { NetWorthSection } from './formSections/NetWorthSection';

type ValueType = 'country' | 'occupation';
type keyType = 'name' | 'currency'

const FormBody = () => {
  const [formData, setFormData] = useState(initialStates);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isInvalid, setIsInValid] = useState<boolean>(true);
  const { headerFooterData } = useHeaderFooterContext();

  const onNextClick = () => {
    if (isInvalid) return;
    setCurrentStep((prevStep) => {
      return prevStep + 1;
    });
  };

  const getData = (valueType: ValueType, keyValue?: keyType) => {
    if (!headerFooterData) return [];
    const leadFormDatas = headerFooterData[0]?.attributes?.json_content?.leadFormDatas;

    if (!leadFormDatas) return [];

    const key = valueType === 'occupation' ? 'occupation' : keyValue || 'name';
    const data = leadFormDatas[key === 'occupation' ? 'occupationList' : 'countryInfos'];

    return (
      data?.map((item) => {
        const id = item?.[key]?.toLowerCase()?.replace(/[^a-z]/g, '');
        const value = item?.[key]?.split(' (')[0];
        return { id, value };
      }) || []
    );
  };

  const handleData = (key: string, value: string) => {
    setFormData((prevFormValues) => {
      return {
        ...prevFormValues,
        [key]: value,
      };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isInvalid) {
      const formArray = Object.entries(formData).map(([name, value]) => {
        return {
          name,
          value,
        };
      });
      const payload = {
        fields: formArray,
        context: {
          pageUri: 'https://rootonweb-dev.qburst.build/express-entry-fsw',
          pageName: 'Services',
        },
      };

      const response = await postPRSubmission(payload, servicesForm.form1);
      console.log(response);
    }
  };

  return (
    <div className="mt-2 h-full w-full">
      <form
        id="testFormPOC-optimized-test-run"
        className='huform'
        onSubmit={handleSubmit}
        onInvalid={(e) => {
          e.preventDefault();
        }}
      >
        <FormStep stepNumber={currentStep} currentStep={1}>
          <FormHeader>Personal Profile</FormHeader>
          <PersonalSection
            onchange={handleData}
            formData={formData}
            countries={getData('country', 'name')}
            isInValid={setIsInValid}
            formNumber={1} />
        </FormStep>

        <FormStep currentStep={currentStep} stepNumber={2}>
          <FormHeader>Your Language Skills</FormHeader>
          <LanguageSection
            onchange={handleData}
            formNumber={2}
            formData={formData} />
        </FormStep>

        <FormStep currentStep={currentStep} stepNumber={3}>
          <FormHeader>Your Education and Training</FormHeader>
          <EducationSection
            onchange={handleData}
            formNumber={currentStep}
            formData={formData}
            isInValid={setIsInValid} />
        </FormStep>

        <FormStep currentStep={currentStep} stepNumber={4}>
          <FormHeader>Your Work History</FormHeader>
          <WorkHistorySection
            onchange={handleData}
            formData={formData}
            formNumber={currentStep}
            occupations={getData('occupation')}
            isInValid={setIsInValid} />
        </FormStep>
        <FormStep currentStep={currentStep} stepNumber={5}>
          <FormHeader>Express Entry Profile</FormHeader>
          <ExpressEntrySection
            onchange={handleData}
            formData={formData}
            formNumber={currentStep} />
        </FormStep>

        <FormStep currentStep={currentStep} stepNumber={6}>
          <FormHeader>Canadian Job Offer</FormHeader>
          <JobOfferSection
            occupations={getData('occupation')}
            onchange={handleData}
            formData={formData}
            formNumber={currentStep}
            isInValid={setIsInValid} />
        </FormStep>

        <FormStep currentStep={currentStep} stepNumber={7}>
          <FormHeader>Family or Friends in Canada</FormHeader>
          <FamilyOrFriendsSection
            onchange={handleData}
            formData={formData}
            formNumber={currentStep} />
        </FormStep>

        <FormStep currentStep={currentStep} stepNumber={8}>
          <FormHeader>Your Personal Net Worth</FormHeader>
          <NetWorthSection
            onchange={handleData}
            formData={formData}
            formNumber={currentStep}
            currencies={getData('country', 'currency')} />
        </FormStep>

        <FormStep currentStep={currentStep} stepNumber={9}>
          <FormHeader>Enter Your Contact Information</FormHeader>
          <ContactSection
            onchange={handleData}
            formData={formData}
            formNumber={currentStep}
            isInValid={setIsInValid} />
        </FormStep>

        {/* ======================================== BUTTONS =============================================== */}
        <div className="flex justify-between w-full mt-10">
          {currentStep !== 1 && currentStep <= 9 && <FormButton
            type='button'
            buttonText="Previous"
            onClickHandler={() => {
              setIsInValid(false);
              setCurrentStep((prevStep) => {
                return Math.max(1, prevStep - 1);
              });
            }}
          />}
          {currentStep < 9 && currentStep !== 9 && <FormButton
            type='button'
            buttonText="Next"
            onClickHandler={onNextClick}
            disable={isInvalid}
          />}
          {currentStep === 9 && <FormButton
            type='submit'
            buttonText="Submit"
            disable={isInvalid}
          />}
        </div>
      </form>
    </div>
  );
};

export default FormBody;
