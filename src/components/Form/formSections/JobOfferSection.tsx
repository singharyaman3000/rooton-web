'use client';

import 'tailwindcss/tailwind.css';
import React, { useState } from 'react';
import { FormDropdown } from '../components/FormDropDown';
import { FormRadioInput } from '../components/FormRadioInput';
import { contractDurationOptions, occupation, workHoursOptions, workProvinceTerritory } from '../config/formConfig';
import { IPropsType } from '../config/models';

const intialFormStates = {
  occupation: '',
  workHoursOptions: '',
  workProvinceTerritory: '',
  contractDurationOptions: '',
};

export const JobOfferSection: React.FC<IPropsType> = ({ occupations }) => {
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
    <div className='flex flex-col gap-4 md:gap-16'>
      <div className="flex flex-col gap-4 md:grid grid-cols-2">
        <FormDropdown
          options={occupations || []}
          label={occupation[0].label}
          value={formValues.occupation}
          onChange={(e) => {
            handleFieldChange('occupation', e.target.value);
          }}
        />
        <FormDropdown
          options={workProvinceTerritory[0].options}
          label={workProvinceTerritory[0].label}
          value={formValues.workProvinceTerritory}
          onChange={(e) => {
            handleFieldChange('workProvinceTerritory', e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-4 md:grid grid-cols-2">
        <FormRadioInput
          fields={workHoursOptions}
          onChange={(e) => {
            handleFieldChange('workHoursOptions', e.target.value);
          }}
        />
        <FormRadioInput
          fields={contractDurationOptions}
          onChange={(e) => {
            handleFieldChange('contractDurationOptions', e.target.value);
          }}
        />
      </div>
    </div>
  );
};
