import React, { ChangeEventHandler, useState } from 'react';
import { OptionType } from './model';

type PropsType = {
  options: OptionType[] | string[] | undefined;
  value: string;
  label: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  required?: boolean;
  id?: string;
  className?: string;
  name?: string;
};

export const FormDropdown: React.FC<PropsType> = ({
  options,
  value,
  onChange,
  label,
  required = false,
  className = '',
  name,
}) => {
  const [isError, setIsError] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleBlur = () => {
    setIsError(required && !inputValue);
  };

  const handleFocus = () => {
    setIsError(false);
  };

  return (
    <div className="hs-form-field">
      <div className="flex flex-row">
        <div className="hs-main-font-element">
          {label} {required && <span className="hs-form-required text-[#ff0000]">*</span>}
        </div>
      </div>
      <select
        value={inputValue}
        onChange={
          ((e) => {
            onChange?.(e);
            return setInputValue(e.target.value);
          })
        }
        onBlur={handleBlur}
        onFocus={handleFocus}
        required={required}
        name={name}
        className={className}
      >
        <option disabled value="">
          Please Select
        </option>
        {options?.map((option, index) => {
          if (typeof option === 'string') {
            return (
              <option key={option + index.toString()} value={option}>
                {option}
              </option>
            );
          }
          return (
            <option key={option.id} value={option.value}>
              {option.value}
            </option>
          );
        })}
      </select>
      {isError && (
        <p className="hs-main-font-element hs-error-msg text-[#ff0000]">
          Please select an option from the dropdown menu.
        </p>
      )}
    </div>
  );
};
