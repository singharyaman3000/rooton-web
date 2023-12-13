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
    <div className='flex items-center gap-[10px] pb-4'>
      <input
        type="checkbox"
        id={id}
        className='accent-black w-5 h-5'
        checked={value === 'Yes'}
        onChange={handleCheckboxChange}
      />
      <label htmlFor={id} className="text-lg">
        <span>{label}</span>
      </label>
    </div>
  );
};