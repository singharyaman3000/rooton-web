import React, { useEffect, useState } from 'react';
import { IPropsType } from '../config/models';
import { FormDropdown } from '@/components/Forms/components/FormDropDown';
import { FormRadioInput } from '@/components/Forms/components/FormRadioInput';
import { FormCloseButton } from '@/components/Forms/components/FormCloseButton';
import {
  likeToDo,
  sponsorRelationship,
  sponsorStatus,
  yourStatus,
  yourAge,
  yourSponsor,
  residingInCanada,
  yourChildGrandchildAge,
  yourChildGrandchildMaritalStatus,
  yourChildGrandchildSubstantially,
} from '../config/formConfig';
import { SponsorDropDown } from '@/components/Forms/components/SponsorDropDown';
import { initialStates } from '../config/intialState';

export const PersonalSection: React.FC<
  IPropsType & { setFormData: React.Dispatch<React.SetStateAction<typeof initialStates>> }
> = ({
  onchange,
  formNumber,
  isInValid,
  formData,
  setFormData, // Add this prop
}) => {
  const [childGrandchildDropdowns, setChildGrandchildDropdowns] = useState([{ id: 1, value: '' }]);

  useEffect(() => {
    if (formNumber !== 1 || !isInValid) return;
    isInValid(formData?.what_would_you_like_to_do === '');
  }, [formData, formNumber, isInValid]);

  useEffect(() => {
    const dropdownIds = Object.keys(formData)
      .filter((key) => key.startsWith('your_child_grandchild_age_'))
      .map((key) => {
        return {
          id: parseInt(key.split('_').pop() ?? '', 10),
          value: formData[key],
        };
      });
    if (dropdownIds.length > 0) {
      setChildGrandchildDropdowns(dropdownIds);
    }
  }, [formData]);
  const handleFieldChange = (fieldName: string, value: string, id: number) => {
    const modifiedFieldName = `${fieldName}_${id}`;
    onchange(modifiedFieldName, value);
  };

  const isAgeInRange = (ageValue: string, min: number, max: number) => {
    const age = parseInt(ageValue || '0', 10);
    return age >= min && age <= max;
  };

  const addDropdown = () => {
    const newId = childGrandchildDropdowns.length > 0 ? Math.max(...childGrandchildDropdowns.map((d) => d.id)) + 1 : 1;
    setChildGrandchildDropdowns([...childGrandchildDropdowns, { id: newId, value: '' }]);
    // Initialize new dropdown data in formData
    const newFields = {
      [`your_child_grandchild_age_${newId}`]: '',
      [`your_child_grandchild_marial_status_${newId}`]: '',
      [`your_child_grandchild_dependeds_substantially_on_your_financial_support_${newId}`]: '',
    };
    setFormData((prevFormData) => ({ ...prevFormData, ...newFields }));
  };
  const removeDropdown = (id: number) => {
    setChildGrandchildDropdowns((current) => current.filter((d) => d.id !== id));
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData };
      ['age', 'marital_status', 'financial_support'].forEach((field) => {
        delete newFormData[`your_child_grandchild_${field}_${id}` as keyof typeof newFormData];
      });
      return newFormData;
    });
  };

  return (
    <>
      <div className="flex flex-col gap-4 md:grid">
        {/* Like To Do */}
        <FormRadioInput
          fields={likeToDo}
          value={formData?.what_would_you_like_to_do}
          onChange={(e: { target: { value: string } }) => {
            onchange('what_would_you_like_to_do', e.target.value);
            onchange('are_you_a_citizen_or_permanent', '');
            onchange('How_old_are_you', '');
            onchange('currently_residing_in_Canada', '');
            onchange('my_sponsor', '');

            onchange('What_is_your_relationship_person', '');
            onchange('What_is_your_sponsor_Status', '');
          }}
        />

        {/* Your Status */}
        {formData.what_would_you_like_to_do === 'I want to Sponsor' && (
          <FormDropdown
            options={yourStatus[0].options}
            label={yourStatus[0].label}
            value={formData?.are_you_a_citizen_or_permanent || ''}
            onChange={(e) => {
              onchange('are_you_a_citizen_or_permanent', e.target.value);
            }}
          />
        )}

        {/* Sponsor Relationship */}
        {formData.what_would_you_like_to_do === 'I want be Sponsored' && (
          <FormDropdown
            options={sponsorRelationship[0].options}
            label={sponsorRelationship[0].label}
            value={formData?.What_is_your_relationship_person || ''}
            onChange={(e: { target: { value: string } }) => {
              return onchange('What_is_your_relationship_person', e.target.value);
            }}
          />
        )}
      </div>

      {/* Sponsor Status */}
      {['Spouse', 'Common-Law Partner', 'Parent', 'Child', 'Grandchild'].includes(
        formData.What_is_your_relationship_person,
      ) && (
        <FormDropdown
          options={sponsorStatus[0].options}
          label={sponsorStatus[0].label}
          value={formData?.What_is_your_sponsor_Status || ''}
          onChange={(e: { target: { value: string } }) => {
            return onchange('What_is_your_sponsor_Status', e.target.value);
          }}
        />
      )}

      {/* Your Age */}
      <div className="flex flex-col gap-4 md:grid">
        {(formData.are_you_a_citizen_or_permanent === 'Citizen' ||
          formData.are_you_a_citizen_or_permanent === 'Permanent Resident') && (
          <FormRadioInput
            fields={yourAge}
            value={formData?.How_old_are_you}
            onChange={(e: { target: { value: string } }) => {
              return onchange('How_old_are_you', e.target.value);
            }}
          />
        )}

        {/* Your Sponsor */}
        <div style={{ display: formData.How_old_are_you === '17 or above' ? 'block' : 'none' }}>
          {formData.are_you_a_citizen_or_permanent === 'Permanent Resident' && (
            <FormRadioInput
              fields={residingInCanada}
              value={formData?.currently_residing_in_Canada}
              onChange={(e: { target: { value: string } }) => {
                return onchange('currently_residing_in_Canada', e.target.value);
              }}
            />
          )}
          <SponsorDropDown
            options={yourSponsor[0].options}
            label={yourSponsor[0].label}
            value={formData?.my_sponsor || ''}
            onChange={(e: { target: { value: string } }) => {
              return onchange('my_sponsor', e.target.value);
            }}
          />
        </div>
      </div>

      {formData.my_sponsor === 'Child' || formData.my_sponsor === 'Grandchild' ? (
        <div>
          {childGrandchildDropdowns.map((dropdown) => {
            return (
              <div className="relative border md:ml-8 my-4 p-4 py-10 border-solid border-[black]" key={dropdown.id}>
                {/* Close Button */}
                <FormCloseButton onclick={() => removeDropdown(dropdown.id)}></FormCloseButton>

                {/* Child/Grandchild Age Dropdown */}
                <FormDropdown
                  options={yourChildGrandchildAge[0].options}
                  label={yourChildGrandchildAge[0].label}
                  value={formData[`your_child_grandchild_age_${dropdown.id}`] || ''}
                  onChange={(e) => {
                    return handleFieldChange('your_child_grandchild_age', e.target.value, dropdown.id);
                  }}
                />

                {/* Conditional Marital Status Dropdown */}
                {isAgeInRange(formData[`your_child_grandchild_age_${dropdown.id}`], 16, 22) && (
                  <FormDropdown
                    options={yourChildGrandchildMaritalStatus[0].options}
                    label={yourChildGrandchildMaritalStatus[0].label}
                    value={formData[`your_child_grandchild_marial_status_${dropdown.id}`] || ''}
                    onChange={(e) => {
                      return handleFieldChange('your_child_grandchild_marial_status', e.target.value, dropdown.id);
                    }}
                  />
                )}

                {/* Conditional Financial Support Dropdown */}
                {isAgeInRange(formData[`your_child_grandchild_age_${dropdown.id}`], 23, Infinity) && (
                  <FormDropdown
                    options={yourChildGrandchildSubstantially[0].options}
                    label={yourChildGrandchildSubstantially[0].label}
                    value={
                      formData[
                        `your_child_grandchild_dependeds_substantially_on_your_financial_support_${dropdown.id}`
                      ] || ''
                    }
                    onChange={(e) => {
                      return handleFieldChange(
                        'your_child_grandchild_dependeds_substantially_on_your_financial_support',
                        e.target.value,
                        dropdown.id,
                      );
                    }}
                  />
                )}
              </div>
            );
          })}
          <div className="flex justify-end pt-4 md:pt-8">
            <button className="add-another-field-button flex" type="button" onClick={addDropdown}>
              + Add another field
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};
