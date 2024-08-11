import React, { useEffect } from 'react';
import { contactInfo, countriesOfResidence } from '../config/formConfig';
import { IPropsType } from '../config/models';
import { FormTextInput } from '../../components/FormTextInput';
import { regex } from '@/constants/regex';
import { FormDropdown } from '../../components/FormDropDown';

const { emailRegex, mobileRegex } = regex;

export const ContactSection: React.FC<IPropsType> = ({
  onchange,
  formNumber,
  countries,
  isInValid,
  formData,
}) => {
  const isEmailValid = (email: string) => {
    return email !== '' && emailRegex.test(email);
  };

  const isTelephoneValid = (telephone: string) => {
    return mobileRegex.test(telephone);
  };

  useEffect(() => {
    if (formNumber !== 1 || !isInValid) return;
    isInValid(
      !isEmailValid(formData.email) ||
        !formData?.lastname.trim() ||
        !formData?.firstname.trim() ||
        !isTelephoneValid(formData?.mobilephone) ||
        !formData?.country_of_residence?.trim(),
    );
  }, [formData, formNumber, isInValid]);

  return (
    <div>
      <div className="flex flex-col gap-4 md:grid grid-cols-2">
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
      </div>
      <FormTextInput
        field={contactInfo[2]}
        value={formData.email}
        onChange={(e) => {
          onchange('email', e.target.value.trim());
        }}
        type="email"
        invalidFormat={!isEmailValid(formData?.email)}
        required
      />
      <FormTextInput
        field={contactInfo[3]}
        value={formData.mobilephone || ''}
        type="phone"
        onChange={(e) => {
          onchange('mobilephone', e.target.value.trim());
        }}
        invalidFormat={!isTelephoneValid(formData?.mobilephone)}
        required
      />
      <FormDropdown
        options={countries || []}
        label={countriesOfResidence[0].label}
        value={formData?.country_of_residence}
        onChange={(e) => {
          onchange('country_of_residence', e.target.value);
        }}
        required
      />
    </div>
  );
};
