/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import React, { useState, forwardRef, useEffect } from 'react';
import style from '../ProfilePage.module.css';
import { useHeaderData } from '@/hooks/HeaderDataProvider';
import { booleanOptions, countriesOptions, genderOptions, maritalStatusOptions } from '../profileStaticVars';

type PersonalInformationFieldsFieldsProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  options?: string[];
  name: string;
  onChange: (id: string, value: string) => void;
  value: string;
  disabled?: boolean;
};

const InputFieldWithLabel = ({
  id,
  label,
  type,
  placeholder,
  onChange,
  value,
  disabled = false,
}: PersonalInformationFieldsFieldsProps) => {
  const fieldStyle = `border-2 border-gray-300 focus:outline-none hover:border-2 hover:border-gray-500 p-3 rounded bg-white text-black w-full text-sm ${
    disabled
      ? 'bg-gray-300 cursor-not-allowed focus:outline-none border-2 border-gray-300 hover:border-2 hover:border-gray-300 '
      : ''
  }`;
  const labelStyle = 'block text-sm text-gray-700 font-bold mb-2';
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(id, e.target.value);
  };

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
        value={value}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
};

const TextAreaWithLabel = ({ id, label, placeholder, onChange, value }: PersonalInformationFieldsFieldsProps) => {
  const fieldStyle =
    'border-2 border-gray-300 focus:outline-none hover:border-2 hover:border-gray-500 p-3 rounded bg-white text-black w-full text-sm';
  const labelStyle = 'block text-sm text-gray-700 font-bold mb-2';

  return (
    <div>
      <label htmlFor={id} className={labelStyle}>
        {label}
      </label>
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        className={`${fieldStyle} h-12`}
        onChange={(e) => {
          return onChange(id, e.target.value);
        }}
      />
    </div>
  );
};

