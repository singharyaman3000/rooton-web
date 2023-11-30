'use client';

import 'tailwindcss/tailwind.css';
import { useEffect, useState } from 'react';
import { FormRadioInput } from '../../components/FormRadioInput';
import { workHistoryOrNot } from '../../config/formConfig';
import { IPropsType } from '../../config/models';
import { WorkHistoryAdditionalQuestions } from './WorkHistoryAdditionalQuestions';

const intialFormStates = {
  workHistoryOrNot: '',
};

export const WorkHistorySection = (props: IPropsType) => {
  const { onchange, formNumber } = props;
  const [formValues, setFormValues] = useState(intialFormStates);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const addEducation = () => {
    setCurrentStep((prevStep) => {
      return prevStep + 1;
    });
  };

  const closeEducation = () => {
    setCurrentStep((prevStep) => {
      return Math.max(1, prevStep - 1);
    });
  };

  const handleFieldChange = (fieldName: string, value: unknown) => {
    setFormValues((prevFormValues) => {
      return {
        ...prevFormValues,
        [fieldName]: value,
      };
    });
  };

  useEffect(() => {
    if (formNumber !== 4) return;
    if (onchange) {
      onchange(formValues.workHistoryOrNot === '');
    }
  }, [formValues, formNumber]);

  return (
    <div>
      <FormRadioInput
        fields={workHistoryOrNot}
        onChange={(e) => {
          handleFieldChange('workHistoryOrNot', e.target.value);
        }}
        value={formValues.workHistoryOrNot}
        required
      />
      <div className={`${formValues.workHistoryOrNot === 'Yes' ? 'flex flex-col' : 'hidden'} overflow-auto max-h-[50rem]`}>
        <p>
          Starting with your current (or most recent) job, please list all the paid work you have done during the last
          10 years:
        </p>
        {/* <AdditionalQuestions /> */}
        <div className={`${currentStep >= 1 ? 'block' : 'hidden'}`}>
          <WorkHistoryAdditionalQuestions close={closeEducation} />
        </div>
        <div className={`${currentStep >= 2 ? 'block' : 'hidden'}`}>
          <WorkHistoryAdditionalQuestions close={closeEducation} />
        </div>
        <div className={`${currentStep >= 3 ? 'block' : 'hidden'}`}>
          <WorkHistoryAdditionalQuestions close={closeEducation} />
        </div>
        <div className={`${currentStep >= 4 ? 'block' : 'hidden'}`}>
          <WorkHistoryAdditionalQuestions close={closeEducation} />
        </div>
        <div className={`${currentStep >= 5 ? 'block' : 'hidden'}`}>
          <WorkHistoryAdditionalQuestions close={closeEducation} />
        </div>
        <div className={`${currentStep >= 6 ? 'block' : 'hidden'}`}>
          <WorkHistoryAdditionalQuestions close={closeEducation} />
        </div>
        <div className={`${currentStep >= 7 ? 'block' : 'hidden'}`}>
          <WorkHistoryAdditionalQuestions close={closeEducation} />
        </div>
        <div className={`${currentStep >= 8 ? 'block' : 'hidden'}`}>
          <WorkHistoryAdditionalQuestions close={closeEducation} />
        </div>
        <div className={`${currentStep >= 9 ? 'block' : 'hidden'}`}>
          <WorkHistoryAdditionalQuestions close={closeEducation} />
        </div>
        <div className={`${currentStep >= 10 ? 'block' : 'hidden'}`}>
          <WorkHistoryAdditionalQuestions close={closeEducation} />
        </div>

        <button
          className=" bg-[#3097D1] text-[white] flex self-end mb-2 mt-4 px-4 py-2 border-[#2a88bd]"
          type="button"
          onClick={addEducation}
        >
          + Add another field
        </button>
      </div>
    </div>
  );
};
