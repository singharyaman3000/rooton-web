import React, { useEffect, useState } from 'react';
import { IFormField } from '../config/formConfig';

type PropType = {
  field: IFormField;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  required?: boolean;
  autoComplete?: boolean;
  value: string;
};

export const FormTextArea: React.FC<PropType> = (props) => {
  const { field, onChange, placeholder = '', required = false, autoComplete = false, value } = props;

  const [isError, setIsError] = useState(false);
  useEffect(() => {
    setIsError(required && value === '');
  }, [value, required]);

  return (
    <div className="flex-col">
      <div key={field.name} className="mb-5">
        <label className="text-lg font-medium leading-[1.67] text-black" htmlFor={field.name}>
          {field.label}
        </label>
        <textarea
          id={field.name}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete ? 'on' : 'off'}
          name={field.name}
          className="w-full text-black font-normal text-base leading-6 border bg-white p-3 border-solid border-[#ccccd3] h-20 resize-y" // Adjusted height here
          required={required}
          value={value}
        />
        <p className="text-red-500 text-sm mt-2" style={{ display: isError ? 'block' : 'none' }}>
          Please fill out this field.
        </p>
      </div>
    </div>
  );
};

