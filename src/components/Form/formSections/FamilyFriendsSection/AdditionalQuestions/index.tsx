/* eslint-disable no-unused-vars */

import { FormCloseButton } from '@/components/Form/components/FormCloseButton';
import { FormDropdown } from '@/components/Form/components/FormDropDown';
import { AdditionalPropsType, AddFamilyKeyMap } from '@/components/Form/config/models';
import {
  familyRelationshipOptions,
  livingIn,
  relativeSince,
  residencyStatusOptions,
} from '@/components/Form/config/formConfig';

const keyMap: AddFamilyKeyMap = {
  relationship: 'relationship_with_relative_',
  residencyStatus: 'residency_status_of_relative_',
  livingIn: 'living_in_relative_',
  livingInSince: 'living_there_for_relative_',
};

export const AdditionalQuestions = (props: AdditionalPropsType) => {
  const { id, close, state, onchange } = props;
  const currentSectionState = state[id];

  const getKeyWithId = (mapKey: keyof AddFamilyKeyMap) => {
    return `${keyMap[mapKey]}`;
  };

  return (
    <div className=" relative border ml-8 my-4 p-4 border-solid border-[black]">
      <FormCloseButton
        onclick={() => {
          close(id);
        }}
      />
      <div className=' flex flex-col md:grid grid-cols-4 gap-4'>
        <FormDropdown
          options={familyRelationshipOptions[0].options}
          label={familyRelationshipOptions[0].label}
          value={currentSectionState[getKeyWithId('relationship')]}
          onChange={(e) => {
            onchange(getKeyWithId('relationship'), e.target.value, id, state);
          }}
        />
        <FormDropdown
          options={residencyStatusOptions[0].options}
          label={residencyStatusOptions[0].label}
          value={currentSectionState[getKeyWithId('residencyStatus')]}
          onChange={(e) => {
            onchange(getKeyWithId('residencyStatus'), e.target.value, id, state);
          }}
        />
        <FormDropdown
          options={livingIn[0].options}
          label={livingIn[0].label}
          value={currentSectionState[getKeyWithId('livingIn')]}
          onChange={(e) => {
            onchange(getKeyWithId('livingIn'), e.target.value, id, state);
          }}
        />
        <FormDropdown
          options={relativeSince[0].options}
          label={relativeSince[0].label}
          value={currentSectionState[getKeyWithId('livingInSince')]}
          onChange={(e) => {
            onchange(getKeyWithId('livingInSince'), e.target.value, id, state);
          }}
        />
      </div>
    </div>
  );
};
