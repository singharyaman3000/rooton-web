/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useHeaderFooterContext } from '@/providers/headerFooterDataProvider';
import { initialStates } from './config/intialState';
import { postPRSubmission } from '@/app/services/apiService/prFormSubmission';
import { ContactSection } from './formSections/ContactSection';
import { usePathname } from 'next/navigation';
import { FormButton } from '../components/FormButton';
import { FormStep } from '../components/FormStep';
import { convertFormDataToArray, createMeetingUrl } from '@/utils';
import { StudyDetails } from './formSections/StudyDetails';
import { PersonalSection } from './formSections/PersonalSection';
import { ConsentSection } from './formSections/ConsentSection';

type ValueType = 'country' | 'occupation';
type keyType = 'name' | 'currency';

const FormBody = ({
  formId,
  meetingLink,
  scrollToTop,
  onProgress,
}: {
  formId: string;
  meetingLink: Record<string, string>;
  scrollToTop: () => void;
  onProgress?: (progress: number) => void;
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
      const payload = {
        fields: [...generalFormData],
        context: {
          pageUri: process.env.NEXT_APP_BASE_URL + path.slice(1),
          pageName: 'Canada Student Visa Requirements | Root On',
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
        stepNumber: 2,
        component: (
          <StudyDetails
            onchange={handleData}
            formData={formData}
            countries={getData('country', 'name')}
            isInValid={setIsInValid}
            formNumber={currentStep}
          />
        ),
      },
      {
        stepNumber: 3,
        component: (
          <PersonalSection
            onchange={handleData}
            isInValid={setIsInValid}
            formNumber={currentStep}
            formData={formData}
          />
        ),
      },
      {
        stepNumber: 4,
        component: (
          <ConsentSection
            onchange={handleData}
            formData={formData}
            countries={getData('country', 'name')}
            formNumber={currentStep}
            isInValid={setIsInValid}
          />
        ),
      },
      {
        stepNumber: 5,
        header: '',
        component: (
          <div id="scheduler-container" className="bg-hubspot-meeting-background h-[54rem] mt-2">
            <iframe
              className=" w-full h-full"
              title="AA"
              src={createMeetingUrl(
                formData.firstname,
                formData.lastname,
                formData.email,
                formData.preferred_consultation_type_ === 'Consultation with RCIC (Paid)' ? meetingLink.paid : meetingLink.free,
              )}
            />
          </div>
        ),
      },
    ];
  }, [formData, handleData, getData]);

  const calculateProgress = (currentStepValue: number) => {
    const progress = (currentStepValue / formSteps.length) * 100;
    if (onProgress) onProgress(progress);
  };

  useEffect(() => {
    calculateProgress(currentStep);
  }, [currentStep]);

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
          <h2>Study Visa Form:</h2>
        </div>
        {formSteps.map(({ stepNumber, component }) => {
          return (
            <FormStep key={stepNumber} stepNumber={stepNumber} currentStep={currentStep}>
              {component}
            </FormStep>
          );
        })}

        {/* ======================================== BUTTONS =============================================== */}
        <div className="flex justify-between w-full mt-10">
          {currentStep <= formSteps.length - 1 && (
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
          {currentStep <= formSteps.length - 1 && (
            <FormButton
              type={currentStep === formSteps.length - 1 ? 'submit' : 'button'}
              buttonText={currentStep === formSteps.length - 1 ? 'Submit' : 'Next'}
              onClickHandler={currentStep === formSteps.length - 1 ? undefined : ()=>{return onNextClick();}}
              disable={isInvalid}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default FormBody;
