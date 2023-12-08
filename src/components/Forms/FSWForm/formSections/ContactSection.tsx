'use client';

import React, { useEffect, useState } from 'react';
import { contactInfo } from '../config/formConfig';
import { IPropsType } from '../config/models';
import useDebounce from '@/hooks/useDebounce';
import { FormTextInput } from '../../components/FormTextInput';

const validityIntialState = {
  emailValidity: false,
  telephoneValidity: false,
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^\d{6,10}$/;

export const ContactSection: React.FC<IPropsType> = ({ onchange, formNumber, isInValid, formData }) => {
  const [validity, setFormatValidity] = useState<Record<string, boolean>>(validityIntialState);

  const isEmailValid = (email: string) => {
    return email === '' || emailRegex.test(email);
  };

  const isTelephoneValid = (telephone: string) => {
    return telephone === '' || mobileRegex.test(telephone);
  };

  useEffect(() => {
    if (formNumber !== 9 || !isInValid) return;
    isInValid(
      validity.telephoneValidity ||
      validity.emailValidity ||
      formData?.email === '' ||
      formData?.mobilephone === '' ||
      formData?.lastname === '' ||
      formData?.firstname === '',
    );
  }, [formData, formNumber]);

  useDebounce(
    () => {
      if (formData?.email === '') {
        setFormatValidity((prevValidity) => {
          return {
            ...prevValidity,
            emailValidity: false,
          };
        });
        return;
      }
      setFormatValidity((prevValidity) => {
        return {
          ...prevValidity,
          emailValidity: !isEmailValid(formData.email),
        };
      });
    },
    1000,
    [formData.email],
  );

  useDebounce(
    () => {
      if (formData.mobilephone === '') {
        setFormatValidity((prevValidity) => {
          return {
            ...prevValidity,
            telephoneValidity: false,
          };
        });
        return;
      }
      setFormatValidity((prevValidity) => {
        return {
          ...prevValidity,
          telephoneValidity: !isTelephoneValid(formData.mobilephone),
        };
      });
    },
    1000,
    [formData?.mobilephone],
  );

  return (
    <div>
      <FormTextInput
        field={contactInfo[0]}
        onChange={(e) => {
          onchange('firstname', e.target.value);
        }}
        value={formData?.firstname}
        required
      />
      <FormTextInput
        field={contactInfo[1]}
        onChange={(e) => {
          onchange('lastname', e.target.value);
        }}
        value={formData?.lastname}
        required
      />
      <FormTextInput
        field={contactInfo[2]}
        onChange={(e) => {
          onchange('email', e.target.value);
        }}
        type='email'
        value={formData?.email}
        invalidFormat={!isEmailValid(formData?.email)}
        required
      />
      <FormTextInput
        field={contactInfo[3]}
        type='phone'
        onChange={(e) => {
          onchange('mobilephone', e.target.value);
        }}
        value={formData?.mobilephone}
        invalidFormat={!isTelephoneValid(formData?.mobilephone)}
        required
      />
    </div>
  );
};
