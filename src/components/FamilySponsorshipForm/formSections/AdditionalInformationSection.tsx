/* eslint-disable max-len */

'use client';

import React from 'react';
import { IPropsType } from '../config/models';
import { FormRadioInput } from '../components/FormRadioInput';
import { FormTextArea } from '../components/FormTextArea';
import {
  additionalInformation,
  additionalInformationField,
} from '../config/formConfig';

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
    </div>
  );
};
