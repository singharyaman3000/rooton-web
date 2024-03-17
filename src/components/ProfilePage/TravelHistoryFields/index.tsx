/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
/* eslint-disable max-len */
// Updated TravelHistoryFields component with API integration
import React, { useState, forwardRef, useEffect } from 'react';
import style from '../ProfilePage.module.css';
import { v4 as uuidv4 } from 'uuid';
import { countriesOptions } from '../profileStaticVars';
import { city } from '../profileCIty';

type Experience = {
  id: string;
  startDate: string;
  endDate: string;
  city: string;
  country: string;
  purpose: string;
};

type TravelHistoryFieldsProps = {
  travelHistories: Experience[];
  onTravelHistoryChange: (travelHistories: Experience[]) => void;
};

type PersonalInformationFieldsFieldsProps = {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange: (event: any) => void;
  options?: string[];
}

const InputFieldWithLabel = ({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
}: PersonalInformationFieldsFieldsProps) => {
  const fieldStyle = 'border-2 border-gray-300 focus:outline-none hover:border-2 hover:border-gray-500 p-3 rounded bg-white text-black w-full text-sm';
  const labelStyle = 'block text-sm text-gray-700 font-bold mb-2';

  return (
    <div>
      <label htmlFor={id} className={labelStyle}>{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={fieldStyle}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

type SelectFieldsFieldsProps = {
  id: string;
  label?: string;
  options: string[];
  value?: string;
  onChange: (event: any) => void;
}

const SelectFieldWithLabel = ({
  id,
  label,
  options,
  value,
  onChange,
}: SelectFieldsFieldsProps) => {
  const fieldStyle = 'border-2 border-gray-300 focus:outline-none hover:border-2 hover:border-gray-500 p-3 rounded bg-white text-black w-full text-sm';
  const labelStyle = 'block text-sm text-gray-700 font-bold mb-2';

  return (
    <div>
      <label htmlFor={id} className={labelStyle}>{label}</label>
      <select id={id} className={fieldStyle} value={value} onChange={onChange}>
        {options.map((option) => {
          return (
            <option key={option} value={option}>{option}</option>
          );
        })}
      </select>
    </div>
  );
};

export const TravelHistoryFields = forwardRef<HTMLDivElement, TravelHistoryFieldsProps>(
  ({ travelHistories, onTravelHistoryChange }, ref) => {

    const initializeTravelHistories = () => {
      return travelHistories.length > 0 ? travelHistories : [{
        id: uuidv4(),
        startDate: '',
        endDate: '',
        city: '',
        country: '',
        purpose: '',
      }];
    };

    // const countryOptions = city.map((item) => {return item.country;});

    const [localHistories, setLocalHistories] = useState<Experience[]>(initializeTravelHistories);

    useEffect(() => {
      setLocalHistories(initializeTravelHistories());
    }, [travelHistories]);

    const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
      const updatedHistories = [...localHistories];
      if (field === 'country') {
        // Reset the city when country changes
        updatedHistories[index].city = '';
      }
      updatedHistories[index][field] = value;
      setLocalHistories(updatedHistories);
      onTravelHistoryChange(updatedHistories);
    };

    const addExperience = () => {
      const newExperience = {
        id: uuidv4(),
        startDate: '',
        endDate: '',
        city: '',
        country: '',
        purpose: '',
      };
      const updatedHistories = [...localHistories, newExperience];
      setLocalHistories(updatedHistories);
      onTravelHistoryChange(updatedHistories);
    };

    const removeExperience = (index: number) => {
      const updatedHistories = [...localHistories];
      updatedHistories.splice(index, 1);
      setLocalHistories(updatedHistories);
      onTravelHistoryChange(updatedHistories);
    };

    const getCityOptions = (country: any) => {
      const countryData = city.find((item) => {return item.country === country;});
      return countryData ? countryData.cities : [];
    };

    return (
      <div ref={ref}>
        {localHistories.map((experience, index) => {
          const countryOptions = city.map((item) => {return item.country;});
          const cityOptions = getCityOptions(experience.country);
          return (
            <div key={experience.id} className={`${style.mainContent}`}>
              <div className={`pl-5 pr-5 pb-8 mr-1 border-2 border-gray-300 p-4 ${index !== 0 ? 'mt-[20px] mr-4' : 'mt-[47px] mr-4'}`}>
                {index !== 0 && (
                  <button
                    type="button"
                    className="relative flex float-right bg-[red] px-4 py-2 text-white"
                    onClick={() => { return removeExperience(index); }}
                  >
                    X
                  </button>
                )}
                <div className="text-black position-relative font-bold text-lg mt-4 mb-4">Travel History</div>
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-9 mt-4">
                  <InputFieldWithLabel
                    onChange={(e: { target: { value: string; }; }) => { return handleExperienceChange(index, 'startDate', e.target.value); }}
                    id={`startDate-${index}`}
                    label="Start Date"
                    type="date"
                    placeholder=""
                    value={experience.startDate}
                  />
                  <InputFieldWithLabel
                    onChange={(e: { target: { value: string; }; }) => { return handleExperienceChange(index, 'endDate', e.target.value); }}
                    id={`endDate-${index}`}
                    label="End Date"
                    type="date"
                    placeholder=""
                    value={experience.endDate}
                  />
                  <SelectFieldWithLabel
                    onChange={(e: { target: { value: string; }; }) => { return handleExperienceChange(index, 'country', e.target.value); }}
                    id={`country-${index}`}
                    label="Country"
                    options={countryOptions}
                    value={experience.country}
                  />
                  {/* <SelectFieldWithLabel
                    onChange={(e: { target: { value: string; }; }) => { return handleExperienceChange(index, 'city', e.target.value); }}
                    id={`city-${index}`}
                    label="City"
                    options={['USA', 'Canada', 'UK', 'Australia', 'India', 'France']}
                    value={experience.city}
                  /> */}
                  <SelectFieldWithLabel
                    onChange={(e) => {return handleExperienceChange(index, 'city', e.target.value);}}
                    id={`city-${index}`}
                    label="City"
                    options={cityOptions}
                    value={experience.city}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-9 mt-4">
                  <InputFieldWithLabel
                    onChange={(e: { target: { value: string; }; }) => { return handleExperienceChange(index, 'purpose', e.target.value); }}
                    id={`purpose-${index}`}
                    label="Purpose"
                    type="text"
                    placeholder="Enter your purpose"
                    value={experience.purpose}
                  />
                </div>
              </div>
            </div>
          );
        })}
        <div className="flex justify-end pr-5 mt-[1px]">
          <button type="button" className="bg-[#000] text-white py-3 px-6 w-[11rem] min-w-[11rem] max-w-[11rem]" onClick={addExperience}>
            Add More
          </button>
        </div>
      </div>
    );
  });
