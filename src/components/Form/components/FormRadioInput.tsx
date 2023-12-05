import React, { useState } from 'react';
import { IFormFieldOptions } from '../config/formConfig';

type PropType = {
  value?: string | number;
  fields: IFormFieldOptions[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
};

export const FormRadioInput: React.FC<PropType> = (props) => {
  const { value, fields = [], onChange, placeholder = '', required = false } = props;

  const [isError, setIsError] = useState(false);

  const handleBlur = () => {
    setIsError(required && value === '');
  };

  const handleFocus = () => {
    setIsError(false);
  };

  return (
    <div className="flex flex-col">
      {fields.map((field) => {
        return (
          <div key={field.name} className=" mb-5">
            <div className='flex flex-row'>
              <label
                className="text-lg font-medium leading-[1.67] text-black"
                placeholder={placeholder}
                htmlFor={field.name}
              >
                {field.label}
              </label>
              <span style={{ display: required ? 'block' : 'none', color: 'red' }}>*</span>
            </div>
            {field?.options?.map((option) => {
              return (
                <div key={option.id} className="flex items-center gap-3 text-lg">
                  <input
                    type="radio"
                    id={option.id}
                    name={field.name}
                    onChange={onChange}
                    required={required}
                    value={option.value}
                    onBlur={handleBlur}
                    checked={value === option.value}
                    onFocus={handleFocus}
                    className="accent-[#000] w-5 h-5"
                  />
                  <label htmlFor={option.id}>{option.value}</label>
                </div>
              );
            })}
            <p className="text-red-500 text-sm mt-2" style={{ display: isError ? 'block' : 'none' }}>
              Please select an option as this field is required..
            </p>
          </div>
        );
      })}
    </div>
  );
};
