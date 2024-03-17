/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import React, { useState, forwardRef, useEffect } from 'react';
import style from '../ProfilePage.module.css';
import { v4 as uuidv4 } from 'uuid';
import { countriesOptions } from '../profileStaticVars';

type ExperienceFieldProps = {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  onChange: (value: string, id: string, fieldName: string) => void;
  value?: string;
  name: string;
  options?: string[];
};

const InputFieldWithLabel = ({
  id,
  label,
  type = 'text',
  placeholder,
  onChange,
  value,
  name,
}: ExperienceFieldProps) => {
  const fieldStyle = 'border-2 border-gray-300 focus:outline-none hover:border-2 hover:border-gray-500 p-3 rounded bg-white text-black w-full text-sm';
  const labelStyle = 'block text-sm text-gray-700 font-bold mb-2';

  return (
    <div>
      <label htmlFor={id} className={labelStyle}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => { return onChange(e.target.value, id, name); }}
        className={fieldStyle}
      />
    </div>
  );
};

const SelectFieldWithLabel = ({
  id,
  label,
  options,
  onChange,
  value,
  name,
}: ExperienceFieldProps) => {
  const fieldStyle = 'border-2 border-gray-300 focus:outline-none hover:border-2 hover:border-gray-500 p-3 rounded bg-white text-black w-full text-sm';
  const labelStyle = 'block text-sm text-gray-700 font-bold mb-2';

  return (
    <div>
      <label htmlFor={id} className={labelStyle}>{label}</label>
      <select
        id={id}
        name={name}
        className={fieldStyle}
        value={value}
        onChange={(e) => { return onChange(e.target.value, id, name); }}
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
  onChange: (section: string, id: string, fieldName: string, value: any) => void;
  maritalStatus: string;
  profileData: any;
};

type Experience = {
  id: string;
  [key: string]: any;
};

// eslint-disable-next-line react/display-name
export const WorkExperienceFields = forwardRef<HTMLDivElement, FieldsProps>(
  ({ onChange, maritalStatus, profileData }, ref) => {

    const initializeExperiences = (data: any[]) => {
      return data && data.length > 0 ? data.map((item) => { return { ...item }; }) : [{ id: uuidv4() }];
    };

    const [experiences, setExperiences] = useState<Experience[]>(() => { return initializeExperiences(profileData.workExperiences); },
    );
    const [spouseExperiences, setSpouseExperiences] = useState<Experience[]>(() => { return initializeExperiences(profileData.spouseWorkExperiences); },
    );

    useEffect(() => {
      setExperiences(initializeExperiences(profileData.workExperiences));
      setSpouseExperiences(initializeExperiences(profileData.spouseWorkExperiences));
    }, [profileData.workExperiences, profileData.spouseWorkExperiences]);

    const handleExperienceChange = (value: string, id: string, fieldName: string, isSpouse: boolean = false) => {
      const updateFunction = isSpouse ? setSpouseExperiences : setExperiences;
      updateFunction((prev) => { return prev.map((exp) => { return exp.id === id ? { ...exp, [fieldName]: value } : exp; }); });

      onChange(isSpouse ? 'spouseWork' : 'work', id, fieldName, value);
    };

    const addExperience = (isSpouse: boolean) => {
      const newExperience = { id: uuidv4() };
      const updateFunction = isSpouse ? setSpouseExperiences : setExperiences;
      updateFunction((prev) => { return [...prev, newExperience]; });
    };

    const removeExperience = (id: string, isSpouse: boolean) => {
      const updateFunction = isSpouse ? setSpouseExperiences : setExperiences;
      updateFunction((prev) => { return prev.filter((exp) => { return exp.id !== id; }); });

      onChange(isSpouse ? 'spouseWorkRemove' : 'workRemove', id, 'remove', null);
    };

    return (
      <div ref={ref}>
        <div>
          {experiences.map((experience, index) => {
            return (
              <div key={experience.id} className={`${style.mainContent}`}>
                <div className={`pl-5 pr-5 pb-8 mr-1 border-2 border-gray-300 p-4 ${index !== 0 ? 'mt-[20px] mr-4' : 'mt-[47px] mr-4'}`}>
                  {index !== 0 && (
                    <button type="button" className="relative flex float-right bg-[red] px-4 py-2 text-white" onClick={() => { return removeExperience(experience.id, false); }}>
                      X
                    </button>
                  )}
                  <div className="text-black position-relative font-bold text-lg mt-4 mb-4">Work Experience</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-9 mt-4">
                    <InputFieldWithLabel
                      onChange={(value, fieldId, fieldName) => { return handleExperienceChange(value, experience.id, fieldName, false); }}
                      id={`${experience.id}-employmentStartDate`}
                      label="Start Date"
                      type="date"
                      name="employmentStartDate"
                      value={experience.employmentStartDate || ''}
                    />
                    <InputFieldWithLabel
                      onChange={(value, fieldId, fieldName) => { return handleExperienceChange(value, experience.id, fieldName, false); }}
                      id={`${experience.id}-employmentEndDate`}
                      label="End Date"
                      type="date"
                      name="employmentEndDate"
                      value={experience.employmentEndDate || ''}
                    />
                    <SelectFieldWithLabel
                      onChange={(value, fieldId, fieldName) => { return handleExperienceChange(value, experience.id, fieldName, false); }}
                      id={`${experience.id}-country`}
                      label="Country"
                      options={countriesOptions}
                      name="country"
                      value={experience.country || ''}
                    />

                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-9 mt-4">
                    <InputFieldWithLabel
                      onChange={(value, fieldId, fieldName) => { return handleExperienceChange(value, experience.id, fieldName, false); }}
                      id={`${experience.id}-jobtitle`}
                      label="Job Title"
                      type="text"
                      name="jobtitle"
                      value={experience.jobtitle || ''}
                    />
                    <InputFieldWithLabel
                      onChange={(value, fieldId, fieldName) => { return handleExperienceChange(value, experience.id, fieldName, false); }}
                      id={`${experience.id}-companyName`}
                      label="Company Name"
                      type="text"
                      name="companyName"
                      value={experience.companyName || ''}
                    />
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex justify-end pr-5 mt-[1px]">
            <button type="button"
              className="bg-[#000] text-white py-3 px-6 w-[11rem] min-w-[11rem] max-w-[11rem]"
              onClick={() => { return addExperience(false); }}>Add Experience</button>
          </div>
        </div>
        {maritalStatus === 'Married' && (
          <div>
            {spouseExperiences.map((experience, index) => {
              return (
                <div key={experience.id} className={`${style.mainContent}`}>
                  <div className={`pl-5 pr-5 pb-8 mr-1 border-2 border-gray-300 p-4 ${index !== 0 ? 'mt-[20px] mr-4' : 'mt-[47px] mr-4'}`}>
                    {index !== 0 && (
                      <button type="button" className="relative flex float-right bg-[red] px-4 py-2 text-white" onClick={() => { return removeExperience(experience.id, true); }}>
                        X
                      </button>
                    )}
                    <div className="text-black position-relative font-bold text-lg mt-4 mb-4">Spouse Work Experience</div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-9 mt-4">
                      <InputFieldWithLabel
                        onChange={(value, fieldId, fieldName) => { return handleExperienceChange(value, experience.id, fieldName, true); }}
                        id={`${experience.id}-employmentStartDate`}
                        label="Start Date"
                        type="date"
                        name="employmentStartDate"
                        value={experience.employmentStartDate || ''}
                      />
                      <InputFieldWithLabel
                        onChange={(value, fieldId, fieldName) => { return handleExperienceChange(value, experience.id, fieldName, true); }}
                        id={`${experience.id}-employmentEndDate`}
                        label="End Date"
                        type="date"
                        name="employmentEndDate"
                        value={experience.employmentEndDate || ''}
                      />
                      <SelectFieldWithLabel
                        onChange={(value, fieldId, fieldName) => { return handleExperienceChange(value, experience.id, fieldName, true); }}
                        id={`${experience.id}-country`}
                        label="Country"
                        options={countriesOptions}
                        name="country"
                        value={experience.country || ''}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-9 mt-4">
                      <InputFieldWithLabel
                        onChange={(value, fieldId, fieldName) => { return handleExperienceChange(value, experience.id, fieldName, true); }}
                        id={`${experience.id}-jobtitle`}
                        label="Job Title"
                        type="text"
                        name="jobtitle"
                        value={experience.jobtitle || ''}
                      />
                      <InputFieldWithLabel
                        onChange={(value, fieldId, fieldName) => { return handleExperienceChange(value, experience.id, fieldName, true); }}
                        id={`${experience.id}-companyName`}
                        label="Company Name"
                        type="text"
                        name="companyName"
                        value={experience.companyName || ''}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="flex justify-end pr-5 mt-[1px]">
              <button type="button"
                className="bg-[#000] text-white py-3 px-6 w-[11rem] min-w-[11rem] max-w-[11rem]"
                onClick={() => { return addExperience(true); }}>Add Experience</button>
            </div>
          </div>
        )}
      </div>
    );
  });
