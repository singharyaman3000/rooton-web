'use client';

import 'tailwindcss/tailwind.css';
import { useState } from 'react';
import { FormRadioInput } from '../components/FormRadioInput';
import { FormDropdown } from '../components/FormDropDown';
import {
  familyFriendsCanada,
  familyFriendsManitoba,
  familyRelationshipOptions,
  livingIn,
  relativeSince,
  residencyStatusOptions,
} from '../config/formConfig';

const intialFormStates = {
  familyFriendsManitoba: '',
  familyFriendsCanada: '',
  familyRelationshipOptions: '',
  relativeSince: '',
  residencyStatusOptions: '',
  livingIn: '',
};

export const FamilyOrFriendsSection = () => {
  const [formValues, setFormValues] = useState(intialFormStates);

  const handleFieldChange = (fieldName: string, value: unknown) => {
    setFormValues((prevFormValues) => {
      return {
        ...prevFormValues,
        [fieldName]: value,
      };
    });
  };

  return (
    <div>
      <FormRadioInput
        fields={familyFriendsManitoba}
        onChange={(e) => {
          handleFieldChange('familyFriendsManitoba', e.target.value);
        }}
      />
      {/* <Dropdown
                options={familyFriendsManitoba[0].options}
                label={familyFriendsManitoba[0].label}
                value={formValues.familyFriendsManitoba}
                onChange={(e) => handleFieldChange('familyFriendsManitoba', e.target.value)}
            /> */}
      <FormRadioInput
        fields={familyFriendsCanada}
        onChange={(e) => {
          handleFieldChange('familyFriendsCanada', e.target.value);
        }}
      />
      <div style={{ display: formValues.familyFriendsCanada === 'Yes' ? 'block' : 'none' }}>
        <p>Please list all your and/or your spouse/common-law partner's relatives in Canada</p>
        <FormDropdown
          options={familyRelationshipOptions[0].options}
          label={familyRelationshipOptions[0].label}
          value={formValues.familyRelationshipOptions}
          onChange={(e) => {
            handleFieldChange('familyRelationshipOptions', e.target.value);
          }}
        />
        <FormDropdown
          options={residencyStatusOptions[0].options}
          label={residencyStatusOptions[0].label}
          value={formValues.residencyStatusOptions}
          onChange={(e) => {
            handleFieldChange('residencyStatusOptions', e.target.value);
          }}
        />
        <FormDropdown
          options={livingIn[0].options}
          label={livingIn[0].label}
          value={formValues.livingIn}
          onChange={(e) => {
            handleFieldChange('livingIn', e.target.value);
          }}
        />
        <FormDropdown
          options={relativeSince[0].options}
          label={relativeSince[0].label}
          value={formValues.relativeSince}
          onChange={(e) => {
            handleFieldChange('relativeSince', e.target.value);
          }}
        />
      </div>
    </div>
  );
};
