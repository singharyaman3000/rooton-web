import React, { ChangeEventHandler } from 'react';
import { IFormFieldOptions } from './model';

type PropType = {
  fields?: IFormFieldOptions[];
  values?: string[];
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
};

export const FormCheckBoxInput: React.FC<PropType> = (props) => {
  const { fields = [], values = [], onChange, placeholder = '', required = false } = props;

  const concatenatedValues = values.join(',');

  return (
    <div className="flex flex-col">
      {fields.map((field) => {
        return (
          <div key={field.name} className=" mb-5">
            <input type="text" value={concatenatedValues} className="hidden" />
            <label
              className="text-lg font-medium leading-[1.67] text-black"
              placeholder={placeholder}
              htmlFor={field.name}
            >
              <span>{field.label}</span>
            </label>
            {field.options.map((option) => {
              return (
                <div key={option.id} className="flex items-center gap-3 text-lg">
                  <input
                    type="checkbox"
                    id={option.id}
                    name={field.name}
                    onChange={onChange}
                    required={required}
                    value={option.value}
                    className="accent-[#000] w-5 h-5"
                  />
                  <label htmlFor={option.id}>{option.value}</label>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
