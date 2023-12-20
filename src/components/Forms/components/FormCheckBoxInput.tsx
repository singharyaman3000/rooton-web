/* eslint-disable no-unused-vars */
import React, { ChangeEventHandler, useState } from 'react';
import { IFormFieldOptions } from './model';

type CheckboxPropType = {
  fields?: IFormFieldOptions[];
  values?: string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
  required?: boolean;
  id?: string;
};

export const FormCheckBoxInput: React.FC<CheckboxPropType> = (props) => {
  const { fields = [], values = [], onChange, placeholder = '', required = false, id = '' } = props;

  const [isError, setIsError] = useState(false);

  const handleBlur = () => {
    setIsError(required && values.length === 0);
  };

  const handleFocus = () => {
    setIsError(false);
  };

  const handleCheckboxChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const selectedValue = event.target.value;
    const updatedValues = event.target.checked
      ? [...values, selectedValue]
      : values.filter((value) => { return value !== selectedValue; });

    if (onChange) {
      onChange(updatedValues);
    }
  };

  return (
    <div className="flex flex-col">
      {fields.map((field) => {
        return (
          <div key={field.name} className="mb-5">
            <label
              className="text-lg font-medium leading-[1.67] text-black"
              placeholder={placeholder}
              htmlFor={field.name + id}
            >
              <span>{field.label}</span>
            </label>
            <ul className="inputs-list multi-container">
              {field.options.map((option) => {
                return (
                  <li key={option.id} className="hs-form-checkbox">
                    <label key={option.id} htmlFor={option.id + id} className="hs-form-checkbox-display text-lg">
                      <input
                        type="checkbox"
                        id={option.id + id}
                        name={field.name + id}
                        onChange={handleCheckboxChange}
                        required={required}
                        value={option.value}
                        onBlur={handleBlur}
                        checked={values.includes(option.value)}
                        className="hs-input"
                        onFocus={handleFocus}
                      />
                      <span>{option.value}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
            {isError && (
              <p className="hs-main-font-element hs-error-msg">Please select an option as this field is required.</p>
            )}
          </div>
        );
      })}
    </div>
  );
};
