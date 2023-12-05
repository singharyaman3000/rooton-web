'use client';

import React, { useEffect, useState } from 'react';
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

const intialFormStates = {
  age: '',
  country_of_citizenship: '',
  country_of_residence: '',
  marital_status: '',
  children_under_22: '',
  children_count_13_to_21: '',
  children_count_under_13: '',
  preferred_destination_in_canada: '',
  where_in_manitoba_wish_to_reside: '',
  ever_been_to_quebec_before: '',
};

export const PersonalSection: React.FC<IPropsType> = ({ onchange, formNumber, countries }) => {
  const [formValues, setFormValues] = useState(intialFormStates);

  const handleFieldChange = (fieldName: string, value: unknown) => {
    setFormValues((prevFormValues) => {
      return {
        ...prevFormValues,
        [fieldName]: value,
      };
    });
  };

  useEffect(() => {
    if (formNumber !== 1) return;
    if (onchange) {
      onchange(
        formValues.age === '' ||
        formValues.country_of_citizenship === '' ||
        formValues.country_of_residence === '' ||
        formValues.marital_status === '',
      );
    }
  }, [formValues]);

  useEffect(() => {
    if (!(formValues.preferred_destination_in_canada === 'Manitoba, Canada'))
      handleFieldChange('where_in_manitoba_wish_to_reside', '');

    if (!(formValues.preferred_destination_in_canada === 'Quebec, Canada'))
      handleFieldChange('ever_been_to_quebec_before', '');
  }, [formValues.preferred_destination_in_canada]);

  return (
    <div>
      <FormDropdown
        options={ageGroups[0].options}
        label={ageGroups[0].label}
        value={formValues.age}
        onChange={(e) => {
          handleFieldChange('age', e.target.value);
        }}
        required
      />
      <FormDropdown
        options={countries || []}
        label={countriesOfResidence[0].label}
        value={formValues.country_of_residence}
        onChange={(e) => {
          handleFieldChange('country_of_residence', e.target.value);
        }}
        required
      />
      <FormDropdown
        options={countries || []}
        label={countriesOfCitizenship[0].label}
        value={formValues.country_of_citizenship}
        onChange={(e) => {
          handleFieldChange('country_of_citizenship', e.target.value);
        }}
        required
      />
      <FormDropdown
        options={maritalStatusForm[0].options}
        label={maritalStatusForm[0].label}
        value={formValues.marital_status}
        onChange={(e) => {
          handleFieldChange('marital_status', e.target.value);
        }}
        required
      />
      <FormRadioInput
        fields={children}
        onChange={(e) => {
          handleFieldChange('children_under_22', e.target.value);
        }}
      />
      <div style={{ display: formValues.children_under_22 === 'Yes' ? 'block' : 'none' }}>
        <FormRadioInput
          fields={childCountUnder13}
          onChange={(e) => {
            handleFieldChange('children_count_under_13', e.target.value);
          }}
        />
        <FormRadioInput
          fields={childCountUnder22}
          onChange={(e) => {
            handleFieldChange('children_count_13_to_21', e.target.value);
          }}
        />
      </div>
      <FormDropdown
        options={destinationInCanada[0].options}
        label={destinationInCanada[0].label}
        value={formValues.preferred_destination_in_canada}
        onChange={(e) => {
          handleFieldChange('preferred_destination_in_canada', e.target.value);
        }}
      />
      <div style={{ display: formValues.preferred_destination_in_canada === 'Manitoba, Canada' ? 'block' : 'none' }}>
        <FormRadioInput
          fields={manitobaPreference}
          onChange={(e) => {
            handleFieldChange('where_in_manitoba_wish_to_reside', e.target.value);
          }}
        />
      </div>
      <div style={{ display: formValues.preferred_destination_in_canada === 'Quebec, Canada' ? 'block' : 'none' }}>
        <FormRadioInput
          fields={quebecHistory}
          onChange={(e) => {
            handleFieldChange('ever_been_to_quebec_before', e.target.value);
          }}
        />
      </div>
    </div>
  );
};
