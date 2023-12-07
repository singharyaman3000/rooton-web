import React, { useEffect, useState } from 'react';
import { FormRadioInput } from '../../components/FormRadioInput';
import { workHistoryOrNot } from '../../config/formConfig';
import { IPropsType } from '../../config/models';
import { AdditionalQuestions } from './WorkHistoryAdditionalQuestions';

const additionalQuestionsKeys = [
  'occupation_1',
  'type_of_job_1',
  'when_was_work_1',
  'length_of_work_1',
  'location_of_work_1',
  'work_hours_for_work_1',
  'province_or_territory_of_work_1',
  'what_type_of_work_permit_do_you_currently_hold_for_work_1',
];

export const WorkHistorySection: React.FC<IPropsType> = ({ onchange, formNumber, formData, isInValid }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [additionalQuestionsData, setAdditionalQuestionsData] = useState<Record<string, string>[]>([]);

  useEffect(() => {
    const allStateObjects = [...Array(currentStep)].map((_, index) => {
      const stateObject = additionalQuestionsKeys.reduce((acc, key) => {
        const existingData =
          additionalQuestionsData.length > 0 ? additionalQuestionsData?.[index]?.[key] : '';
        return { ...acc, [key]: existingData ?? '' };
      }, {});
      return stateObject;
    });
    setAdditionalQuestionsData(allStateObjects);
  }, [currentStep]);

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
    const filteredData = additionalQuestionsData.filter((_, index) => {
      return index !== indexToRemove;
    });
    setAdditionalQuestionsData(filteredData);
    setCurrentStep((prevStep) => {
      return Math.max(1, prevStep - 1);
    });
  };

  useEffect(() => {
    if (formNumber !== 4 || !isInValid) return;
    isInValid(formData?.have_you_done_any_paid_work_during_the_last_10_years_ === '');
  }, [formData, formNumber]);

  return (
    <div>
      <FormRadioInput
        fields={workHistoryOrNot}
        value={formData?.have_you_done_any_paid_work_during_the_last_10_years_}
        onChange={(e) => {
          onchange('have_you_done_any_paid_work_during_the_last_10_years_', e.target.value);
        }}
        required
      />
      {formData?.have_you_done_any_paid_work_during_the_last_10_years_ === 'Yes' && (
        <div className="flex flex-col overflow-auto max-h-[50rem]">
          <p>
            Starting with your current (or most recent) job, please list all the paid work you have done during the last
            10 years:
          </p>
          {additionalQuestionsData?.map((_, index) => {
            return (
              <div key={`${index + 1}`}>
                <AdditionalQuestions
                  id={index}
                  close={closeWork}
                  formData={formData}
                  state={additionalQuestionsData}
                  onchange={handleOnChange}
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
