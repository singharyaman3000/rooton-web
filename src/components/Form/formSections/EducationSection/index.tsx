'use client';

import { useEffect, useState } from 'react';
import { highSchool, training } from '../../config/formConfig';
import { FormRadioInput } from '../../components/FormRadioInput';
import { AdditionalQuestions } from './AdditionalQuestions';
import { IPropsType } from '../../config/models';

const intialFormStates = {
  highSchool: '',
  training: '',
};

export const EducationSection = (props: IPropsType) => {
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
    if (formNumber !== 3) return;
    if (onchange) {
      onchange(formValues.highSchool === '');
    }
  }, [formValues, formNumber]);

  return (
    <div>
      <FormRadioInput
        fields={highSchool}
        onChange={(e) => {
          handleFieldChange('highSchool', e.target.value);
        }}
        value={formValues.highSchool}
        required
      />
      <div style={{ display: formValues.highSchool === 'Yes' ? 'block' : 'none' }}>
        <FormRadioInput
          fields={training}
          onChange={(e) => {
            handleFieldChange('training', e.target.value);
          }}
        />
      </div>
      <div className={`${formValues.training === 'Yes' ? 'flex flex-col' : 'hidden'} overflow-auto max-h-[50rem]`}>
        <p>
          Please list all of your education and/or training other than high school (secondary school), starting with the
          most recent:
        </p>
        <div className={`${currentStep >= 1 ? 'block' : 'hidden'}`}>
          <AdditionalQuestions close={closeEducation} />
        </div>
        <div className={`${currentStep >= 2 ? 'block' : 'hidden'}`}>
          <AdditionalQuestions close={closeEducation} />
        </div>
        <div className={`${currentStep >= 3 ? 'block' : 'hidden'}`}>
          <AdditionalQuestions close={closeEducation} />
        </div>
        <div className={`${currentStep >= 4 ? 'block' : 'hidden'}`}>
          <AdditionalQuestions close={closeEducation} />
        </div>
        <div className={`${currentStep >= 5 ? 'block' : 'hidden'}`}>
          <AdditionalQuestions close={closeEducation} />
        </div>
        <div className={`${currentStep >= 6 ? 'block' : 'hidden'}`}>
          <AdditionalQuestions close={closeEducation} />
        </div>
        <div className={`${currentStep >= 7 ? 'block' : 'hidden'}`}>
          <AdditionalQuestions close={closeEducation} />
        </div>
        <div className={`${currentStep >= 8 ? 'block' : 'hidden'}`}>
          <AdditionalQuestions close={closeEducation} />
        </div>
        <div className={`${currentStep >= 9 ? 'block' : 'hidden'}`}>
          <AdditionalQuestions close={closeEducation} />
        </div>
        <div className={`${currentStep >= 10 ? 'block' : 'hidden'}`}>
          <AdditionalQuestions close={closeEducation} />
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
