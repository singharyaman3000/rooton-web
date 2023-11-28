'use client';

import 'tailwindcss/tailwind.css';
import { useState } from 'react';
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
  close: () => void;
};

const intialFormStates = {
  workHistoryOccupation: '',
  workHistoryLength: '',
  workHistoryWhen: '',
  workHistoryWorkHour: '',
  workHistoryType: '',
  workHistoryPlaceInCanada: '',
  workHistoryPlace: '',
  workHistoryWorkPermit: '',
};

export const WorkHistoryAdditionalQuestions = (props: PropsType) => {
  const { close } = props;
  const [formValues, setFormValues] = useState(intialFormStates);

  const handleFieldChange = (fieldName: string, value: unknown) => {
    setFormValues((prevFormValues) => {
      return {
        ...prevFormValues,
        [fieldName]: value,
      };
    });
  };

  return (
    <div className=" relative border ml-8 my-4 p-4 border-solid border-[black]">
      <FormCloseButton onclick={close}></FormCloseButton>
      <FormDropdown
        options={workHistoryOccupation[0].options}
        label={workHistoryOccupation[0].label}
        value={formValues.workHistoryOccupation}
        onChange={(e) => {
          handleFieldChange('workHistoryOccupation', e.target.value);
        }}
      />
      <FormDropdown
        options={workHistoryLength[0].options}
        label={workHistoryLength[0].label}
        value={formValues.workHistoryLength}
        onChange={(e) => {
          handleFieldChange('workHistoryLength', e.target.value);
        }}
      />
      <FormDropdown
        options={workHistoryWhen[0].options}
        label={workHistoryWhen[0].label}
        value={formValues.workHistoryWhen}
        onChange={(e) => {
          handleFieldChange('workHistoryWhen', e.target.value);
        }}
      />
      <FormRadioInput
        fields={workHistoryWorkHour}
        onChange={(e) => {
          handleFieldChange('workHistoryWorkHour', e.target.value);
        }}
      />
      <FormRadioInput
        fields={workHistoryType}
        onChange={(e) => {
          handleFieldChange('workHistoryType', e.target.value);
        }}
      />
      <FormRadioInput
        fields={workHistoryPlace}
        onChange={(e) => {
          handleFieldChange('workHistoryPlace', e.target.value);
        }}
      />
      <div style={{ display: formValues.workHistoryPlace === 'Inside Canada' ? 'block' : 'none' }}>
        <FormDropdown
          options={workHistoryPlaceInCanada[0].options}
          label={workHistoryPlaceInCanada[0].label}
          value={formValues.workHistoryPlaceInCanada}
          onChange={(e) => {
            handleFieldChange('workHistoryPlaceInCanada', e.target.value);
          }}
        />
        <FormDropdown
          options={workHistoryWorkPermit[0].options}
          label={workHistoryWorkPermit[0].label}
          value={formValues.workHistoryWorkPermit}
          onChange={(e) => {
            handleFieldChange('workHistoryWorkPermit', e.target.value);
          }}
        />
      </div>
    </div>
  );
};
