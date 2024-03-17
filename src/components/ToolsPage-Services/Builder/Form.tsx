/* eslint-disable max-len */

import React, { useState } from 'react';
import '../sop.module.css';
import { FormProps } from '@/app/services/apiService/ToolsAPI';
import { H2 } from '@/components/H2';

const Form: React.FC<FormProps> = ({ onFormSubmit, formFields }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const sections = formFields[0].builder;

  const initialFormData: Record<string, string> = {};
  if (formFields.length > 0) {
    sections.forEach((section) => {
      section.fields.forEach((field: { name: string }) => {
        initialFormData[field.name] = '';
      });
    });
  }

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onFormSubmit(formData);
  };

  const areRequiredFieldsFilled = () => {
    const currentSectionFields = sections[currentSection].fields;
    return currentSectionFields.every((field) => {return !field.required || formData[field.name].trim() !== '';});
  };

  const handlePreviousSection = () => {
    setCurrentSection(currentSection - 1);
  };

  const handleNextSection = () => {
    setCurrentSection(currentSection + 1);
  };

  return (
    <form className="flex shadow-hubspot-form-shadow border border-golden-yellow justify-between relative overflow-hidden bg-pale-sandal">
      <div className="p-4 lg:pl-[60px] w-full lg:w-[95%] py-12 lg:pb-16 lg:pr-0 sm:p-12">
        <H2>{sections[currentSection].title}</H2>
        {sections[currentSection].fields.map((field) => {
          if (field.type === 'dropdown' && field.options) {
            return (
              <div className="my-4" key={field.name}>
                <label className="text-lg font-medium leading-6 text-black" htmlFor={field.name}>
                  {field.label}
                  {field.required && <span className="pl-0 text-[#ff0000]">*</span>}
                </label>
                <select
                  className="w-full px-3 py-3 text-black font-normal text-base leading-6 border border-solid border-gray-300 bg-white"
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleInputChange}
                  required={field.required}
                >
                  {field.options.map((option) => {
                    return (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    );
                  })}
                </select>
              </div>
            );
          }
          return (
            <div className="my-4" key={field.name}>
              <label className="text-lg font-medium leading-6 text-black" htmlFor={field.name}>
                {field.label}
                {field.required && <span className="pl-0 text-[#ff0000]">*</span>}
              </label>
              <input
                className="w-full px-3 py-3 text-black font-normal text-base leading-6 border border-solid border-gray-300 bg-white"
                id={field.name}
                name={field.name}
                type={field.type}
                value={formData[field.name] || ''}
                onChange={handleInputChange}
                placeholder={field.placeholder}
                required={field.required}
              />
            </div>
          );
        })}
        <div className="flex justify-center">
          <div className="flex flex-row justify-between w-full mt-10">
            <button
              className={`bg-black text-white px-4 py-3.5 min-w-[100px] text-sm font-bold${currentSection === 0 ? ' opacity-50 cursor-not-allowed' : ''}`}
              type="button"
              onClick={handlePreviousSection}
              disabled={currentSection === 0}
            >
              Back
            </button>
            {currentSection !== sections.length - 1 && (
              <button
                className="bg-black text-white px-4 py-3.5 min-w-[100px] text-sm font-bold"
                type="button"
                onClick={handleNextSection}
                disabled={!areRequiredFieldsFilled()}
              >
                Next
              </button>
            )}
            {currentSection === sections.length - 1 && (
              <button
                className="bg-black text-white px-4 py-3.5 min-w-[100px] text-sm font-bold"
                type="submit"
                onClick={handleSubmit}
                disabled={!areRequiredFieldsFilled()}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
