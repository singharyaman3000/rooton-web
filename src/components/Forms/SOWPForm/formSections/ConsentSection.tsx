import React, { useEffect } from 'react';
import { anySpecificQuestion, consultationType } from '../config/formConfig';
import { IPropsType } from '../config/models';
import { FormRadioInput } from '../../components/FormRadioInput';
import { FormSingleCheckBoxInput } from '../../components/FormSingleCheckBoxInput';
import { texts } from '@/constants/texts';
import { PrivacyPolicy } from '../../components/PrivacySection';
import { FormTextArea } from '../../components/FormTextArea';

export const ConsentSection: React.FC<IPropsType> = ({ onchange, formNumber, isInValid, formData }) => {
  useEffect(() => {
    if (formNumber !== 4 || !isInValid) return;
    isInValid(!formData?.preferred_consultation_type_);
  }, [formData, formNumber]);

  return (
    <div>
      <FormTextArea
        field={anySpecificQuestion[0]}
        value={formData?.[anySpecificQuestion[0].name] || ''}
        onChange={(e) => {
          onchange(anySpecificQuestion[0].name, e.target.value);
        }}
      />
      <FormRadioInput
        required
        fields={consultationType}
        value={formData?.preferred_consultation_type_}
        onChange={(e) => {
          onchange('preferred_consultation_type_', e.target.value);
        }}
      />
      <FormSingleCheckBoxInput
        id="FSW-Form-consent"
        value={
          formData?.i_consent_to_receive_email_communications_from_root_on_regarding_my_canadian_immigration_inquiry_
        }
        label={texts.CONSENT}
        onChange={(value: 'Yes' | 'No') => {
          onchange(
            'i_consent_to_receive_email_communications_from_root_on_regarding_my_canadian_immigration_inquiry_',
            value,
          );
        }}
      />
      <PrivacyPolicy />
    </div>
  );
};
