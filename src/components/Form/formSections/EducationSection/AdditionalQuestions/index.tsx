'use client';

import 'tailwindcss/tailwind.css';
import { useState } from 'react';
import { FormCloseButton } from '@/components/Form/components/FormCloseButton';
import { FormDropdown } from '@/components/Form/components/FormDropDown';
import { FormRadioInput } from '@/components/Form/components/FormRadioInput';
import {
  educationType,
  educationCompletedOrNot,
  educationDuration,
  educationPlace,
  educationPlaceInCanada,
  territoryCheck,
} from '@/components/Form/config/formConfig';

type PropsType = {
  close: () => void;
};

const intialFormStates = {
  educationType: '',
  educationDuration: '',
  educationCompletedOrNot: '',
  educationPlace: '',
  educationPlaceInCanada: '',
  have_you_lived_in_canadas_atlantic_provinces: '',
};

export const AdditionalQuestions = (props: PropsType) => {
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
    <div className="relative border ml-8 my-4 p-4 py-6 border-solid border-[black]">
      <FormCloseButton onclick={close}></FormCloseButton>
      <FormDropdown
        options={educationType[0].options}
        label={educationType[0].label}
        value={formValues.educationType}
        onChange={(e) => {
          handleFieldChange('educationType', e.target.value);
        }}
      />
      <FormDropdown
        options={educationDuration[0].options}
        label={educationDuration[0].label}
        value={formValues.educationDuration}
        onChange={(e) => {
          handleFieldChange('educationDuration', e.target.value);
        }}
      />
      <FormRadioInput
        fields={educationCompletedOrNot}
        onChange={(e) => {
          handleFieldChange('educationCompletedOrNot', e.target.value);
        }}
      />
      <FormRadioInput
        fields={educationPlace}
        onChange={(e) => {
          handleFieldChange('educationPlace', e.target.value);
          if (e.target.value === 'Outside Canada') {
            handleFieldChange('educationPlaceInCanada', '');
          }
        }}
      />
      <div style={{ display: formValues.educationPlace === 'Inside Canada' ? 'block' : 'none' }}>
        <FormDropdown
          options={educationPlaceInCanada[0].options}
          label={educationPlaceInCanada[0].label}
          value={formValues.educationPlaceInCanada}
          onChange={(e) => {
            handleFieldChange('educationPlaceInCanada', e.target.value);
          }}
        />
      </div>
      <div>
        <FormRadioInput
          fields={territoryCheck}
          onChange={(e) => {
            handleFieldChange('have_you_lived_in_canadas_atlantic_provinces', e.target.value);
          }}
        />
      </div>
    </div>
  );
};
