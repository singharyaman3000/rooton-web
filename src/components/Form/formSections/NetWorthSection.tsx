'use client';

import 'tailwindcss/tailwind.css';
import { useState } from 'react';
import { FormDropdown } from '../components/FormDropDown';
import { currency, netWorth } from '../config/formConfig';

const intialFormStates = {
  currency: '',
  netWorth: '',
};

export const NetWorthSection = () => {
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
      <p>This question is optional. Net worth is considered for some immigration programs.</p>
      <FormDropdown
        options={currency[0].options}
        label={currency[0].label}
        value={formValues.currency}
        onChange={(e) => {
          handleFieldChange('currency', e.target.value);
        }}
      />
      <FormDropdown
        options={netWorth[0].options}
        label={netWorth[0].label}
        value={formValues.netWorth}
        onChange={(e) => {
          handleFieldChange('netWorth', e.target.value);
        }}
      />
    </div>
  );
};
