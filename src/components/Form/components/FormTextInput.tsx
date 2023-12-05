import React, { useEffect, useState } from 'react';
import { IFormField } from '../config/formConfig';

type PropType = {
  field: IFormField;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  type?: 'text' | 'submit' | 'password' | 'email' | 'number' | 'file';
  required?: boolean;
  autoComplete?: boolean;
  value: string;
};

export const FormTextInput: React.FC<PropType> = (props) => {
  const { field, onChange, type = 'text', placeholder = '', required = false, autoComplete = false, value } = props;

  const [isError, setIsError] = useState(false);
  useEffect(() => {
    setIsError(required && value === '');
  }, [value]);

  return (
    <div className="flex-col">
      <div key={field.name} className="mb-5">
        <div className='flex flex-row'>
          <label className="text-lg font-medium leading-[1.67] text-black" placeholder={placeholder} htmlFor={field.name}>
            {field.label}
          </label>
          <span style={{ display: required ? 'block' : 'none', color: 'red' }}>*</span>
        </div>
        <input
          id={field.name}
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete ? 'on' : 'off'}
          name={field.name}
          className="w-full text-black font-normal text-base leading-6 border bg-white p-3 border-solid border-[#ccccd3]"
          required={required}
        />
        <p className="text-red-500 text-sm mt-2" style={{ display: isError ? 'block' : 'none' }}>
          Please complete this required field.
        </p>
      </div>
    </div>
  );
};
