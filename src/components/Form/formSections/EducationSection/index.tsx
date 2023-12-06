import React, { useEffect, useState } from 'react';
import { highSchool, training } from '../../config/formConfig';
import { FormRadioInput } from '../../components/FormRadioInput';
import { AdditionalQuestions } from './AdditionalQuestions';
import { IPropsType } from '../../config/models';
import { generateAdditionalStateEducation } from '@/app/constants/hubspotConfig';

export const EducationSection: React.FC<IPropsType> = ({ onchange, formNumber, formData, isInValid }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [lastVisibleIndex, setLastVisibleIndex] = useState<number>(0);
  const additionalStateEducation = generateAdditionalStateEducation();
  const { edu1, edu2, edu3, edu4, edu5, edu6 } = additionalStateEducation;

  const addEducation = () => {
    setCurrentStep((prevStep) => { return Math.min(prevStep + 1, 6); });
  };

  const closeEducation = () => {
    setCurrentStep((prevStep) => { return Math.max(1, prevStep - 1); });
  };

  useEffect(() => {
    if (formNumber !== 3 || !isInValid) return;
    isInValid(formData.have_you_completed_high_school__12th_grade__ === '');
  }, [formData, formNumber]);

  useEffect(() => {
    setLastVisibleIndex(Math.min(currentStep, 6) - 1);
  }, [currentStep]);

  return (
    <div>
      <FormRadioInput
        fields={highSchool}
        value={formData.have_you_completed_high_school__12th_grade__}
        onChange={(e) => {
          onchange('have_you_completed_high_school__12th_grade__', e.target.value);
        }}
        required
      />
      {formData.have_you_completed_high_school__12th_grade__ === 'Yes' &&
        <FormRadioInput
          fields={training}
          value={formData.have_you_received_any_education_or_training_other_than_high_school_}
          onChange={(e) => {
            onchange('have_you_received_any_education_or_training_other_than_high_school_', e.target.value);
          }}
        />
      }
      {formData.have_you_received_any_education_or_training_other_than_high_school_ === 'Yes' &&
        <div className='flex flex-col overflow-auto max-h-[50rem]'>
          <p>Please list all of your education and/or training other than high school (secondary school),
            starting with the most recent:</p>
          {[edu1, edu2, edu3, edu4, edu5, edu6].map((education, index) => {
            const isLastVisible = index === lastVisibleIndex;
            const isFirstVisible = index === 0 && currentStep === 1;
            return (
              <div key={`${index + 1}`} className={`${currentStep >= index + 1 ? 'block' : 'hidden'}`}>
                <AdditionalQuestions
                  close={isLastVisible && !isFirstVisible ? closeEducation : undefined}
                  formData={formData}
                  state={education}
                  onchange={onchange}
                />
              </div>
            );
          })}
          {currentStep < 6 && <button className="add-another-field-button" type="button" onClick={addEducation}>
            + Add another field
          </button>}
        </div>}
    </div>
  );
};
