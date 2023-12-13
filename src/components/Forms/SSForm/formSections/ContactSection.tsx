'use client';

import React, { useEffect } from 'react';
import { FormTextInput } from '@/components/Forms/components/FormTextInput';
import { IPropsType } from '../config/models';
import { FormDropdown } from '@/components/Forms/components/FormDropDown';
import {
  countriesOfResidence,
  contactInfo,
} from '../config/formConfig';
import { regex } from '@/constants/regex';

const { emailRegex, mobileRegex } = regex;

export const ContactSection: React.FC<IPropsType> = ({ onchange, formNumber, isInValid, formData, countries }) => {

  const isEmailValid = (email: string) => {
    return email !== '' && emailRegex.test(email);
  };

  const isTelephoneValid = (telephone: string) => {
    return mobileRegex.test(telephone);
  };

  useEffect(() => {
    if (formNumber !== 2 || !isInValid) return;
    isInValid(
      !isEmailValid(formData.email) ||
      !formData?.lastname.trim() ||
      !formData?.firstname.trim() ||
      !formData?.country_of_residence.trim(),
    );
  }, [formData, formNumber]);

  return (
    <div className='flex flex-col gap-2 md:grid grid-cols-2'>
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
          onchange('email', e.target.value.trim());
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
          onchange('mobilephone', e.target.value.trim());
        }}
        invalidFormat={!isTelephoneValid(formData?.mobilephone)}
        required
      />
      <FormDropdown
        options={countries || []}
        label={countriesOfResidence[0].label}
        value={formData.country_of_residence}
        onChange={(e) => {
          onchange('country_of_residence', e.target.value);
        }}
        required
      />
    </div>
  );
};
