import React, { useEffect } from 'react';
import { contactInfo, consultationType } from '../config/formConfig';
import { IPropsType } from '../config/models';
import { FormTextInput } from '../../components/FormTextInput';
import { FormRadioInput } from '../../components/FormRadioInput';
import { FormSingleCheckBoxInput } from '../../components/FormSingleCheckBoxInput';
import { regex } from '@/constants/regex';
import { texts } from '@/constants/texts';

const { emailRegex, mobileRegex } = regex;

export const ContactSection: React.FC<IPropsType> = ({ onchange, formNumber, isInValid, formData }) => {

  const isEmailValid = (email: string) => {
    return email !== '' && emailRegex.test(email);
  };

  const isTelephoneValid = (telephone: string) => {
    return mobileRegex.test(telephone);
  };

  useEffect(() => {
    if (formNumber !== 9 || !isInValid) return;
    isInValid(
      !isEmailValid(formData.email) ||
      !formData?.lastname.trim() ||
      !formData?.firstname.trim() ||
      !formData?.consultation_type,
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
      />
      <FormRadioInput
        required
        fields={consultationType}
        value={formData?.consultation_type}
        onChange={(e) => {
          onchange('consultation_type', e.target.value);
        }}
      />
      <FormSingleCheckBoxInput
        id=''
        label={texts.CONSENT} onChange={(value: 'Yes' | 'No') => {
          onchange('i_consent_to_receive_email_communications_from_root_on_regarding_my_canadian_immigration_inquiry_', value);
        }}
      />

      <div className="hs-richtext hs-main-font-element">
        <p><span className="text-[12pt] text-black bg-transparent font-normal no-underline align-baseline">
          <strong>Privacy Note:<br></br> </strong>
          By submitting this form, you agree to our <a href="/privacy-policy" target="_blank" rel="noopener">
            <span className="underline text-[#3574e3]">Privacy Policy</span></a> &amp;
          <a href="/terms-and-conditions" target="_blank" rel="noopener">
            <span className="text-[#3574e3]"><span className="underline">Terms &amp;</span>
              <span className="underline">Conditions</span>
            </span>
          </a>
          . We respect your privacy and will only use your information
          to provide you with the information and services you request.
        </span>
        </p>
      </div>
    </div>
  );
};
