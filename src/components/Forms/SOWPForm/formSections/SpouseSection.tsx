import React, { useEffect } from 'react';
import { maritalStatus, spouseStatus, spouseStatusDetails } from '../config/formConfig';
import { IPropsType } from '../config/models';
import { FormDropdown } from '../../components/FormDropDown';
import { FormRadioInput } from '../../components/FormRadioInput';
import { FormDatePicker } from '../../components/FormDatePicker';

export const SpouseSection: React.FC<IPropsType> = ({ onchange, isInValid, formData, formNumber }) => {
  useEffect(() => {
    if (formNumber !== 2 || !isInValid) return;
    isInValid?.(!formData?.[maritalStatus[0].name]);
  }, [formData, formNumber, isInValid]);

  return (
    <div>
      <div className="flex flex-col gap-4 md:grid grid-cols-2">
        <FormDropdown
          options={maritalStatus[0].options}
          label={maritalStatus[0].label}
          value={formData?.[maritalStatus[0].name] || ''}
          onChange={(e) => {
            onchange(maritalStatus[0].name, e.target.value);
          }}
          required
        />
      </div>
      {formData?.[maritalStatus[0].name] &&
        formData?.[maritalStatus[0].name] !== 'Single' &&
        formData?.[maritalStatus[0].name] !== 'Divorced' &&
        formData?.[maritalStatus[0].name] !== 'Single Parent' && (
        <FormRadioInput
          fields={spouseStatus}
          value={formData?.[spouseStatus[0].name] || ''}
          onChange={(e) => {
            onchange(spouseStatus[0].name, e.target.value);
            if (e.target.value === 'No') {
              onchange('what_is_the_status_of_your_spouse_in_canada_', '');
              onchange('when_does_your_spouse_s_visa_expire_', '');
            }
          }}
        />
      )}
      {formData?.[maritalStatus[0].name] &&
        formData?.[maritalStatus[0].name] !== 'Single' &&
        formData?.[maritalStatus[0].name] !== 'Divorced' &&
        formData?.[maritalStatus[0].name] !== 'Single Parent' &&
        formData?.[spouseStatus[0].name] === 'Yes' && (
        <div className="flex flex-col gap-4 lg:grid grid-cols-2">
          <FormDropdown
            options={spouseStatusDetails[0].options}
            label={spouseStatusDetails[0].label}
            value={formData?.[spouseStatusDetails[0].name] || ''}
            onChange={(e) => {
              onchange(spouseStatusDetails[0].name, e.target.value);
            }}
          />
          <FormDatePicker
            field={spouseStatusDetails[1]}
            value={formData?.[spouseStatusDetails[1].name] || ''}
            onChange={(value) => {
              onchange?.(spouseStatusDetails[1].name, value);
            }}
            className="p-0 lg:p-[14px]"
          />
        </div>
      )}
    </div>
  );
};
