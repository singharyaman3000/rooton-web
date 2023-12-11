import React, { useEffect } from 'react';
import { contactInfo, consultationType } from '../config/formConfig';
import { IPropsType } from '../config/models';
import { FormTextInput } from '../../components/FormTextInput';
import { FormRadioInput } from '../../components/FormRadioInput';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^\d{7,10}$/;

export const ContactSection: React.FC<IPropsType> = ({ onchange, formNumber, isInValid, formData }) => {

  const isEmailValid = (email: string) => {
    return email.trim() !== '' && emailRegex.test(email);
  };

  const isTelephoneValid = (telephone: string) => {
    return telephone.trim() !== '' && mobileRegex.test(telephone);
  };

  useEffect(() => {
    if (formNumber !== 9 || !isInValid) return;
    isInValid(
      !isEmailValid(formData.email) ||
      !isTelephoneValid(formData.mobilephone) ||
      !formData?.lastname.trim() ||
      !formData?.firstname.trim(),
    );
  }, [formData, formNumber]);

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
        required
        invalidFormat={!isTelephoneValid(formData?.mobilephone)}
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
