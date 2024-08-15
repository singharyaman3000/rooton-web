import React, { useEffect } from 'react';
import {
  criminalHistory,
  IntendedOccupation,
  maritalStatus,
  previousCanadaExperience,
  visaRefusal,
  workingInCanada,
} from '../config/formConfig';
import { IPropsType } from '../config/models';
import { FormDropdown } from '../../components/FormDropDown';
import { FormTextArea } from '../../components/FormTextArea';
import { FormTextInput } from '../../components/FormTextInput';

export const PersonalSection: React.FC<IPropsType> = ({ onchange, isInValid, formData }) => {
  useEffect(() => {
    isInValid?.(false);
  }, []);

  return (
    <div>
      <FormDropdown
        options={workingInCanada[0].options}
        label={workingInCanada[0].label}
        value={formData?.[workingInCanada[0].name] || ''}
        onChange={(e) => {
          onchange(workingInCanada[0].name, e.target.value);
        }}
      />
      <div className="flex flex-col gap-4 md:grid grid-cols-2">
        <FormTextInput
          field={IntendedOccupation[0]}
          value={formData?.[IntendedOccupation[0].name] || ''}
          onChange={(e) => {
            onchange(IntendedOccupation[0].name, e.target.value);
          }}
        />
        <FormDropdown
          options={previousCanadaExperience[0].options}
          label={previousCanadaExperience[0].label}
          value={formData?.[previousCanadaExperience[0].name] || ''}
          onChange={(e) => {
            onchange(previousCanadaExperience[0].name, e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-4 md:grid grid-cols-2">
        <FormDropdown
          options={maritalStatus[0].options}
          label={maritalStatus[0].label}
          value={formData?.[maritalStatus[0].name] || ''}
          onChange={(e) => {
            onchange(maritalStatus[0].name, e.target.value);
          }}
        />
        <FormDropdown
          options={visaRefusal[0].options}
          label={visaRefusal[0].label}
          value={formData?.[visaRefusal[0].name] || ''}
          onChange={(e) => {
            onchange(visaRefusal[0].name, e.target.value);
          }}
        />
      </div>
      {formData?.[visaRefusal[0].name] === 'Yes' && (
        <FormTextArea
          field={visaRefusal[1]}
          value={formData.please_provide_details || ''}
          onChange={(e) => {
            onchange('please_provide_details', e.target.value);
          }}
        />
      )}
      <FormTextArea
        field={criminalHistory[0]}
        value={formData?.[criminalHistory[0].name] || ''}
        onChange={(e) => {
          onchange(criminalHistory[0].name, e.target.value);
        }}
      />
    </div>
  );
};
