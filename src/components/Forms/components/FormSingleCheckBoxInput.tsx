/* eslint-disable no-unused-vars */
import React, { ChangeEventHandler, useState } from 'react';

export interface CheckboxProps {
  label: string;
  onChange: (value: 'Yes' | 'No') => void;
  id: string;
}

export const FormSingleCheckBoxInput: React.FC<CheckboxProps> = ({ label, onChange, id }) => {
  const handleCheckboxChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.checked ? 'Yes' : 'No';
    onChange(value);
  };

  return (
    <div className='flex items-center gap-[10px] pb-4'>
      <input
        type="checkbox"
        id={id}
        className='accent-black w-5 h-5'
        onChange={handleCheckboxChange}
      />
      <label htmlFor={id} className="text-lg">
        <span>{label}</span>
      </label>
    </div>
  );
};