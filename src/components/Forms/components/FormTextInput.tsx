import React, { useState } from 'react';
import { IFormField } from './model';

type PropType = {
  field: IFormField;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  type?: 'email' | 'phone';
  required?: boolean;
  autoComplete?: boolean;
  value: string;
  invalidFormat?: boolean;
};

export const FormTextInput: React.FC<PropType> = (props) => {
  const { field,
    onChange,
    value,
    type,
    placeholder = '',
    required = false,
    autoComplete = false,
    invalidFormat = false } = props;

  const [isError, setIsError] = useState(false);

  const handleBlur = () => {
    setIsError(required && value === '');
  };

  const handleFocus = () => {
    setIsError(false);
  };

  return (
    <div className="hs-form-field">
      <div className='flex flex-row'>
        <label className="hs-main-font-element" placeholder={placeholder} htmlFor={field.name}>
          {field.label}
        </label>
        {required && <span className="hs-form-required">*</span>}
      </div>
      <input
        id={field.name}
        value={value}
        type="text"
        onChange={onChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder={placeholder}
        autoComplete={autoComplete ? 'on' : 'off'}
        name={field.name}
        required={required}
      />
      {required && isError && <p className="hs-main-font-element hs-error-msg">Please complete this required field.</p>}
      {type === 'email' && invalidFormat && (
        <p className="hs-main-font-element hs-error-msg">Email must be formatted correctly.</p>
      )}
      {type === 'phone' && invalidFormat && (
        <p className="hs-main-font-element hs-error-msg">
          The number you entered is not in range or must contain only numbers.
        </p>
      )}
    </div>
  );
};
