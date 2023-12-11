'use client';

import 'tailwindcss/tailwind.css';
import { FormEvent, useMemo, useState } from 'react';
import { FormStep } from './components/FormStep';
import { FormHeader } from './components/FormHeader';
import { PersonalSection } from './formSections/PersonalSection';
import { FormButton } from './components/FormButton';
import { useHeaderFooterContext } from '@/providers/headerFooterDataProvider';
import { initialStates } from './config/intialState';
import { postPRSubmission } from '@/app/services/apiService/prFormSubmission';
import { AdditionalInformationSection } from './formSections/AdditionalInformationSection';
import { ContactSection } from './formSections/ContactSection';
import { convertFormDataToArray } from '@/utils';

type ValueType = 'country' | 'occupation';
type keyType = 'name' | 'currency'

const FormBody = ({ formId, meetingLink }: { formId: string, meetingLink: Record<string, string> }) => {
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
      const generalFormData = convertFormDataToArray(formData);
      console.log('Form Data before Submission:', generalFormData);

      const payload = {
        fields: [...generalFormData],
        context: {
          pageUri: 'https://rootonweb-dev.qburst.build/parents-and-grandparents-sponsorship',
          pageName: 'Services',
        },
      };
      const response = await postPRSubmission(payload, formId);
      if (response.status === 200) {
        setFormData(initialStates);
        setIsInValid(false);
        console.log('Form submission successful with data:', generalFormData);
      }
      else console.log('Form Submission Unsuccessful');
    }
  };

  const formSteps = useMemo(() => {
    return [
      {
        stepNumber: 1,
        header: 'Personal Profile',
        component: <PersonalSection
          onchange={handleData}
          formData={formData}
          setFormData={setFormData}
          isInValid={setIsInValid}
          formNumber={currentStep} />,
      },
      {
        stepNumber: 2,
        header: 'Enter Your Contact Information',
        component: <ContactSection
          onchange={handleData}
          formData={formData}
          countries={getData('country', 'name')}
          formNumber={currentStep}
          isInValid={setIsInValid} />,
      },
      {
        stepNumber: 3,
        header: 'Your Education and Training',
        component: <AdditionalInformationSection
          onchange={handleData}
          formNumber={currentStep}
          formData={formData} />,
      },
      {
        stepNumber: 4,
        header: '',
        component: <div id='scheduler-container' className="bg-hubspot-meeting-background h-[54rem] mt-2">
          <iframe className=" w-full h-full" title="AA" src={meetingLink.free} />
        </div>,
      },
    ];
  }, [formData, handleData, getData]);

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
        {formSteps.map(({ stepNumber, header, component }) => {
          return (
            <FormStep key={stepNumber} stepNumber={stepNumber} currentStep={currentStep}>
              <FormHeader>{header}</FormHeader>
              {component}
            </FormStep>
          );
        })}

        {/* ======================================== BUTTONS =============================================== */}
        <div className="flex justify-between w-full mt-10">
          {currentStep > 1 && <FormButton
            type='button'
            buttonText="Previous"
            onClickHandler={() => {
              setIsInValid(false);
              setCurrentStep((prevStep) => {
                return Math.max(1, prevStep - 1);
              });
            }}
          />}
          {currentStep <= 3 && <FormButton
            type={currentStep === 3 ? 'submit' : 'button'}
            buttonText={currentStep === 3 ? 'Submit' : 'Next'}
            onClickHandler={currentStep === 3 ? undefined : onNextClick}
            disable={isInvalid}
          />}
        </div>
      </form>
    </div>
  );
};

export default FormBody;
