import React, { useEffect, useState } from 'react';
import { FormRadioInput } from '../../components/FormRadioInput';
import { workHistoryOrNot } from '../../config/formConfig';
import { IPropsType } from '../../config/models';
import { WorkHistoryAdditionalQuestions } from './WorkHistoryAdditionalQuestions';
import { generateAdditionalStateWork } from '@/app/constants/hubspotConfig';

export const WorkHistorySection: React.FC<IPropsType> = ({ onchange, formNumber, formData, isInValid }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [lastVisibleIndex, setLastVisibleIndex] = useState<number>(0);
  const additionalStateWork = generateAdditionalStateWork();
  const { work1, work2, work3, work4, work5, work6 } = additionalStateWork;

  const addWork = () => {
    setCurrentStep((prevStep) => { return Math.min(prevStep + 1, 6); });
  };

  const closeWork = () => {
    setCurrentStep((prevStep) => { return Math.max(1, prevStep - 1); });
  };

  useEffect(() => {
    if (formNumber !== 4 || !isInValid) return;
    isInValid(formData?.have_you_done_any_paid_work_during_the_last_10_years_ === '');
  }, [formData, formNumber]);

  useEffect(() => {
    setLastVisibleIndex(Math.min(currentStep, 6) - 1);
  }, [currentStep]);

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
          {[work1, work2, work3, work4, work5, work6].map((education, index) => {
            const isLastVisible = index === lastVisibleIndex;
            const isFirstVisible = index === 0 && currentStep === 1;
            return (
              <div key={`${index + 1}`} className={`${currentStep >= index + 1 ? 'block' : 'hidden'}`}>
                <WorkHistoryAdditionalQuestions
                  close={isLastVisible && !isFirstVisible ? closeWork : undefined}
                  formData={formData}
                  state={education}
                  onchange={onchange}
                />
              </div>
            );
          })}
          {currentStep < 6 && (
            <button className="add-another-field-button" type="button" onClick={addWork}>
              + Add another field
            </button>
          )}
        </div>
      )}
    </div>
  );
};
