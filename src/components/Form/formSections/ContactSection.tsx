'use client';

import React, { useEffect, useState } from 'react';
import { FormTextInput } from '../components/FormTextInput';
import { contactInfo } from '../config/formConfig';
import { IPropsType } from '../config/models';

const intialFormStates = {
  firstname: '',
  lastname: '',
  email: '',
  telephone: '',
};

export const ContactSection: React.FC<IPropsType> = ({ onchange, formNumber }) => {
  const [formValues, setFormValues] = useState(intialFormStates);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleFieldChange = (fieldName: string, value: unknown) => {
    setFormValues((prevFormValues) => {
      return {
        ...prevFormValues,
        [fieldName]: value,
      };
    });
  };

  useEffect(() => {
    if (formNumber !== 9) return;
    if (onchange) {
      onchange(
        formValues.firstname === '' ||
        formValues.lastname === '' ||
        formValues.email === '' ||
        formValues.telephone === '' ||
        emailRegex.test(formValues.email),
      );
    }
  }, [formValues, formNumber]);

  return (
    <div>
      <FormTextInput
        field={contactInfo[0]}
        onChange={(e) => {
          handleFieldChange('firstname', e.target.value);
        }}
        value={formValues.firstname}
        required
      />
      <FormTextInput
        field={contactInfo[1]}
        onChange={(e) => {
          handleFieldChange('lastname', e.target.value);
        }}
        value={formValues.lastname}
        required
      />
      <FormTextInput
        field={contactInfo[2]}
        onChange={(e) => {
          handleFieldChange('email', e.target.value);
        }}
        value={formValues.email}
        required
      />
      <FormTextInput
        field={contactInfo[3]}
        onChange={(e) => {
          handleFieldChange('telephone', e.target.value);
        }}
        value={formValues.telephone}
      />
    </div>
  );
};
