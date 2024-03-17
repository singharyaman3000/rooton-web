/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import React, { useState, forwardRef, useEffect } from 'react';
import style from '../ProfilePage.module.css';
import { v4 as uuidv4 } from 'uuid';

type PersonalInformationFieldsFieldsProps = {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  name: string;
  onChange: (value: string, id: string, fieldName: string) => void;
  value: string;
};

type Experience = {
  id: string;
  [key: string]: any; // To handle dynamic field names
};

type FieldsProps = {
  onChange: (section: string, id: string, fieldName: string, value: any) => void;
  maritalStatus: string;
  profileData: any;
};

const InputFieldWithLabel = ({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  name,
}: PersonalInformationFieldsFieldsProps) => {
  const fieldStyle =
    'border-2 border-gray-300 focus:outline-none hover:border-2 hover:border-gray-500 p-3 rounded bg-white text-black w-full text-sm';
  const labelStyle = 'block text-sm text-gray-700 font-bold mb-2';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value, id, name);
  };

  return (
    <div>
      <label htmlFor={id} className={labelStyle}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className={fieldStyle}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

// eslint-disable-next-line react/display-name
export const EducationalInformationFields = forwardRef<HTMLDivElement, FieldsProps>(
  ({ onChange, maritalStatus, profileData }, ref) => {
    const initializeExperiences = (experiencedata: Experience[]) => {
      return experiencedata && experiencedata.length > 0
        ? experiencedata.map((data: Experience) => {
          return { ...data };
        })
        : [{ id: uuidv4() }];
    };

    const [experiences, setExperiences] = useState<Experience[]>(() => {
      return initializeExperiences(profileData.educationalExperiences);
    });
    const [spouseExperiences, setSpouseExperiences] = useState<Experience[]>(() => {
      return initializeExperiences(profileData.spouseEducationalExperiences);
    });

    useEffect(() => {
      setExperiences(initializeExperiences(profileData.educationalExperiences));
      setSpouseExperiences(initializeExperiences(profileData.spouseEducationalExperiences));
    }, [profileData.educationalExperiences, profileData.spouseEducationalExperiences]);

    const handleFieldChange = (value: any, id: string, fieldName: string, section: string) => {
      // Update the local state for UI rendering
      const updateFunction = section === 'user' ? setExperiences : setSpouseExperiences;
      updateFunction((prevExperiences) => {
        return prevExperiences.map((exp) => {
          return exp.id === id ? { ...exp, [fieldName]: value } : exp;
        });
      });

      // Propagate the change up to inform the parent component
      onChange(section, id, fieldName, value);
    };

    const addExperience = (section: string) => {
      const newExperience = { id: uuidv4() };
      const updateFunction = section === 'user' ? setExperiences : setSpouseExperiences;
      const currentExperiences = section === 'user' ? experiences : spouseExperiences;

      updateFunction([...currentExperiences, newExperience]);
    };

    const removeExperience = (id: string, section: string) => {
      const updateFunction = section === 'user' ? setExperiences : setSpouseExperiences;
      const currentExperiences = section === 'user' ? experiences : spouseExperiences;

      updateFunction(
        currentExperiences.filter((exp) => {
          return exp.id !== id;
        }),
      );
      onChange(`${section}Remove`, id, 'remove', null);
    };

    return (
      <div ref={ref}>
        <div>
          {experiences.map((experience, index) => {
            return (
              <div className={`${style.mainContent}`} key={experience.id}>
                <div
                  key={experience.id}
                  className={`pl-5 pr-5 pb-8 mr-1 border-2 border-gray-300 p-4 ${
                    index !== 0 ? 'mt-[20px] mr-4' : 'mt-[47px] mr-4'
                  }`}
                >
                  {index !== 0 && (
                    <button
                      type="button"
                      className="relative flex float-right bg-[red] px-4 py-2 text-white"
                      onClick={() => {
                        return removeExperience(experience.id, 'user');
                      }}
                    >
                      X
                    </button>
                  )}
                  <div className="text-black position-relative font-bold text-lg mt-4 mb-4">Educational Experience</div>
                  <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-9 mt-4">
                    <InputFieldWithLabel
                      onChange={(value, id, name) => {
                        return handleFieldChange(value, experience.id, name, 'user');
                      }}
                      id={`${experience.id}-startdate`}
                      label="Start Date"
                      placeholder="Enter your Start date"
                      type="date"
                      name="startdate"
                      value={experience.startdate || ''}
                    />
                    <InputFieldWithLabel
                      onChange={(value, id, name) => {
                        return handleFieldChange(value, experience.id, name, 'user');
                      }}
                      id={`${experience.id}-end_date`}
                      label="End Date"
                      placeholder="Enter your End date"
                      type="date"
                      name="end_date"
                      value={experience.end_date || ''}
                    />
                    <InputFieldWithLabel
                      onChange={(value, id, name) => {
                        return handleFieldChange(value, experience.id, name, 'user');
                      }}
                      id={`${experience.id}-percentage`}
                      label="Percentage"
                      placeholder="Enter your Percentage"
                      type="number"
                      name="percentage"
                      value={experience.percentage || ''}
                    />
                    <InputFieldWithLabel
                      onChange={(value, id, name) => {
                        return handleFieldChange(value, experience.id, name, 'user');
                      }}
                      id={`${experience.id}-backlog`}
                      label="Backlogs"
                      placeholder="Number"
                      type="number"
                      name="backlog"
                      value={experience.backlog || ''}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-9 mt-4">
                    <InputFieldWithLabel
                      onChange={(value, id, name) => {
                        return handleFieldChange(value, experience.id, name, 'user');
                      }}
                      id={`${experience.id}-educationLevel`}
                      label="Education Level / Field of Study"
                      placeholder="e.g., Master's in Computer Science"
                      type="text"
                      name="educationLevel"
                      value={experience.educationLevel || ''}
                    />
                    <InputFieldWithLabel
                      onChange={(value, id, name) => {
                        return handleFieldChange(value, experience.id, name, 'user');
                      }}
                      id={`${experience.id}-institutionName`}
                      label="Institution Name"
                      placeholder="Enter your institution's name"
                      type="text"
                      name="institutionName"
                      value={experience.institutionName || ''}
                    />
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex justify-end pr-5 mt-[1px]">
            <button
              type="button"
              className="bg-[#000] text-white py-3 px-6 w-[11rem] min-w-[11rem] max-w-[11rem]"
              onClick={() => {
                return addExperience('user');
              }}
            >
              Add More
            </button>
          </div>
        </div>
        {maritalStatus === 'Married' && (
          <div>
            {spouseExperiences.map((experience, index) => {
              return (
                <div key={experience.id} className={`${style.mainContent}`}>
                  <div
                    className={`pl-5 pr-5 pb-8 mr-1 border-2 border-gray-300 p-4 ${
                      index !== 0 ? 'mt-[20px] mr-4' : 'mt-[47px] mr-4'
                    }`}
                  >
                    {index !== 0 && (
                      <button
                        type="button"
                        className="relative flex float-right bg-[red] px-4 py-2 text-white"
                        onClick={() => {
                          return removeExperience(experience.id, 'spouse');
                        }}
                      >
                        X
                      </button>
                    )}
                    <div className="text-black position-relative font-bold text-lg mt-4 mb-4">
                      Spouse&apos;s Educational Experience
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-9 mt-4">
                      <InputFieldWithLabel
                        onChange={(value, id, name) => {
                          return handleFieldChange(value, experience.id, name, 'spouse');
                        }}
                        id={`${experience.id}-spousestartdate`}
                        label="Start Date"
                        placeholder="Enter your Start date"
                        type="date"
                        name="spousestartdate"
                        value={experience.spousestartdate || ''}
                      />
                      <InputFieldWithLabel
                        onChange={(value, id, name) => {
                          return handleFieldChange(value, experience.id, name, 'spouse');
                        }}
                        id={`${experience.id}-spouseEnd_date`}
                        label="End Date"
                        placeholder="Enter your End date"
                        type="date"
                        name="spouseEnd_date"
                        value={experience.spouseEnd_date || ''}
                      />
                      <InputFieldWithLabel
                        onChange={(value, id, name) => {
                          return handleFieldChange(value, experience.id, name, 'spouse');
                        }}
                        id={`${experience.id}-spousePercentage`}
                        label="Percentage"
                        placeholder="Enter your Percentage"
                        type="number"
                        name="spousePercentage"
                        value={experience.spousePercentage || ''}
                      />
                      <InputFieldWithLabel
                        onChange={(value, id, name) => {
                          return handleFieldChange(value, experience.id, name, 'spouse');
                        }}
                        id={`${experience.id}-spouseBacklog`}
                        label="Backlogs"
                        placeholder="Number"
                        type="number"
                        name="spouseBacklog"
                        value={experience.spouseBacklog || ''}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-9 mt-4">
                      <InputFieldWithLabel
                        onChange={(value, id, name) => {
                          return handleFieldChange(value, experience.id, name, 'spouse');
                        }}
                        id={`${experience.id}-spouseEducationLevel`}
                        label="Education Level / Field of Study"
                        placeholder="e.g., Master's in Computer Science"
                        type="text"
                        name="spouseEducationLevel"
                        value={experience.spouseEducationLevel || ''}
                      />
                      <InputFieldWithLabel
                        onChange={(value, id, name) => {
                          return handleFieldChange(value, experience.id, name, 'spouse');
                        }}
                        id={`${experience.id}-spouseInstitutionName`}
                        label="Institution Name"
                        placeholder="Enter your institution's name"
                        type="text"
                        name="spouseInstitutionName"
                        value={experience.spouseInstitutionName || ''}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="flex justify-end pr-5 mt-[1px]">
              <button
                type="button"
                className="bg-[#000] text-white py-3 px-6 w-[11rem] min-w-[11rem] max-w-[11rem]"
                onClick={() => {
                  return addExperience('spouse');
                }}
              >
                Add More
              </button>
            </div>
          </div>
        )}
      </div>
    );
  },
);
