import React, { useEffect, useRef, useState } from 'react';
import { IPropsAdditionalType } from '../../config/models';
import { FormRadioInput } from '@/components/Forms/components/FormRadioInput';
import { AdditionalQuestions } from './AdditionalQuestions';
import {
  familyFriendsCanada,
  familyFriendsManitoba,
} from '../../config/formConfig';
import useScrollToBottom from '@/hooks/useScrollToBottom';
import { generateAllStateObjects } from '@/utils';

const additionalQuestionsKeys = [
  'relationship_with_relative_',
  'residency_status_of_relative_',
  'living_in_relative_',
  'living_there_for_relative_',
];

export const FamilyOrFriendsSection: React.FC<IPropsAdditionalType> = ({
  onchange,
  formData,
  filledFields,
  setFilledFields,
  additionalQuestionsData,
  setAdditionalQuestionsData,
}) => {

  const [currentStep, setCurrentStep] = useState<number>(filledFields);
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollToBottom(containerRef, [currentStep, additionalQuestionsData]);

  const handleOnChange = (key: string, value: string, index: number, state: Record<string, string>[]) => {
    const dataToUpdate = [...state];
    dataToUpdate[index][key] = value;
    setAdditionalQuestionsData(dataToUpdate);
  };

  const addFamily = () => {
    setCurrentStep((prevStep) => {
      return prevStep + 1;
    });
  };

  const closeFamily = (indexToRemove: number) => {
    const filteredData = additionalQuestionsData?.filter((_, index) => {
      return index !== indexToRemove;
    });
    setAdditionalQuestionsData(filteredData);
    setCurrentStep((prevStep) => {
      return Math.max(0, prevStep - 1);
    });
  };

  useEffect(() => {
    const allStateObjects = generateAllStateObjects(currentStep, additionalQuestionsKeys, additionalQuestionsData);
    setAdditionalQuestionsData(allStateObjects);
    setFilledFields(currentStep);
  }, [currentStep]);

  return (
    <div className="flex flex-col gap-y-4">
      <FormRadioInput
        fields={familyFriendsManitoba}
        value={formData?.close_friend_living_in_manitoba_18_years_or_older_}
        onChange={(e) => {
          onchange('close_friend_living_in_manitoba_18_years_or_older_', e.target.value);
        }}
      />
      <FormRadioInput
        fields={familyFriendsCanada}
        value={formData?.family_members_or_relatives_living_in_canada_18_years_or_older_}
        onChange={(e) => {
          onchange('family_members_or_relatives_living_in_canada_18_years_or_older_', e.target.value);
        }}
      />
      {formData?.family_members_or_relatives_living_in_canada_18_years_or_older_ === 'Yes' &&
        <>
          <p>{'Please list all your and/or your spouse/common-law partner\'s relatives in Canada'}</p>
          <div ref={containerRef} className="flex flex-col overflow-auto max-h-[50rem]">
            {additionalQuestionsData?.map((_, index) => {
              return (
                <div key={`${index + 1}`} className="m-0 md:mr-8">
                  <AdditionalQuestions
                    id={index}
                    close={closeFamily}
                    state={additionalQuestionsData}
                    onchange={handleOnChange}
                  />
                </div>
              );
            })}
          </div>
          {currentStep < 6 && (
            <button className="add-another-field-button" type="button" onClick={addFamily}>
              + Add another field
            </button>
          )}
        </>
      }
    </div>
  );
};
