/* eslint-disable no-unused-vars */
import React, { ChangeEventHandler, useState } from 'react';

export interface CheckboxProps {
  label: string;
  onChange: (value: 'Yes' | 'No') => void;
  id: string;
  value: string;
}

export const FormSingleCheckBoxInput: React.FC<CheckboxProps> = ({ label, onChange, id, value }) => {
  const handleCheckboxChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const isChecked = event.target.checked ? 'Yes' : 'No';
    onChange(isChecked);
  };

  return (
    <div className='pb-4 relative'>
      <label htmlFor={id}
        id='custom-single-checkbox'
        className="inline-flex items-baseline text-lg font-medium leading-[1.67] text-black">
        <input
          type="checkbox"
          id={id}
          checked={value === 'Yes'}
          onChange={handleCheckboxChange}
        />
        <span className={value === 'Yes' ? 'checked' : ''}>{label}</span>
      </label>
    </div>
  );
};