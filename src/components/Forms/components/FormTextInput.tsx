import React, { useState } from 'react';
import { IFormField } from './model';

type PropType = {
  field: IFormField;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  type?: 'email' | 'phone' | 'gst';
  required?: boolean;
  autoComplete?: boolean;
  value: string;
  invalidFormat?: boolean;
  className?: string;
  allUpperCase?: boolean;
  // eslint-disable-next-line no-unused-vars
  validationFn?: (inputValue: string) => boolean;
};

export const FormTextInput: React.FC<PropType> = (props) => {
  const {
    field,
    onChange,
    value,
    type,
    placeholder = '',
    className = '',
    required = false,
    autoComplete = false,
    invalidFormat = true,
    allUpperCase = false,
    validationFn,
  } = props;

  const [isError, setIsError] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleBlur = () => {
    setIsError(required && !inputValue.trim());
  };

  const handleFocus = () => {
    setIsError(false);
  };

  const showCustomError = () => {
    return !!value.length && invalidFormat;
  };

  return (
    <div className="hs-form-field">
      <div className="flex flex-row">
        <label className="hs-main-font-element" placeholder={placeholder} htmlFor={field.name}>
          {field.label}
          {required && <span className={'hs-form-required text-[#FF0000]'}>*</span>}
        </label>
      </div>
      <input
        id={field.name}
        value={inputValue}
        type="text"
        onChange={(e) => {
          onChange?.(e);
          return setInputValue(allUpperCase ? e.target.value.toUpperCase() : e.target.value);
        }}
        className={className}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder={placeholder}
        autoComplete={autoComplete ? 'on' : 'off'}
        name={field.name}
        required={required}
      />
      {required && isError && (
        <p className="hs-main-font-element hs-error-msg text-[#ff0000]">Please complete this required field.</p>
      )}
      {type === 'email' && showCustomError() && (
        <p className="hs-main-font-element hs-error-msg text-[#ff0000]">Email must be formatted correctly.</p>
      )}
      {type === 'email' && inputValue.length > 0 && validationFn && !validationFn(inputValue) && (
        <p className="hs-main-font-element hs-error-msg text-[#ff0000]">Please enter a valid email address.</p>
      )}
      {type === 'phone' && showCustomError() && (
        <p className="hs-main-font-element hs-error-msg text-[#ff0000]">
          Please enter a valid telephone number and ensure that it contains only numerical characters.
        </p>
      )}
      {type === 'gst' && inputValue.length > 0 && validationFn && !validationFn(inputValue) && (
        <p className="hs-main-font-element hs-error-msg text-[#ff0000]">Please enter a valid GST number.</p>
      )}
    </div>
  );
};
