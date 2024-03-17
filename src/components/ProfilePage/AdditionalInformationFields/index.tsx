/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import React, { useState, forwardRef, useEffect } from 'react';
import style from '../ProfilePage.module.css';

type PersonalInformationFieldsFieldsProps = {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  name: string;
  onChangeHandler: (id: string, value: string) => void;
  value: string;
  disabled: boolean;
};

const InputFieldWithLabel = ({
  id,
  label,
  type = 'text',
  placeholder,
  onChangeHandler,
  value,
  disabled = false,
}: PersonalInformationFieldsFieldsProps) => {
  const fieldStyle = `border-2 border-gray-300 focus:outline-none hover:border-2 hover:border-gray-500 p-3 rounded bg-white text-black w-full text-sm ${disabled
    ? 'bg-gray-300 cursor-not-allowed focus:outline-none border-2 border-gray-300 hover:border-2 hover:border-gray-300 '
    : ''
  }`;
  const labelStyle = 'block text-sm text-gray-700 font-bold mb-2';

  return (
    <div>
      <label htmlFor={id} className={labelStyle}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={fieldStyle}
        onChange={(e) => {
          return onChangeHandler(id, e.target.value);
        }}
        value={value}
        disabled={disabled}
      />
    </div>
  );
};

type FieldsProps = {
  onChange: (data: any) => void;
  data: any;
};

const AdditionalInformationFields = forwardRef<HTMLDivElement, FieldsProps>(({ onChange, data }, ref) => {
  const [fields, setFields] = useState({
    port_of_entry_user_enter_from: '',
    detained_or_ordered_to_leave_Canada_yes: '',
    familymembers_diagnosedwithdiseases_Aids_or_any_details: '',
    convicted_or_chrged_with_criminal_offense: '',
  });

  useEffect(() => {
    setFields({
      port_of_entry_user_enter_from: data?.port_of_entry_user_enter_from || '',
      detained_or_ordered_to_leave_Canada_yes: data?.detained_or_ordered_to_leave_Canada_yes || '',
      familymembers_diagnosedwithdiseases_Aids_or_any_details: data?.familymembers_diagnosedwithdiseases_Aids_or_any_details || '',
      convicted_or_chrged_with_criminal_offense: data?.convicted_or_chrged_with_criminal_offense || '',
    });
  }, [data]);

  const handleFieldChange = (fieldName: string, fieldValue: string) => {
    const updatedFields = {
      ...fields,
      [fieldName]: fieldValue,
    };
    setFields(updatedFields);
    onChange(updatedFields); // Inform the parent component about the change
  };

  return (
    <div ref={ref}>
      <div className={`${style.mainContent} pl-5 pr-5 pb-5 rounded`}>
        <div className="text-black position-relative font-bold text-lg mt-11 mb-4">Additional Information</div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-9 mt-4">
          <InputFieldWithLabel
            id="port_of_entry_user_enter_from"
            label="Have you ever been in Canada before? If yes, when and which port of entry did you enter from?"
            type="text"
            placeholder=""
            name="port_of_entry_user_enter_from"
            value={fields.port_of_entry_user_enter_from}
            onChangeHandler={handleFieldChange}
            disabled={false}
          />
          <InputFieldWithLabel
            id="detained_or_ordered_to_leave_Canada_yes"
            label="Have you ever been detained or ordered to leave Canada? If yes, give details"
            type="text"
            placeholder=""
            name="detained_or_ordered_to_leave_Canada_yes"
            value={fields.detained_or_ordered_to_leave_Canada_yes}
            onChangeHandler={handleFieldChange}
            disabled={false}
          />
          <InputFieldWithLabel
            id="familymembers_diagnosedwithdiseases_Aids_or_any_details"
            label="Are you or any of your family members, been diagnosed with diseases such as Tuberculosis, Aids, or any form of cancer? If yes, give details"
            type="text"
            placeholder=""
            name="familymembers_diagnosedwithdiseases_Aids_or_any_details"
            value={fields.familymembers_diagnosedwithdiseases_Aids_or_any_details}
            onChangeHandler={handleFieldChange}
            disabled={false}
          />
          <InputFieldWithLabel
            id="convicted_or_chrged_with_criminal_offense"
            label="Have you ever been convicted or charged with a criminal offense? If yes, give details"
            type="text"
            placeholder=""
            name="convicted_or_chrged_with_criminal_offense"
            value={fields.convicted_or_chrged_with_criminal_offense}
            onChangeHandler={handleFieldChange}
            disabled={false}
          />
        </div>
      </div>
    </div>
  );
});

AdditionalInformationFields.displayName = 'AdditionalInformationFields';

export default AdditionalInformationFields;
