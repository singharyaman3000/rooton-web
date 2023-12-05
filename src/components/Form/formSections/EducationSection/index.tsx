import React, { useEffect, useState } from 'react';
import { highSchool, training } from '../../config/formConfig';
import { FormRadioInput } from '../../components/FormRadioInput';
import { AdditionalQuestions } from './AdditionalQuestions';
import { IPropsType } from '../../config/models';

export const EducationSection: React.FC<IPropsType> = ({ onchange, formNumber, formData, isInValid }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const addEducation = () => {
    setCurrentStep((prevStep) => { return Math.min(prevStep + 1, 10); });
  };

  const closeEducation = () => {
    setCurrentStep((prevStep) => { return Math.max(1, prevStep - 1); });
  };

  useEffect(() => {
    if (formNumber !== 3) return;
    if (isInValid) {
      isInValid(formData.have_you_completed_high_school__12th_grade__ === '');
    }
  }, [formData, formNumber]);

  const additionalQuestionsArray = Array.from({ length: 10 }, (_, index) => {
    return (
      <div key={index} className={`${currentStep >= index + 1 ? 'block' : 'hidden'}`}>
        <AdditionalQuestions close={closeEducation} />
      </div>
    );
  });

  return (
    <div>
      <FormRadioInput
        fields={highSchool}
        onChange={(e) => {
          onchange('have_you_completed_high_school__12th_grade__', e.target.value);
        }}
        value={formData.have_you_completed_high_school__12th_grade__}
        required
      />
      {formData.have_you_completed_high_school__12th_grade__ === 'Yes' &&
        <div>
          <FormRadioInput
            fields={training}
            onChange={(e) => {
              onchange('have_you_received_any_education_or_training_other_than_high_school_', e.target.value);
            }}
            value={formData.have_you_received_any_education_or_training_other_than_high_school_}
          />
        </div>}
      {formData.have_you_received_any_education_or_training_other_than_high_school_ === 'Yes' &&
        <div className='flex flex-col overflow-auto max-h-[50rem]'>
          <p>Please list all of your education and/or training other than high school (secondary school),
            starting with the most recent:</p>
          {additionalQuestionsArray}
          {currentStep < 10 && <button className="add-another-field-button" type="button" onClick={addEducation}>
            + Add another field
          </button>}
        </div>}
    </div>
  );
};
