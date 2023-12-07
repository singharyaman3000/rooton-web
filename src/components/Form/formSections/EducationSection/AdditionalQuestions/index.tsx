/* eslint-disable no-unused-vars */

'use client';

import { FormCloseButton } from '@/components/Form/components/FormCloseButton';
import { FormDropdown } from '@/components/Form/components/FormDropDown';
import { FormRadioInput } from '@/components/Form/components/FormRadioInput';
import { AtlanticProvinces } from '@/app/constants/textConstants';
import {
  educationType,
  educationCompletedOrNot,
  educationDuration,
  educationPlace,
  educationPlaceInCanada,
  territoryCheck,
} from '@/components/Form/config/formConfig';

type PropsType = {
  close?: () => void;
  formData: Record<string, string>;
  state: Record<string, string>;
  onchange: (key: string, value: string) => void;
};

export const AdditionalQuestions = (props: PropsType) => {
  const { close, formData, state, onchange } = props;

  const shouldShow = () => {
    return AtlanticProvinces.includes(formData[state.educationPlaceInCanada]);
  };

  return (
    <div className="relative border ml-8 my-4 p-4 py-6 border-solid border-[black]">
      {close && <FormCloseButton onclick={close}></FormCloseButton>}
      <FormDropdown
        options={educationType[0].options}
        label={educationType[0].label}
        value={formData[state.educationType]}
        onChange={(e) => {
          onchange(state.educationType, e.target.value);
        }}
      />
      <FormDropdown
        options={educationDuration[0].options}
        label={educationDuration[0].label}
        value={formData[state.educationDuration]}
        onChange={(e) => {
          onchange(state.educationDuration, e.target.value);
        }}
      />
      <FormRadioInput
        fields={educationCompletedOrNot}
        value={formData[state.educationCompletedOrNot]}
        onChange={(e) => {
          onchange(state.educationCompletedOrNot, e.target.value);
        }}
      />
      <FormRadioInput
        fields={educationPlace}
        value={formData[state.educationPlace]}
        onChange={(e) => {
          onchange(state.educationPlace, e.target.value);
          if (e.target.value === 'Outside Canada') {
            onchange(state.educationPlaceInCanada, '');
            onchange(state.territoryCHeckAtlantic, '');
          }
        }}
      />
      {formData[state.educationPlace] === 'Inside Canada' &&
        <FormDropdown
          options={educationPlaceInCanada[0].options}
          label={educationPlaceInCanada[0].label}
          value={formData[state.educationPlaceInCanada]}
          onChange={(e) => {
            onchange(state.educationPlaceInCanada, e.target.value);
          }}
        />}
      {shouldShow() &&
        < FormRadioInput
          fields={territoryCheck}
          value={formData[state.territoryCheckAtlantic]}
          onChange={(e) => {
            onchange(state.territoryCheckAtlantic, e.target.value);
          }}
        />
      }
    </div>
  );
};
