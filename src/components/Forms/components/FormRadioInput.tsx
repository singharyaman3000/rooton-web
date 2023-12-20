import React, { useState } from 'react';
import { IFormFieldOptions } from './model';

type PropType = {
  value?: string | number;
  fields: IFormFieldOptions[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
  id?: string;
};

export const FormRadioInput: React.FC<PropType> = (props) => {
  const { value, fields = [], onChange, placeholder = '', required = false, id = '' } = props;

  const [isError, setIsError] = useState(false);

  const handleBlur = () => {
    setIsError(required && !value);
  };

  const handleFocus = () => {
    setIsError(false);
  };

  return (
    <div className="flex flex-col">
      {fields.map((field) => {
        return (
          <div key={field.name} className="hs-form-field">
            <div className="flex flex-row">
              <label className="hs-main-font-element"
                placeholder={placeholder}
                htmlFor={field.name}>
                {field.label}
                {required && <span className="hs-form-required">*</span>}
              </label>
            </div>
            <ul className='inputs-list multi-container'>
              {field?.options?.map((option) => {
                return (
                  <li key={option.id} className='hs-form-radio'>
                    <label key={option.id}
                      htmlFor={option.id + id}
                      className="hs-form-radio-display text-lg"
                    >
                      <input
                        type="radio"
                        id={option.id + id}
                        name={field.name + id}
                        onChange={onChange}
                        required={required}
                        value={option.value}
                        onBlur={handleBlur}
                        className='hs-input'
                        checked={value === option.value}
                        onFocus={handleFocus}
                      />
                      <span>{option.value}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
            {isError && (
              <p className="hs-main-font-element hs-error-msg">Please select an option as this field is required..</p>
            )}
          </div>
        );
      })}
    </div>
  );
};
