'use client';

import 'tailwindcss/tailwind.css';
import { useState } from 'react';
import { FormRadioInput } from '../components/FormRadioInput';
import { expressEntryInvitation, expressEntrySubmitted } from '../config/formConfig';

const initialStates = {
  expressEntry_submittedProfile: '',
  expressEntry_receivedInvitation: '',
};

export const ExpressEntrySection = () => {
  const [formValues, setFormValues] = useState(initialStates);

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
        fields={expressEntrySubmitted}
        onChange={(e) => {
          handleFieldChange('expressEntry_submittedProfile', e.target.value);
        }}
      />
      <div style={{ display: formValues.expressEntry_submittedProfile === 'Yes' ? 'block' : 'none' }}>
        <FormRadioInput
          fields={expressEntryInvitation}
          onChange={(e) => {
            handleFieldChange('expressEntry_receivedInvitation', e.target.value);
          }}
        />
      </div>
    </div>
  );
};
