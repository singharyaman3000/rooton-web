/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import React, { useState, forwardRef, useEffect } from 'react';
import style from '../ProfilePage.module.css';
import { useHeaderData } from '@/hooks/HeaderDataProvider';
import { countriesOptions, genderOptions } from '../profileStaticVars';

type PersonalInformationFieldsFieldsProps = {
  id?: string;
  label: string;
  type?: string;
  placeholder?: string;
  name: string;
  options?: string[] | undefined;
  onChange: (id: string, value: string) => void;
  value?: string;
  disabled?: boolean;
};

type SelectedFieldsFieldsProps = {
  id?: string;
  label: string;
  type?: string;
  placeholder?: string;
  name: string;
  options: string[];
  onChange: (id: any, value: string) => void;
  value?: string;
  disabled?: boolean;
};

type RedioFieldsProps = {
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string,) => void;
  id: string;
  placeholder: string;
  label: string;
  options: string[];
  name: string;
};

const InputFieldWithLabel = ({
  id,
  label,
  type = 'text',
  placeholder,
  onChange,
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
          if (id) {
            return onChange(id, e.target.value);
          }
        }}
        value={value}
        disabled={disabled}
      />
    </div>
  );
};

const SelectFieldWithLabel = ({ id, label, options, onChange, value }: SelectedFieldsFieldsProps) => {
  const fieldStyle =
    'border-2 border-gray-300 focus:outline-none hover:border-2 hover:border-gray-500 p-3 rounded bg-white text-black w-full text-sm';
  const labelStyle = 'block text-sm text-gray-700 font-bold mb-2';

  const handleSelectChange = (e: { target: { value: string; }; }) => {
    onChange(id, e.target.value);
  };

  return (
    <div>
      <label htmlFor={id} className={labelStyle}>
        {label}
      </label>
      <select id={id} className={fieldStyle} value={value} onChange={handleSelectChange}>
        <option value="">Select Option</option>
        {options.map((option) => {return (
          <option key={option} value={option}>
            {option}
          </option>
        );})}
      </select>
    </div>
  );
};

type FieldsProps = {
  onChange: (fields: any) => void;
  value?: any;
  maritalStatus: any;
  spouseData: any;
};

// eslint-disable-next-line react/display-name
export const SpouseFields = forwardRef<HTMLDivElement, FieldsProps>(({ onChange, maritalStatus, spouseData }, ref) => {
  const [fields, setFields] = useState(spouseData || {
    givenName: '',
    lastName: '',
    phone: '',
    dob: '',
    email: '',
    marriagedate: '',
    relationship: '',
    countryOfcitizenship: '',
    countryOfResidence: '',
    gender: '',
  });

  useEffect(() => {
    setFields({
      givenName: spouseData?.givenName || '',
      lastName: spouseData?.lastName || '',
      phone: spouseData?.phone || '',
      dob: spouseData?.dob || '',
      email: spouseData?.email || '',
      marriagedate: spouseData?.marriagedate || '',
      relationship: spouseData?.relationship || '',
      countryOfcitizenship: spouseData?.countryOfcitizenship || '',
      countryOfResidence: spouseData?.countryOfResidence || '',
      gender: spouseData?.gender || '',
    });
  }, [spouseData]);

  const handleFieldChange = (fieldName: string, fieldValue: any) => {
    const updatedFields = { ...fields, [fieldName]: fieldValue };
    setFields(updatedFields);
    onChange(updatedFields);
  };

  return (
    <div ref={ref}>
      <div className={`${style.mainContent} pl-5 pr-5 pb-5 rounded`}>
        <div className="text-black position-relative font-bold text-lg mt-11 mb-4">Spouse</div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-9 mt-4">
          <InputFieldWithLabel
            id="givenName"
            label="Given Name"
            type="text"
            placeholder="Given Name"
            name="givenName"
            value={fields.givenName}
            onChange={handleFieldChange}
            disabled={false}
          />
          <InputFieldWithLabel
            id="lastName"
            label="Last Name"
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={fields.lastName}
            onChange={handleFieldChange}
            disabled={false}
          />
          <InputFieldWithLabel
            id="email"
            label="Email Address"
            type="email"
            placeholder="Email Address"
            name="email"
            value={fields.email}
            onChange={handleFieldChange}
            disabled={false}
          />
          <InputFieldWithLabel
            id="phone"
            label="Phone Number"
            type="number"
            placeholder="Phone Number"
            name="email"
            value={fields.phone}
            onChange={handleFieldChange}
            disabled={false}
          />
          <SelectFieldWithLabel
            onChange={handleFieldChange}
            id="countryOfcitizenship"
            label="Country of Citizenship"
            options={countriesOptions}
            name="countryOfcitizenship"
            value={fields.countryOfcitizenship}
            disabled={false}
          />
          <SelectFieldWithLabel
            onChange={handleFieldChange}
            id="countryOfResidence"
            label="Country of Residence"
            options={countriesOptions}
            name="countryOfResidence"
            value={fields.countryOfResidence}
            disabled={false}
          />
          {maritalStatus === 'Married' && (
            <InputFieldWithLabel
              id="marriagedate"
              label="Marriage Date"
              type="date"
              placeholder="Given Name"
              name="marriagedate"
              value={fields.marriagedate}
              onChange={handleFieldChange}
              disabled={false}
            />
          )}
          {maritalStatus === 'Common-Law' && (
            <InputFieldWithLabel
              id="relationship"
              label="Relationship"
              type="text"
              placeholder="Enter your relationship with partner"
              name="relationship"
              value={fields.relationship}
              onChange={handleFieldChange}
              disabled={false}
            />
          )}
          <SelectFieldWithLabel
            onChange={handleFieldChange}
            id="gender"
            label="Gender"
            options={genderOptions}
            name="gender"
            value={fields.gender}
            disabled={false}
          />
        </div>
      </div>
    </div>
  );
});
