import React, { useEffect, useState } from 'react';
import { highSchool, training } from '../../config/formConfig';
import { FormRadioInput } from '../../components/FormRadioInput';
import { AdditionalQuestions } from './AdditionalQuestions';
import { IPropsType } from '../../config/models';

const additionalQuestionsKeys = [
  'type_of_education_or_training_',
  'duration_of_education_or_training_',
  'location_of_education_or_training_',
  'province_of_education_or_training_',
  'completed_the_education_or_training_',
  'have_you_lived_in_one_of_canada_s_atlantic_provinces_for_education_or_training_',
];

export const EducationSection: React.FC<IPropsType> = ({ onchange, formNumber, formData, isInValid }) => {
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

  const addEducation = () => {
    setCurrentStep((prevStep) => {
      return prevStep + 1;
    });
  };

  const closeEducation = (indexToRemove: number) => {
    const filteredData = additionalQuestionsData.filter((_, index) => {
      return index !== indexToRemove;
    });
    setAdditionalQuestionsData(filteredData);
    setCurrentStep((prevStep) => {
      return Math.max(1, prevStep - 1);
    });
  };

  useEffect(() => {
    if (formNumber !== 3 || !isInValid) return;
    isInValid(formData.have_you_completed_high_school__12th_grade__ === '');
  }, [formData, formNumber]);

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
      {formData.have_you_completed_high_school__12th_grade__ === 'Yes' && (
        <FormRadioInput
          fields={training}
          value={formData.have_you_received_any_education_or_training_other_than_high_school_}
          onChange={(e) => {
            onchange('have_you_received_any_education_or_training_other_than_high_school_', e.target.value);
          }}
        />
      )}
      {formData.have_you_received_any_education_or_training_other_than_high_school_ === 'Yes' && (
        <div className="flex flex-col overflow-auto max-h-[50rem]">
          <p>
            Please list all of your education and/or training other than high school (secondary school), starting with
            the most recent:
          </p>
          {additionalQuestionsData?.map((_, index) => {
            return (
              <div key={`${index + 1}`}>
                <AdditionalQuestions
                  id={index}
                  close={closeEducation}
                  formData={formData}
                  state={additionalQuestionsData}
                  onchange={handleOnChange}
                />
              </div>
            );
          })}
          {currentStep < 6 && (
            <button className="add-another-field-button" type="button" onClick={addEducation}>
              + Add another field
            </button>
          )}
        </div>
      )}
    </div>
  );
};
