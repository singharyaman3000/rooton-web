import React, { useEffect } from 'react';
import { IPropsType } from '../config/models';
import { FormDropdown } from '../components/FormDropDown';
import {
  ageGroups,
  childCountUnder13,
  childCountUnder22,
  children,
  countriesOfCitizenship,
  countriesOfResidence,
  destinationInCanada,
  manitobaPreference,
  maritalStatusForm,
  quebecHistory,
} from '../config/formConfig';
import { FormRadioInput } from '../components/FormRadioInput';

export const PersonalSection: React.FC<IPropsType> = ({ onchange, formNumber, countries, isInValid, formData }) => {

  useEffect(() => {
    if (formNumber !== 1 || !isInValid) return;
    isInValid(
      formData?.age === '' ||
      formData?.country_of_citizenship === '' ||
      formData?.country_of_residence === '',
    );
  }, [formData]);

  return (
    <>
      <div className='flex flex-col gap-4 md:grid grid-cols-2'>
        <FormDropdown
          options={ageGroups[0].options}
          label={ageGroups[0].label}
          value={formData?.age}
          onChange={(e) => {
            onchange('age', e.target.value);
          }}
          required
        />
        <FormDropdown
          options={maritalStatusForm[0].options}
          label={maritalStatusForm[0].label}
          value={formData?.marital}
          onChange={(e) => {
            onchange('marital', e.target.value);
          }}
        />
      </div>
      <div className='flex flex-col gap-4 md:grid grid-cols-2'>
        <FormDropdown
          options={countries || []}
          label={countriesOfCitizenship[0].label}
          value={formData?.country_of_citizenship}
          onChange={(e) => {
            onchange('country_of_citizenship', e.target.value);
          }}
          required
        />
        <FormDropdown
          options={countries || []}
          label={countriesOfResidence[0].label}
          value={formData?.country_of_residence}
          onChange={(e) => {
            onchange('country_of_residence', e.target.value);
          }}
          required
        />
      </div>
      <FormRadioInput
        fields={children}
        onChange={(e) => {
          onchange('do_you_have_any_children_under_the_age_of_22_', e.target.value);
        }}
        value={formData.do_you_have_any_children_under_the_age_of_22_}
      />
      {formData?.do_you_have_any_children_under_the_age_of_22_ === 'Yes' && (
        <div className='flex flex-col gap-4 md:grid grid-cols-2'>
          <FormRadioInput
            fields={childCountUnder13}
            onChange={(e) => {
              onchange('how_many_children_do_you_have_under_the_age_of_13_', e.target.value);
            }}
            value={formData.how_many_children_do_you_have_under_the_age_of_13_}
          />
          <FormRadioInput
            fields={childCountUnder22}
            onChange={(e) => {
              onchange('how_many_children_do_you_have_aged_13_to_21_', e.target.value);
            }}
            value={formData.how_many_children_do_you_have_aged_13_to_21_}
          />
        </div>
      )}
      <FormDropdown
        options={destinationInCanada[0].options}
        label={destinationInCanada[0].label}
        value={formData?.preferred_destination_in_canada}
        onChange={(e) => {
          onchange('preferred_destination_in_canada', e.target.value);
        }}
      />
      {formData?.preferred_destination_in_canada === 'Manitoba, Canada' && (
        <FormRadioInput
          fields={manitobaPreference}
          onChange={(e) => {
            onchange('where_in_manitoba_do_you_wish_to_reside', e.target.value);
          }}
          value={formData.where_in_manitoba_do_you_wish_to_reside}
        />
      )}
      {formData?.preferred_destination_in_canada === 'Quebec, Canada' && (
        <FormRadioInput
          fields={quebecHistory}
          onChange={(e) => {
            onchange('have_you_ever_been_to_quebec_before_', e.target.value);
          }}
          value={formData.have_you_ever_been_to_quebec_before_}
        />
      )}
    </>
  );
};
