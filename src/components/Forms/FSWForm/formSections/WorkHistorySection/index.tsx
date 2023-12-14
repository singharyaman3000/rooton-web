import React, { useEffect, useRef, useState } from 'react';
import { workHistoryOrNot } from '../../config/formConfig';
import { FormRadioInput } from '@/components/Forms/components/FormRadioInput';
import { IPropsAdditionalType } from '../../config/models';
import { AdditionalQuestions } from './AdditionalQuestions';
import useScrollToBottom from '@/hooks/useScrollToBottom';
import { valueNotPresent, generateAllStateObjects } from '@/utils';

const additionalQuestionsKeys = [
  'occupation_',
  'type_of_job_',
  'when_was_work_',
  'length_of_work_',
  'location_of_work_',
  'work_hours_for_work_',
  'province_or_territory_of_work_',
  'what_type_of_work_permit_do_you_currently_hold_for_work_',
];

export const WorkHistorySection: React.FC<IPropsAdditionalType> = ({ onchange,
  formNumber,
  formData,
  isInValid,
  filledFields,
  setFilledFields,
  occupations,
  setAdditionalQuestionsData,
  additionalQuestionsData }) => {
  const [currentStep, setCurrentStep] = useState<number>(filledFields);
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollToBottom(containerRef, [filledFields]);
  const helperMessage = formData?.have_you_done_any_paid_work_during_the_last_10_years_ === 'Yes' && !additionalQuestionsData.length;

  const handleOnChange = (key: string, value: string, index: number, state: Record<string, string>[]) => {
    const dataToUpdate = [...state];
    dataToUpdate[index][key] = value;
    setAdditionalQuestionsData(dataToUpdate);
  };

  const addWork = () => {
    setCurrentStep((prevStep) => {
      return prevStep + 1;
    });
  };

  const closeWork = (indexToRemove: number) => {
    const filteredData = additionalQuestionsData?.filter((_, index) => {
      return index !== indexToRemove;
    });
    setAdditionalQuestionsData(filteredData);
    setCurrentStep((prevStep) => {
      return Math.max(0, prevStep - 1);
    });
  };

  useEffect(() => {
    if (formData.have_you_done_any_paid_work_during_the_last_10_years_ === '') return;
    const allStateObjects = generateAllStateObjects(currentStep, additionalQuestionsKeys, additionalQuestionsData);
    const noData = formData.have_you_done_any_paid_work_during_the_last_10_years_ === 'No' ? [] : allStateObjects;
    setAdditionalQuestionsData(noData);
    setFilledFields(currentStep);
  }, [currentStep, formData]);

  useEffect(() => {
    if (formNumber !== 4 || !isInValid) return;
    console.log(valueNotPresent(additionalQuestionsData, ['when_was_work_', 'length_of_work_']));
    isInValid(
      formData?.have_you_done_any_paid_work_during_the_last_10_years_ === '' ||
      !valueNotPresent(additionalQuestionsData, ['when_was_work_', 'length_of_work_']));
  }, [formData, formNumber, additionalQuestionsData]);

  return (
    <div className="flex flex-col gap-y-4">
      <FormRadioInput
        fields={workHistoryOrNot}
        value={formData?.have_you_done_any_paid_work_during_the_last_10_years_}
        onChange={(e) => {
          onchange('have_you_done_any_paid_work_during_the_last_10_years_', e.target.value);
        }}
        required
      />
      {formData?.have_you_done_any_paid_work_during_the_last_10_years_ === 'Yes' && (
        <>
          <p>
            Starting with your current (or most recent) job, please list all the paid work you have done during the last
            10 years:
          </p>
          {helperMessage &&
            <span className='text-[red] font-bold self-center'>Please add at least one Work History information</span>}
          <div ref={containerRef} className="flex flex-col overflow-auto max-h-[50rem]">
            {additionalQuestionsData?.map((_, index) => {
              return (
                <div key={`${index + 1}`} className='m-0'>
                  <AdditionalQuestions
                    id={index}
                    data={occupations}
                    close={closeWork}
                    state={additionalQuestionsData}
                    onchange={handleOnChange}
                  />
                </div>
              );
            })}
          </div>
          {currentStep < 6 && (
            <button className="add-another-field-button" type="button" onClick={addWork}>
              + Add another field
            </button>
          )}
        </>
      )}
    </div>
  );
};
