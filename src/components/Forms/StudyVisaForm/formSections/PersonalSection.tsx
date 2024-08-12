import React, { useEffect } from 'react';
import { currentOccupation, extendedFamily, maritalStatus, visaRefusal } from '../config/formConfig';
import { IPropsType } from '../config/models';
import { FormDropdown } from '../../components/FormDropDown';
import { FormTextArea } from '../../components/FormTextArea';

export const PersonalSection: React.FC<IPropsType> = ({ onchange, isInValid, formData }) => {
  useEffect(() => {
    isInValid?.(false);
  }, []);

  return (
    <div>
      <FormDropdown
        options={currentOccupation[0].options}
        label={currentOccupation[0].label}
        value={formData?.[currentOccupation[0].name] || ''}
        onChange={(e) => {
          onchange(currentOccupation[0].name, e.target.value);
        }}
      />
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
          options={extendedFamily[0].options}
          label={extendedFamily[0].label}
          value={formData?.[extendedFamily[0].name] || ''}
          onChange={(e) => {
            onchange(extendedFamily[0].name, e.target.value);
          }}
        />
      </div>
      <FormDropdown
        options={visaRefusal[0].options}
        label={visaRefusal[0].label}
        value={formData?.[visaRefusal[0].name] || ''}
        onChange={(e) => {
          onchange(visaRefusal[0].name, e.target.value);
        }}
      />
      {formData?.[visaRefusal[0].name] === 'Yes' && (
        <FormTextArea
          field={visaRefusal[1]}
          value={formData.please_provide_details || ''}
          onChange={(e) => {
            onchange('please_provide_details', e.target.value);
          }}
        />
      )}
    </div>
  );
};
