'use client';

import React, { useEffect, useState } from 'react';
import { FormTextInput } from '../components/FormTextInput';
import { contactInfo } from '../config/formConfig';
import { IPropsType } from '../config/models';
import useDebounce from '@/hooks/useDebounce';

const validityIntialState = {
  emailValidity: false,
  telephoneValidity: false,
};

export const ContactSection: React.FC<IPropsType> = ({ onchange, formNumber, isInValid, formData }) => {
  const [validity, setFormatValidity] = useState<Record<string, boolean>>(validityIntialState);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^\d{7,10}$/;

  useEffect(() => {
    if (formNumber !== 9) return;
    if (isInValid) {
      isInValid(
        formData?.firstname === '' ||
        formData?.lastname === '' ||
        formData?.email === '' ||
        formData?.mobilephone === '' ||
        validity.emailValidity ||
        validity.telephoneValidity,
      );
    }
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
      const isEmailValid = emailRegex.test(formData?.email);
      setFormatValidity((prevValidity) => {
        return {
          ...prevValidity,
          emailValidity: !isEmailValid,
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
      const isTelephoneValid = mobileRegex.test(formData.mobilephone);
      setFormatValidity((prevValidity) => {
        return {
          ...prevValidity,
          telephoneValidity: !isTelephoneValid,
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
        invalidFormat={validity.emailValidity}
        required
      />
      <FormTextInput
        field={contactInfo[3]}
        type='phone'
        onChange={(e) => {
          onchange('mobilephone', e.target.value);
        }}
        value={formData?.mobilephone}
        invalidFormat={validity.telephoneValidity}
        required
      />
    </div>
  );
};