const SelectFieldWithLabel = ({ id, label, options, onChange, value }: PersonalInformationFieldsFieldsProps) => {
  const fieldStyle =
    'border-2 border-gray-300 focus:outline-none hover:border-2 hover:border-gray-500 p-3 rounded bg-white text-black w-full text-sm';
  const labelStyle = 'block text-sm text-gray-700 font-bold mb-2';

  return (
    <div>
      <label htmlFor={id} className={labelStyle}>
        {label}
      </label>
      <select
        id={id}
        className={fieldStyle}
        value={value}
        onChange={(e) => {
          return onChange(id, e.target.value);
        }}
        name={id}
      >
        <option value="">Select Option</option>
        {options?.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

type FieldsProps = {
  onChange: (id: string, value: string) => void;
  profileData: any;
  value: any
};

// eslint-disable-next-line react/display-name
export const PersonalInformationFields = forwardRef<HTMLDivElement, FieldsProps>(({ onChange, profileData }, ref) => {
  const { logo_name, email } = useHeaderData();
  const emailValue = email || '';
  const nameParts = logo_name ? logo_name.split(' ') : ['', ''];
  const firstName = nameParts[0];
  const Lastname = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
  const initialSameCountryOrTerritory = profileData.currentCountry_or_territoryofResidence !== 'No';
  const [isSameCountryOrTerritory, setIsSameCountryOrTerritory] = useState(initialSameCountryOrTerritory);
  const [fields, setFields] = useState({
    Firstname: profileData.Firstname || firstName,
    Lastname: profileData.Lastname || Lastname,
    Phone: profileData.Phone || '',
    dob: profileData.dob || '',
    gender: profileData.gender || '',
    email: profileData.email || emailValue,
    maritalStatus: profileData.maritalStatus || '',
    countryOfCitizenship: profileData.countryOfCitizenship || '',
    currentCountry_or_territoryofResidence: profileData.currentCountry_or_territoryofResidence || '',
    countryorterritory: profileData.countryorterritory || '',
    countryorterritory_status: profileData.countryorterritory_status || '',
    countryorterritory_startDate: profileData.countryorterritory_startDate || '',
    countryorterritory_endDate: profileData.countryorterritory_endDate || '',
    countryorterritory_other: profileData.countryorterritory_other || '',
  });

  useEffect(() => {
    setFields({
      Firstname: profileData.Firstname || firstName,
      Lastname: profileData.Lastname || Lastname,
      Phone: profileData.Phone || '',
      dob: profileData.dob || '',
      gender: profileData.gender || '',
      email: profileData.email || emailValue,
      maritalStatus: profileData.maritalStatus || '',
      countryOfCitizenship: profileData.countryOfCitizenship || '',
      currentCountry_or_territoryofResidence: profileData.currentCountry_or_territoryofResidence || '',
      countryorterritory: profileData.countryorterritory || '',
      countryorterritory_status: profileData.countryorterritory_status || '',
      countryorterritory_startDate: profileData.countryorterritory_startDate || '',
      countryorterritory_endDate: profileData.countryorterritory_endDate || '',
      countryorterritory_other: profileData.countryorterritory_other || '',
    });
    setIsSameCountryOrTerritory(profileData.currentCountry_or_territoryofResidence !== 'No');
  }, [Lastname, emailValue, firstName, profileData]); // This effect should run whenever profileData changes.

  // Inside PersonalInformationFields
  const handleFieldChange = (id: string, value: string) => {
    const updatedFields = { ...fields, [id]: value };
    setFields(updatedFields);
    onChange(id, value); // This should call the method passed from the parent.
  };

  const handleVisaRefusalChange = (fieldName: string, fieldValue: any) => {
    setIsSameCountryOrTerritory(fieldValue !== 'No');
    setFields((prevFields) => {
      return {
        ...prevFields,
        [fieldName]: fieldValue,
      };
    });
    onChange(fieldName, fieldValue); // This should notify the parent component about the change.
  };

  const renderAdditionalFields = () => {
    if (!isSameCountryOrTerritory) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-9 mt-4">
          {/* Example fields, adjust as needed */}
          <InputFieldWithLabel
            id="countryorterritory"
            label="Country or Territory"
            placeholder="Enter country or territory"
            onChange={(id: string, value: string) => {
              return handleFieldChange(id, value);
            }}
            value={fields.countryorterritory}
            name="countryorterritory"
          />
          <InputFieldWithLabel
            id="countryorterritory_status"
            label="Status"
            placeholder="Enter Status"
            onChange={(id: string, value: string) => {
              return handleFieldChange(id, value);
            }}
            value={fields.countryorterritory_status}
            name="countryorterritory_status"
          />
          <InputFieldWithLabel
            id="countryorterritory_startDate"
            label="Start Date"
            type="date"
            placeholder="Date of Refusal"
            onChange={(id: string, value: string) => {
              return handleFieldChange(id, value);
            }}
            value={fields.countryorterritory_startDate}
            name="countryorterritory_startDate"
          />
          <InputFieldWithLabel
            id="countryorterritory_endDate"
            label="End Date"
            type="date"
            placeholder="Date of Refusal"
            onChange={(id: string, value: string) => {
              return handleFieldChange(id, value);
            }}
            value={fields.countryorterritory_endDate}
            name="countryorterritory_endDate"
          />
          <div className="md:col-span-2 lg:col-span-2">
            <TextAreaWithLabel
              id="countryorterritory_other"
              label="Other"
              placeholder=""
              onChange={(id: string, value: string) => {
                return handleFieldChange(id, value);
              }}
              value={fields.countryorterritory_other}
              name="countryorterritory_other"
            />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div ref={ref}>
      <div className={`${style.mainContent} pl-5 pr-5 pb-5 rounded`}>
        <div className="text-black position-relative font-bold text-lg mt-11 mb-4">Personal Information</div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-9 mt-4 pb-4 ">
          <InputFieldWithLabel
            id="Firstname"
            label="Given Name"
            type="text"
            placeholder="Given Name"
            name="Firstname"
            value={fields.Firstname}
            onChange={(id: string, value: string) => {
              return handleFieldChange(id, value);
            }}
            disabled
          />
          <InputFieldWithLabel
            id="Lastname"
            label="Last Name"
            type="text"
            placeholder="Last Name"
            name="Lastname"
            value={fields.Lastname}
            onChange={(id: string, value: string) => {
              return handleFieldChange(id, value);
            }}
            disabled
          />
          <InputFieldWithLabel
            id="email"
            label="Email Address"
            type="email"
            placeholder="Email Address"
            name="email"
            value={fields.email}
            onChange={(id: string, value: string) => {
              return handleFieldChange(id, value);
            }}
            disabled
          />
          <InputFieldWithLabel
            id="dob"
            label="Date of Birth"
            type="date"
            placeholder={''}
            name="dob"
            value={fields.dob}
            onChange={(id: string, value: string) => {
              return handleFieldChange(id, value);
            }}
            disabled={false}
          />
          <InputFieldWithLabel
            id="Phone"
            label="Phone Number"
            type="number"
            placeholder="Phone Number"
            onChange={(id: string, value: string) => {
              return handleFieldChange(id, value);
            }}
            options={[]}
            name="Phone"
            value={fields.Phone}
            disabled={false}
          />

          <SelectFieldWithLabel
            onChange={(id: string, value: string) => {
              return handleFieldChange(id, value);
            }}
            id="countryOfCitizenship"
            label="Country of Citizenship"
            options={countriesOptions}
            placeholder={''}
            name="countryOfCitizenship"
            value={fields.countryOfCitizenship}
            disabled={false}
          />
          <SelectFieldWithLabel
            onChange={(id: string, value: string) => {
              return handleFieldChange(id, value);
            }}
            id="maritalStatus"
            label="Marital Status"
            options={maritalStatusOptions}
            placeholder={''}
            name="maritalStatus"
            value={fields.maritalStatus}
            disabled={false}
          />
          <SelectFieldWithLabel
            onChange={(id: string, value: string) => {
              return handleFieldChange(id, value);
            }}
            id="gender"
            label="Gender"
            options={genderOptions}
            placeholder={''}
            name="gender"
            value={fields.gender}
            disabled={false}
          />
        </div>
        <div className="text-black position-relative font-bold text-lg mt-8 mb-4">
          Country or territory where applying:{' '}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-9 mt-4">
          <SelectFieldWithLabel
            onChange={(id: string, value: string) => {
              return handleVisaRefusalChange(id, value);
            }}
            placeholder={''}
            id="currentCountry_or_territoryofResidence"
            label="Same as current country or territory of residence?"
            options={booleanOptions}
            value={fields.currentCountry_or_territoryofResidence}
            name="currentCountry_or_territoryofResidence"
          />
        </div>
        {renderAdditionalFields()}
      </div>
    </div>
  );
});
