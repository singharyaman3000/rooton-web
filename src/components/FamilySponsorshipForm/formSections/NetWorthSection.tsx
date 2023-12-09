'use client';

import 'tailwindcss/tailwind.css';
import React from 'react';
import { FormDropdown } from '../components/FormDropDown';
import { currency, netWorth } from '../config/formConfig';
import { IPropsType } from '../config/models';

export const NetWorthSection: React.FC<IPropsType> = ({ currencies, formData, onchange }) => {

  return (
    <div>
      <p>This question is optional. Net worth is considered for some immigration programs.</p>
      <FormDropdown
        options={currencies || []}
        label={currency[0].label}
        value={formData.preferred_currency_for_networth}
        onChange={(e) => {
          onchange('preferred_currency_for_networth', e.target.value);
        }}
      />
      <FormDropdown
        options={netWorth[0].options}
        label={netWorth[0].label}
        value={formData.total_networth_amount}
        onChange={(e) => {
          onchange('total_networth_amount', e.target.value);
        }}
      />
    </div>
  );
};
