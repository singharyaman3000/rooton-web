import React from 'react';
import { currency, netWorth } from '../config/formConfig';
import { IPropsType } from '../config/models';
import { FormDropdown } from '../../components/FormDropDown';

export const NetWorthSection: React.FC<IPropsType> = ({ currencies, formData, onchange }) => {

  return (
    <div>
      <p className="mb-2 text-black">
        This question is optional. Net worth is considered for some immigration programs.
      </p>
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
