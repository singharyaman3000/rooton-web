/* eslint-disable no-unused-vars */

'use client';

import { FormCloseButton } from '@/components/Form/components/FormCloseButton';
import { FormDropdown } from '@/components/Form/components/FormDropDown';
import { FormRadioInput } from '@/components/Form/components/FormRadioInput';
import {
  workHistoryWorkHour,
  workHistoryLength,
  workHistoryOccupation,
  workHistoryPlace,
  workHistoryPlaceInCanada,
  workHistoryType,
  workHistoryWhen,
  workHistoryWorkPermit,
} from '@/components/Form/config/formConfig';

type PropsType = {
  close?: () => void;
  formData: Record<string, string>;
  state: Record<string, string>;
  onchange: (key: string, value: string) => void;
};

export const WorkHistoryAdditionalQuestions = (props: PropsType) => {
  const { close, formData, state, onchange } = props;

  return (
    <div className=" relative border ml-8 my-4 p-4 border-solid border-[black]">
      {close && <FormCloseButton onclick={close}></FormCloseButton>}
      <FormDropdown
        options={workHistoryOccupation[0].options}
        label={workHistoryOccupation[0].label}
        value={formData[state.occupation]}
        onChange={(e) => {
          onchange(state.occupation, e.target.value);
        }}
      />
      <FormDropdown
        options={workHistoryLength[0].options}
        label={workHistoryLength[0].label}
        value={formData[state.lengthOfWork]}
        onChange={(e) => {
          onchange(state.lengthOfWork, e.target.value);
        }}
      />
      <FormDropdown
        options={workHistoryWhen[0].options}
        label={workHistoryWhen[0].label}
        value={formData[state.whenWasWork]}
        onChange={(e) => {
          onchange(state.whenWasWork, e.target.value);
        }}
      />
      <FormRadioInput
        fields={workHistoryWorkHour}
        value={formData[state.workHours]}
        onChange={(e) => {
          onchange(state.workHours, e.target.value);
        }}
      />
      <FormRadioInput
        fields={workHistoryType}
        value={formData[state.typeOfJob]}
        onChange={(e) => {
          onchange(state.typeOfJob, e.target.value);
        }}
      />
      <FormRadioInput
        fields={workHistoryPlace}
        onChange={(e) => {
          onchange(state.locationOfWork, e.target.value);
        }}
      />
      {formData[state.locationOfWork] === 'Inside Canada' &&
        <>
          <FormDropdown
            options={workHistoryPlaceInCanada[0].options}
            label={workHistoryPlaceInCanada[0].label}
            value={formData[state.provinceOrTerritoryOfWork]}
            onChange={(e) => {
              onchange(state.provinceOrTerritoryOfWork, e.target.value);
            }}
          />
          <FormDropdown
            options={workHistoryWorkPermit[0].options}
            label={workHistoryWorkPermit[0].label}
            value={formData[state.workPermitType]}
            onChange={(e) => {
              onchange(state.workPermitType, e.target.value);
            }}
          />
        </>
      }
    </div>
  );
};
