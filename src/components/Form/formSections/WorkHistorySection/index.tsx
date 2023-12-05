import React, { useEffect, useState } from 'react';
import { FormRadioInput } from '../../components/FormRadioInput';
import { workHistoryOrNot } from '../../config/formConfig';
import { IPropsType } from '../../config/models';
import { WorkHistoryAdditionalQuestions } from './WorkHistoryAdditionalQuestions';

export const WorkHistorySection: React.FC<IPropsType> = ({ onchange, formNumber, formData, isInValid }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const addEducation = () => {
    setCurrentStep((prevStep) => { return Math.min(prevStep + 1, 10); });
  };

  const closeEducation = () => {
    setCurrentStep((prevStep) => { return Math.max(1, prevStep - 1); });
  };

  useEffect(() => {
    if (formNumber !== 4) return;
    if (isInValid) {
      isInValid(formData?.have_you_done_any_paid_work_during_the_last_10_years_ === '');
    }
  }, [formData, formNumber]);

  const additionalQuestionsArray = Array.from({ length: 10 }, (_, index) => {
    return (
      <div key={index} className={`${currentStep >= index + 1 ? 'block' : 'hidden'}`}>
        <WorkHistoryAdditionalQuestions close={closeEducation} />
      </div>
    );
  });

  return (
    <div>
      <FormRadioInput
        fields={workHistoryOrNot}
        onChange={(e) => {
          onchange('have_you_done_any_paid_work_during_the_last_10_years_', e.target.value);
        }}
        value={formData?.have_you_done_any_paid_work_during_the_last_10_years_}
        required
      />
      {formData?.have_you_done_any_paid_work_during_the_last_10_years_ === 'Yes' && (
        <div className="flex flex-col overflow-auto max-h-[50rem]">
          <p>
            Starting with your current (or most recent) job, please list all the paid work you have done during the last
            10 years:
          </p>
          {additionalQuestionsArray}
          {currentStep < 10 && (
            <button className="add-another-field-button" type="button" onClick={addEducation}>
              + Add another field
            </button>
          )}
        </div>
      )}
    </div>
  );
};
