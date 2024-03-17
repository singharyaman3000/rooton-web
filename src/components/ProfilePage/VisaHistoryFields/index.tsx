/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import style from '../ProfilePage.module.css';
import { countriesOptions } from '../profileStaticVars';

type InputFieldProps = {
  id: string;
  label: string;
  value?: string;
  type: string;
  placeholder: string;
  onChange: (event: any) => void;
};

type SelectFieldProps = {
  id: string;
  label: string;
  options: string[];
  value?: string;
  onChange: (event: any) => void;
};

const InputFieldWithLabel = ({ id, label, type = 'text', placeholder, value, onChange }: InputFieldProps) => {
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
        value={value || ''}
        onChange={onChange}
      />
    </div>
  );
};

const SelectFieldWithLabel = ({ id, label, options, value, onChange }: SelectFieldProps) => {
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

const VisaHistoryField = ({ onChange, experiencesData }: any) => {
  const defaultExperience = { id: uuidv4(), country: '', date: '', reason: '', refusal: 'No' };
  const [visaHistories, setVisaHistories] = useState<Array<any>>(() => { return experiencesData.length > 0 ? experiencesData : [defaultExperience]; });

  useEffect(() => {
    setVisaHistories(experiencesData.length > 0 ? experiencesData : [defaultExperience]);
  }, [experiencesData]);

  const handleVisaHistoryChange = (id: string, field: string, value: string) => {
    const updatedVisaHistories = visaHistories.map((history) => {
      if (history.id === id) {
        return { ...history, [field]: value };
      }
      return history;
    });
    setVisaHistories(updatedVisaHistories);
    onChange(updatedVisaHistories);
  };

  const addVisaHistory = () => {
    const newVisaHistory = { ...defaultExperience };
    const updatedVisaHistories = [...visaHistories, newVisaHistory];
    setVisaHistories(updatedVisaHistories);
    onChange(updatedVisaHistories);
  };

  const removeVisaHistory = (id: string) => {
    const updatedVisaHistories = visaHistories.filter((history) => { return history.id !== id; });
    setVisaHistories(updatedVisaHistories);
    onChange(updatedVisaHistories);
  };

  return (
    <div>
      {visaHistories.map((history, index) => {
        return (
          <div key={history.id} className={`${style.mainContent} ${index !== 0 ? 'mt-[20px]' : 'mt-[47px]'} pl-5 pr-5 pb-8 mr-1 border-2 border-gray-300 p-4 mr-4`}>
            {index !== 0 && (
              <button type="button" className="relative flex float-right bg-[red] px-4 py-2 text-white" onClick={() => { return removeVisaHistory(history.id); }}>
                x
              </button>
            )}
            <div className="text-black position-relative font-bold text-lg mt-4 mb-4">Visa History #{index + 1}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-9">
              <SelectFieldWithLabel
                id={`refusal-${history.id}`}
                label="Previous Visa Refusal"
                options={['Yes', 'No']}
                value={history.refusal}
                onChange={(e) => { return handleVisaHistoryChange(history.id, 'refusal', e.target.value); }}
              />
            </div>
            {history.refusal === 'Yes' && (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-9 mt-4">
                <SelectFieldWithLabel
                  id={`country-${history.id}`}
                  label="Country"
                  options={countriesOptions}
                  value={history.country}
                  onChange={(e) => { return handleVisaHistoryChange(history.id, 'country', e.target.value); }}
                />
                <InputFieldWithLabel
                  id={`date-${history.id}`}
                  label="Date of Refusal"
                  type="date"
                  placeholder=""
                  value={history.date}
                  onChange={(e) => { return handleVisaHistoryChange(history.id, 'date', e.target.value); }}
                />
                <InputFieldWithLabel
                  id={`reason-${history.id}`}
                  label="Type of Visa"
                  placeholder="Enter type of visa"
                  value={history.reason}
                  type='text'
                  onChange={(e) => { return handleVisaHistoryChange(history.id, 'reason', e.target.value); }}
                />
              </div>
            )}
          </div>
        );
      })}
      <div className="flex justify-end pr-5 mt-4">
        <button type="button" className="bg-[#000] text-white py-3 px-6" onClick={addVisaHistory}>
          Add Another Visa History
        </button>
      </div>
    </div>
  );
};

export default VisaHistoryField;
