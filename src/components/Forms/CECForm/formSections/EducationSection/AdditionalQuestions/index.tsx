/* eslint-disable no-unused-vars */

'use client';

import { AtlanticProvinces } from '@/app/constants/textConstants';
import { FormCloseButton } from '@/components/Forms/components/FormCloseButton';
import { FormDropdown } from '@/components/Forms/components/FormDropDown';
import {
  educationCompletedOrNot,
  educationDuration,
  educationPlace,
  educationPlaceInCanada,
  educationType,
  territoryCheck,
} from '../../../config/formConfig';
import { FormRadioInput } from '@/components/Forms/components/FormRadioInput';
import { AddEducationKeyMap, AdditionalPropsType } from '../../../config/models';

const keyMap: AddEducationKeyMap = {
  educationType: 'type_of_education_or_training_',
  educationDuration: 'duration_of_education_or_training_',
  educationCompletedOrNot: 'completed_the_education_or_training_',
  educationPlace: 'location_of_education_or_training_',
  educationPlaceInCanada: 'province_of_education_or_training_',
  territoryCheckAtlantic: 'have_you_lived_in_one_of_canada_s_atlantic_provinces_for_education_or_training_',
};

export const AdditionalQuestions = (props: AdditionalPropsType) => {
  const { close, state, onchange, id } = props;
  const currentSectionState = state[id];

  const getKeyWithId = (mapKey: keyof AddEducationKeyMap) => {
    return `${keyMap[mapKey]}`;
  };

  const shouldShow = () => {
    return AtlanticProvinces.includes(currentSectionState[getKeyWithId('educationPlaceInCanada')]);
  };

  return (
    <div className="relative border ml-8 my-4 p-4 py-6 border-solid border-[black]">
      <FormCloseButton
        onclick={() => {
          close(id);
        }}
      />
      <div className='flex flex-col gap-4 md:grid grid-cols-2'>
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
      </div>
      <div className='flex flex-col gap-4 md:grid grid-cols-2'>
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
            if (e.target.value === 'Outside Canada') {
              onchange(getKeyWithId('educationPlaceInCanada'), '', id, state);
              onchange(getKeyWithId('territoryCheckAtlantic'), '', id, state);
            }
          }}
        />
      </div>
      {currentSectionState[getKeyWithId('educationPlace')] === 'Inside Canada' && (
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
