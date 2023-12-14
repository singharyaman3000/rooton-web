/* eslint-disable max-len */

'use client';

import React from 'react';
import { IPropsType } from '../config/models';
import { FormRadioInput } from '@/components/Forms/components/FormRadioInput';
import { FormTextArea } from '@/components/Forms/components/FormTextArea';
import {
  additionalInformation,
  additionalInformationField,
} from '../config/formConfig';
import { FormSingleCheckBoxInput } from '../../components/FormSingleCheckBoxInput';
import { PrivacyPolicy } from '../../components/PrivacySection';
import { texts } from '@/constants/texts';

export const AdditionalInformationSection: React.FC<IPropsType> = ({ onchange, formData }) => {

  return (
    <div>
      <FormRadioInput
        fields={additionalInformation}
        value={formData?.additional_information_for_immigration_assessment}
        onChange={(e) => {
          onchange('additional_information_for_immigration_assessment', e.target.value);
        } } />
      {formData.additional_information_for_immigration_assessment === 'Yes' && (
        <FormTextArea
          field={additionalInformationField[0]}
          value={formData.ad_info}
          onChange={(e) => {
            onchange('ad_info', e.target.value);
          } } />
      )}
      <FormSingleCheckBoxInput
        id='FSW-Form-consent'
        value={formData?.i_consent_to_receive_email_communications_from_root_on_regarding_my_canadian_immigration_inquiry_}
        label={texts.CONSENT} onChange={(value: 'Yes' | 'No') => {
          onchange('i_consent_to_receive_email_communications_from_root_on_regarding_my_canadian_immigration_inquiry_', value);
        }}
      />
      <PrivacyPolicy />
    </div>
  );
};
