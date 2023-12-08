/* eslint-disable no-unused-vars */

'use client';

import { AddWorkKeyMap, AdditionalPropsType } from '@/components/Forms/CECForm/config/models';
import { FormCloseButton } from '@/components/Forms/components/FormCloseButton';
import { FormDropdown } from '@/components/Forms/components/FormDropDown';
import { FormRadioInput } from '@/components/Forms/components/FormRadioInput';
import {
  workHistoryOccupation,
  workHistoryLength,
  workHistoryWhen,
  workHistoryWorkHour,
  workHistoryType,
  workHistoryPlace,
  workHistoryPlaceInCanada,
  workHistoryWorkPermit,
} from '@/components/Forms/CECForm/config/formConfig';

const keyMap: AddWorkKeyMap = {
  occupation: 'occupation_',
  typeOfJob: 'type_of_job_',
  whenWasWork: 'when_was_work_',
  lengthOfWork: 'length_of_work_',
  locationOfWork: 'location_of_work_',
  workHours: 'work_hours_for_work_',
  provinceOrTerritoryOfWork: 'province_or_territory_of_work_',
  workPermitType: 'what_type_of_work_permit_do_you_currently_hold_for_work_',
};

export const AdditionalQuestions = (props: AdditionalPropsType) => {
  const { id, close, state, onchange, data } = props;
  const currentSectionState = state[id];

  const getKeyWithId = (mapKey: keyof AddWorkKeyMap) => {
    return `${keyMap[mapKey]}`;
  };

  return (
    <div className=" relative border ml-8 my-4 p-4 border-solid border-[black]">
      <FormCloseButton
        onclick={() => {
          close(id);
        }}
      />
      <div className="flex flex-col gap-4 md:grid grid-cols-3">
        <FormDropdown
          options={data}
          label={workHistoryOccupation[0].label}
          value={currentSectionState[getKeyWithId('occupation')]}
          onChange={(e) => {
            onchange(getKeyWithId('occupation'), e.target.value, id, state);
          }}
        />
        <FormDropdown
          options={workHistoryLength[0].options}
          label={workHistoryLength[0].label}
          value={currentSectionState[getKeyWithId('lengthOfWork')]}
          onChange={(e) => {
            onchange(getKeyWithId('lengthOfWork'), e.target.value, id, state);
          }}
        />
        <FormDropdown
          options={workHistoryWhen[0].options}
          label={workHistoryWhen[0].label}
          value={currentSectionState[getKeyWithId('whenWasWork')]}
          onChange={(e) => {
            onchange(getKeyWithId('whenWasWork'), e.target.value, id, state);
          }}
        />
      </div>
      <FormRadioInput
        id={id.toString()}
        fields={workHistoryWorkHour}
        value={currentSectionState[getKeyWithId('workHours')]}
        onChange={(e) => {
          onchange(getKeyWithId('workHours'), e.target.value, id, state);
        }}
      />
      <FormRadioInput
        id={id.toString()}
        fields={workHistoryType}
        value={currentSectionState[getKeyWithId('typeOfJob')]}
        onChange={(e) => {
          onchange(getKeyWithId('typeOfJob'), e.target.value, id, state);
        }}
      />
      <FormRadioInput
        id={id.toString()}
        fields={workHistoryPlace}
        value={currentSectionState[getKeyWithId('locationOfWork')]}
        onChange={(e) => {
          onchange(getKeyWithId('locationOfWork'), e.target.value, id, state);
          if (e.target.value === 'Outside Canada') {
            onchange(getKeyWithId('provinceOrTerritoryOfWork'), '', id, state);
            onchange(getKeyWithId('workPermitType'), '', id, state);
          }
        }}
      />
      {currentSectionState[getKeyWithId('locationOfWork')] === 'Inside Canada' && (
        <>
          <FormDropdown
            options={workHistoryPlaceInCanada[0].options}
            label={workHistoryPlaceInCanada[0].label}
            value={currentSectionState[getKeyWithId('provinceOrTerritoryOfWork')]}
            onChange={(e) => {
              onchange(getKeyWithId('provinceOrTerritoryOfWork'), e.target.value, id, state);
            }}
          />
          <FormDropdown
            options={workHistoryWorkPermit[0].options}
            label={workHistoryWorkPermit[0].label}
            value={currentSectionState[getKeyWithId('workPermitType')]}
            onChange={(e) => {
              onchange(getKeyWithId('workPermitType'), e.target.value, id, state);
            }}
          />
        </>
      )}
    </div>
  );
};
