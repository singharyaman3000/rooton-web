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
          <div key={field.name} className="hs-form-field">
            <div className='flex flex-row'>
              <label
                className="hs-main-font-element"
                placeholder={placeholder}
                htmlFor={field.name}
              >
                {field.label}
              </label>
              {required && <span className="hs-form-required">*</span>}
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
            {isError && <p className="hs-main-font-element hs-error-msg">
              Please select an option as this field is required..
            </p>}
          </div>
        );
      })}
    </div>
  );
};
