import React, { ChangeEventHandler, useState } from 'react';
import { IFormFieldOptions } from './model';

type PropType = {
  fields?: IFormFieldOptions[];
  values?: string[];
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
  id?: string
};

export const FormCheckBoxInput: React.FC<PropType> = (props) => {
  const { fields = [], values = [], onChange, placeholder = '', required = false, id = '' } = props;

  const [isError, setIsError] = useState(false);

  const handleBlur = () => {
    setIsError(required && values.length === 0);
  };

  const handleFocus = () => {
    setIsError(false);
  };

  const concatenatedValues = values.join(',');

  return (
    <div className="flex flex-col">
      {fields.map((field) => {
        return (
          <div key={field.name} className=" mb-5">
            <input type="text" value={concatenatedValues} className="hidden" />
            <label
              className="text-lg font-medium leading-[1.67] text-black"
              placeholder={placeholder}
              htmlFor={field.name}
            >
              <span>{field.label}</span>
            </label>
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
                        checked={values.includes(option.value)}
                        className='hs-input'
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