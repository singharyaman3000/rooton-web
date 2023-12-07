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
  id: number;
  close: (index: number) => void;
  formData: Record<string, string>;
  state: Record<string, string>[];
  onchange: (key: string, value: string, index: number, state: Record<string, string>[]) => void;
};

type KeyMap = {
  educationType: 'type_of_education_or_training_';
  educationDuration: 'duration_of_education_or_training_';
  educationCompletedOrNot: 'completed_the_education_or_training_';
  educationPlace: 'location_of_education_or_training_';
  educationPlaceInCanada: 'province_of_education_or_training_';
  territoryCheckAtlantic: 'have_you_lived_in_one_of_canada_s_atlantic_provinces_for_education_or_training_';
};

const keyMap: KeyMap = {
  educationType: 'type_of_education_or_training_',
  educationDuration: 'duration_of_education_or_training_',
  educationCompletedOrNot: 'completed_the_education_or_training_',
  educationPlace: 'location_of_education_or_training_',
  educationPlaceInCanada: 'province_of_education_or_training_',
  territoryCheckAtlantic: 'have_you_lived_in_one_of_canada_s_atlantic_provinces_for_education_or_training_',
};

export const AdditionalQuestions = (props: PropsType) => {
  const { close, state, onchange, id } = props;
  const currentSectionState = state[id];

  const getKeyWithId = (mapKey: keyof KeyMap) => {
    return `${keyMap[mapKey]}`;
  };

  const shouldShow = () => {
    return AtlanticProvinces.includes(getKeyWithId('educationPlaceInCanada'));
  };

  return (
    <div className="relative border ml-8 my-4 p-4 py-6 border-solid border-[black]">
      <FormCloseButton
        onclick={() => {
          close(id);
        }}
      ></FormCloseButton>
      <FormDropdown
        options={educationType[0].options}
        label={educationType[0].label}
        value={currentSectionState[getKeyWithId('educationType')]}
        onChange={(e) => {
          onchange(getKeyWithId('educationType'), e.target.value, id, state);
        }}
      />
      <FormDropdown
        options={educationDuration[0].options}
        label={educationDuration[0].label}
        value={currentSectionState[getKeyWithId('educationDuration')]}
        onChange={(e) => {
          onchange(getKeyWithId('educationDuration'), e.target.value, id, state);
        }}
      />
      <FormRadioInput
        id={id.toString()}
        fields={educationCompletedOrNot}
        value={currentSectionState[getKeyWithId('educationCompletedOrNot')]}
        onChange={(e) => {
          onchange(getKeyWithId('educationCompletedOrNot'), e.target.value, id, state);
        }}
      />
      <FormRadioInput
        id={id.toString()}
        fields={educationPlace}
        value={currentSectionState[getKeyWithId('educationPlace')]}
        onChange={(e) => {
          onchange(getKeyWithId('educationPlace'), e.target.value, id, state);
          // if (e.target.value === 'Outside Canada') {
          //   onchange(state.educationPlaceInCanada, '');
          //   onchange(state.territoryCHeckAtlantic, '');
          // }
        }}
      />
      {currentSectionState[getKeyWithId('educationPlaceInCanada')] === 'Inside Canada' && (
        <FormDropdown
          options={educationPlaceInCanada[0].options}
          label={educationPlaceInCanada[0].label}
          value={currentSectionState[getKeyWithId('educationPlaceInCanada')]}
          onChange={(e) => {
            onchange(getKeyWithId('educationPlaceInCanada'), e.target.value, id, state);
          }}
        />
      )}
      {shouldShow() && (
        <FormRadioInput
          fields={territoryCheck}
          value={currentSectionState[getKeyWithId('territoryCheckAtlantic')]}
          onChange={(e) => {
            onchange(getKeyWithId('territoryCheckAtlantic'), e.target.value, id, state);
          }}
        />
      )}
    </div>
  );
};
