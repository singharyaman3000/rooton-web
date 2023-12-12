import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { OptionType } from '../config/formConfig';

type PropsType = {
  options: OptionType[];
  value: string;
  label: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  required?: boolean;
  labelsize?: 'sm' | 'lg' | 'xl';
};

export const SponsorDropDown: React.FC<PropsType> = ({ options, value, onChange, label, required }) => {
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const condition = (required && value === '') || false;
    setIsError(condition);
  }, [value]);

  return (
    <div className=" mb-5">
      <div className="text-lg font-medium leading-[1.67] text-black">{label}</div>
      <select
        value={value}
        onChange={onChange}
        required={required}
        className="w-full text-black font-normal text-base leading-6 border bg-white p-3 border-solid border-[#ccccd3]"
      >
        <option disabled value="">
          I would like to sponsor my:
        </option>
        {options?.map((option) => {
          return (
            <option key={option.id} value={option.value}>
              {option.value}
            </option>
          );
        })}
      </select>
      <p className="text-red-500 text-sm mt-2" style={{ display: isError ? 'block' : 'none' }}>
        Please select an option.
      </p>
    </div>
  );
};
