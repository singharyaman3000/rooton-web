import { FormEvent, useMemo, useState } from 'react';
import { PersonalSection } from './formSections/PersonalSection';
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
import { usePathname } from 'next/navigation';
import { FormButton } from '../components/FormButton';
import { FormHeader } from '../components/FormHeader';
import { FormStep } from '../components/FormStep';
import { addIndexToKeys, convertFormDataToArray } from '@/utils';

type ValueType = 'country' | 'occupation';
type keyType = 'name' | 'currency'

const FormBody = ({ formId, meetingLink, scrollToTop }: { formId: string, meetingLink: Record<string, string> , scrollToTop: () => void }) => {
  const path = usePathname();
  const [formData, setFormData] = useState(initialStates);
  const [additionalEducation, setAdditionalEducation] = useState<Record<string, string>[]>([]);
  const [additionalWork, setAdditionalWork] = useState<Record<string, string>[]>([]);
  const [additionalFamily, setAdditionalFamily] = useState<Record<string, string>[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [addedEducations, setAddedEducations] = useState<number>(1);
  const [addedFamily, setAddedFamily] = useState<number>(1);
  const [addedWorks, setAddedWorks] = useState<number>(1);
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
      const educationDetails = convertFormDataToArray(addIndexToKeys(additionalEducation));
      const workDetails = convertFormDataToArray(addIndexToKeys(additionalWork));
      const familyDetails = convertFormDataToArray(addIndexToKeys(additionalFamily));
      const generalFormData = convertFormDataToArray(formData);
      const payload = {
        fields: [...generalFormData, ...educationDetails, ...workDetails, ...familyDetails],
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
        component: <PersonalSection
          onchange={handleData}
          formData={formData}
          countries={getData('country', 'name')}
          isInValid={setIsInValid}
          formNumber={currentStep} />,
      },
      {
        stepNumber: 2,
        header: 'Your Language Skills',
        component: <LanguageSection
          onchange={handleData}
          formNumber={currentStep}
          formData={formData} />,
      },
      {
        stepNumber: 3,
        header: 'Your Education and Training',
        component: <EducationSection
          onchange={handleData}
          formNumber={currentStep}
          filledFields={addedEducations}
          setFilledFields={setAddedEducations}
          additionalQuestionsData={additionalEducation}
          setAdditionalQuestionsData={setAdditionalEducation}
          formData={formData}
          isInValid={setIsInValid} />,
      },
      {
        stepNumber: 4,
        header: 'Your Work History',
        component: <WorkHistorySection
          onchange={handleData}
          formData={formData}
          filledFields={addedWorks}
          setFilledFields={setAddedWorks}
          formNumber={currentStep}
          additionalQuestionsData={additionalWork}
          setAdditionalQuestionsData={setAdditionalWork}
          occupations={getData('occupation')}
          isInValid={setIsInValid} />,
      },
      {
        stepNumber: 5,
        header: 'Express Entry Profile',
        component: <ExpressEntrySection
          onchange={handleData}
          formData={formData}
          formNumber={currentStep} />,
      },

      {
        stepNumber: 6,
        header: 'Canadian Job Offer',
        component: <JobOfferSection
          occupations={getData('occupation')}
          onchange={handleData}
          formData={formData}
          formNumber={currentStep}
          isInValid={setIsInValid} />,
      },
      {
        stepNumber: 7,
        header: 'Family or Friends in Canada',
        component: <FamilyOrFriendsSection
          onchange={handleData}
          formData={formData}
          filledFields={addedFamily}
          setFilledFields={setAddedFamily}
          formNumber={currentStep}
          additionalQuestionsData={additionalFamily}
          setAdditionalQuestionsData={setAdditionalFamily} />,
      },
      {
        stepNumber: 8,
        header: 'Your Personal Net Worth',
        component: <NetWorthSection
          onchange={handleData}
          formData={formData}
          formNumber={currentStep}
          currencies={getData('country', 'currency')} />,
      },
      {
        stepNumber: 9,
        header: 'Enter Your Contact Information',
        component: <ContactSection
          onchange={handleData}
          formData={formData}
          formNumber={currentStep}
          isInValid={setIsInValid} />,
      },
      {
        stepNumber: 10,
        header: '',
        component: <div id='scheduler-container' className="bg-hubspot-meeting-background h-[54rem] mt-2">
          <iframe className=" w-full h-full"
            title="AA"
            src={formData.consultation_type === 'Consultation with RCIC (Paid)' ? meetingLink.paid : meetingLink.free} />
        </div>,
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
          <h2>Provincial Nominee Program (PNP) Service:</h2>
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
          {currentStep <= 9 && <FormButton
            type='button'
            buttonText="Back"
            disable={currentStep === 1}
            onClickHandler={() => {
              setIsInValid(false);
              setCurrentStep((prevStep) => {
                return Math.max(1, prevStep - 1);
              });
              scrollToTop();
            }}
          />}
          {currentStep <= 9 && <FormButton
            type={currentStep === 9 ? 'submit' : 'button'}
            buttonText={currentStep === 9 ? 'Submit' : 'Next'}
            onClickHandler={currentStep === 9 ? undefined : onNextClick}
            disable={isInvalid}
          />}
        </div>
      </form>
    </div>
  );
};

export default FormBody;
