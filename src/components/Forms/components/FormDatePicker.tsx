/* eslint-disable no-unused-vars */
import React from 'react';
import { IFormField } from './model';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

type PropType = {
  field: IFormField;
  onChange?: (value: string) => void;
  value: string;
  className?: string;
};

export const FormDatePicker: React.FC<PropType> = (props) => {
  const { field, onChange, value, className = '' } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="hs-form-field">
        <div className="flex flex-row">
          <label className="hs-main-font-element" htmlFor={field.name}>
            {field.label}
          </label>
        </div>
        <DatePicker
          disablePast
          value={value ? dayjs(value) : undefined}
          onChange={(newValue) => {
            onChange?.(newValue?.format('YYYY-MM-DD') || '');
          }}
          className={className}
          name={field.name}
        />
      </div>
    </LocalizationProvider>
  );
};
