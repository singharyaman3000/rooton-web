'use client';

import 'tailwindcss/tailwind.css';
import { FormEvent, useMemo, useState } from 'react';
import { FormStep } from '@/components/Forms/components/FormStep';
import { FormHeader } from '@/components/Forms/components/FormHeader';
import { PersonalSection } from './formSections/PersonalSection';
import { FormButton } from '@/components/Forms/components/FormButton';
import { useHeaderFooterContext } from '@/providers/headerFooterDataProvider';
import { initialStates } from './config/intialState';
import { postPRSubmission } from '@/app/services/apiService/prFormSubmission';
import { AdditionalInformationSection } from './formSections/AdditionalInformationSection';
import { ContactSection } from './formSections/ContactSection';
import { convertFormDataToArray, createMeetingUrl } from '@/utils';
import { usePathname } from 'next/navigation';

type ValueType = 'country' | 'occupation';
type keyType = 'name' | 'currency';

const FormBody = ({
  formId,
  meetingLink,
  scrollToTop,
}: {
  formId: string;
  meetingLink: Record<string, string>;
  scrollToTop: () => void;
}) => {
  const path = usePathname();
  const [formData, setFormData] = useState(initialStates);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isInvalid, setIsInValid] = useState<boolean>(true);
  const { headerFooterData } = useHeaderFooterContext();

  const onNextClick = () => {
    if (isInvalid) return;
    setCurrentStep((prevStep) => {
      return prevStep + 1;
    });
    scrollToTop();
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
      console.log('generalFormData', generalFormData);
      const payload = {
        fields: [...generalFormData],
        context: {
          pageUri: process.env.NEXT_APP_BASE_URL + path.slice(1),
          pageName: 'Services',
        },
      };
      const response = await postPRSubmission(payload, formId);
      if (response.status === 200) {
        setCurrentStep((prevStep) => {
          return prevStep + 1;
        });
      }
    }
  };

  const formSteps = useMemo(() => {
    return [
      {
        stepNumber: 1,
        header: 'Personal Profile',
        component: (
          <PersonalSection
            onchange={handleData}
            formData={formData}
            setFormData={setFormData}
            isInValid={setIsInValid}
            formNumber={currentStep}
          />
        ),
      },
      {
        stepNumber: 2,
        header: 'Enter Your Contact Information',
        component: (
          <ContactSection
            onchange={handleData}
            formData={formData}
            countries={getData('country', 'name')}
            formNumber={currentStep}
            isInValid={setIsInValid}
          />
        ),
      },
      {
        stepNumber: 3,
        header: 'Your Education and Training',
        component: <AdditionalInformationSection onchange={handleData} formNumber={currentStep} formData={formData} />,
      },
      {
        stepNumber: 4,
        header: '',
        component: (
          <div id="scheduler-container" className="bg-hubspot-meeting-background h-[54rem] mt-2">
            <iframe
              className=" w-full h-full "
              title="AA"
              src={createMeetingUrl(
                formData.firstname,
                formData.lastname,
                formData.email,
                formData.consultation_type === 'Consultation with RCIC (Paid)' ? meetingLink.paid : meetingLink.free,
              )}
            />
          </div>
        ),
      },
    ];
  }, [formData, handleData, getData]);

  return (
    <div className="mt-2 h-full w-full">
      <form
        id="testFormPOC-optimized-test-run"
        className="huform"
        onSubmit={handleSubmit}
        onInvalid={(e) => {
          e.preventDefault();
        }}
      >
        <div className="hs-richtext hs-main-font-element">
          <h2>Spousal Sponsorship:</h2>
        </div>
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
          {currentStep <= 3 && (
            <FormButton
              type="button"
              buttonText="Back"
              disable={currentStep === 1}
              onClickHandler={() => {
                setIsInValid(false);
                setCurrentStep((prevStep) => {
                  return Math.max(1, prevStep - 1);
                });
                scrollToTop();
              }}
            />
          )}
          {currentStep < 3 && (
            <FormButton type="button" buttonText="Next" onClickHandler={onNextClick} disable={isInvalid} />
          )}
          {currentStep === 3 && <FormButton type="submit" buttonText="Submit" disable={isInvalid} />}
        </div>
      </form>
    </div>
  );
};

export default FormBody;
