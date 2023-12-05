import React, { useState } from 'react';
import { IFormField } from '../config/formConfig';

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
    <div className="mb-5">
      <div className='flex flex-row'>
        <label className="text-lg font-medium leading-[1.67] text-black" placeholder={placeholder} htmlFor={field.name}>
          {field.label}
        </label>
        {required && <span className='text-[red]'>*</span>}
      </div>
      <input
        id={field.name}
        type="text"
        onChange={onChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder={placeholder}
        autoComplete={autoComplete ? 'on' : 'off'}
        name={field.name}
        className="w-full text-black font-normal text-base leading-6 border bg-white p-3 border-solid border-[#ccccd3]"
        required={required}
      />
      {required && isError && <p className="text-red-500 text-sm mt-2">Please complete this required field.</p>}
      {type === 'email' && invalidFormat && (
        <p className="text-red-500 text-sm mt-2">Email must be formatted correctly.</p>
      )}
      {type === 'phone' && invalidFormat && (
        <p className="text-red-500 text-sm mt-2">
          The number you entered is not in range or must contain only numbers.
        </p>
      )}
    </div>
  );
};
