import React, { ChangeEventHandler, useState } from 'react';
import { OptionType } from './model';

type PropsType = {
  options: OptionType[] | undefined;
  value: string;
  label: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  required?: boolean;
  id?: string;
};

export const FormDropdown: React.FC<PropsType> = ({ options, value, onChange, label, required = false }) => {
  const [isError, setIsError] = useState(false);

  const handleBlur = () => {
    setIsError(required && !value);
  };

  const handleFocus = () => {
    setIsError(false);
  };

  return (
    <div className="hs-form-field">
      <div className="flex flex-row">
        <div className="hs-main-font-element">{label} {required && <span className="hs-form-required">*</span>}</div>
      </div>
      <select value={value} onChange={onChange} onBlur={handleBlur} onFocus={handleFocus} required={required}>
        <option disabled value="">
          Please Select
        </option>
        {options?.map((option) => {
          return (
            <option key={option.id} value={option.value}>
              {option.value}
            </option>
          );
        })}
      </select>
      {isError && <p className="hs-main-font-element hs-error-msg">Please select an option from the dropdown menu.</p>}
    </div>
  );
};
