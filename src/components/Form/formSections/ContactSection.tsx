'use client';

import React, { useEffect, useState } from 'react';
import { FormTextInput } from '../components/FormTextInput';
import { contactInfo } from '../config/formConfig';
import { IPropsType } from '../config/models';
import useDebounce from '@/hooks/useDebounce';

const intialFormStates = {
  firstname: '',
  lastname: '',
  email: '',
  telephone: '',
};

const validityIntialState = {
  emailValidity: false,
  telephoneValidity: false,
};

export const ContactSection: React.FC<IPropsType> = ({ onchange, formNumber }) => {
  const [formValues, setFormValues] = useState(intialFormStates);
  const [validity, setFormatValidity] = useState<Record<string, boolean>>(validityIntialState);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^\d{7,10}$/;

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
        validity.emailValidity ||
        validity.telephoneValidity,
      );
    }
  }, [formValues, formNumber]);

  useDebounce(
    () => {
      if (formValues.email === '') {
        setFormatValidity((prevValidity) => {
          return {
            ...prevValidity,
            emailValidity: false,
          };
        });
        return;
      }
      const isEmailValid = emailRegex.test(formValues.email);
      setFormatValidity((prevValidity) => {
        return {
          ...prevValidity,
          emailValidity: !isEmailValid,
        };
      });
      setFormValues((prevFormValues) => {
        return {
          ...prevFormValues,
          ...isEmailValid && { email: formValues.email },
        };
      });
    },
    1000,
    [formValues.email],
  );

  useDebounce(
    () => {
      if (formValues.telephone === '') {
        setFormatValidity((prevValidity) => {
          return {
            ...prevValidity,
            telephoneValidity: false,
          };
        });
        return;
      }
      const isTelephoneValid = mobileRegex.test(formValues.telephone);
      console.log(isTelephoneValid);
      setFormatValidity((prevValidity) => {
        return {
          ...prevValidity,
          telephoneValidity: !isTelephoneValid,
        };
      });
      setFormValues((prevFormValues) => {
        return {
          ...prevFormValues,
          ...isTelephoneValid && { telephone: formValues.telephone },
        };
      });
    },
    1000,
    [formValues.telephone],
  );

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
        type='email'
        value={formValues.email}
        invalidFormat={validity.emailValidity}
        required
      />
      <FormTextInput
        field={contactInfo[3]}
        type='phone'
        onChange={(e) => {
          handleFieldChange('telephone', e.target.value);
        }}
        value={formValues.telephone}
        invalidFormat={validity.telephoneValidity}
        required
      />
    </div>
  );
};
