'use client';

import React, { useEffect, useState } from 'react';
import { contactInfo, consultationType } from '../config/formConfig';
import { IPropsType } from '../config/models';
import useDebounce from '@/hooks/useDebounce';
import { FormTextInput } from '../../components/FormTextInput';
import { FormRadioInput } from '../../components/FormRadioInput';

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
        value={formData.firstname}
        onChange={(e) => {
          onchange('firstname', e.target.value);
        }}
        required
      />
      <FormTextInput
        field={contactInfo[1]}
        value={formData.lastname}
        onChange={(e) => {
          onchange('lastname', e.target.value);
        }}
        required
      />
      <FormTextInput
        field={contactInfo[2]}
        value={formData.email}
        onChange={(e) => {
          onchange('email', e.target.value);
        }}
        type='email'
        invalidFormat={!isEmailValid(formData?.email)}
        required
      />
      <FormTextInput
        field={contactInfo[3]}
        value={formData.mobilephone}
        type='phone'
        onChange={(e) => {
          onchange('mobilephone', e.target.value);
        }}
        invalidFormat={!isTelephoneValid(formData?.mobilephone)}
        required
      />
      <FormRadioInput
        fields={consultationType}
        value={formData?.consultation_type}
        onChange={(e) => {
          onchange('consultation_type', e.target.value);
        }}
      />
    </div>
  );
};
