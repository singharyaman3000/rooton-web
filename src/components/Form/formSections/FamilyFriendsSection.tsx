'use client';

import 'tailwindcss/tailwind.css';
import React from 'react';
import { FormRadioInput } from '../components/FormRadioInput';
import { FormDropdown } from '../components/FormDropDown';
import {
  familyFriendsCanada,
  familyFriendsManitoba,
  familyRelationshipOptions,
  livingIn,
  relativeSince,
  residencyStatusOptions,
} from '../config/formConfig';
import { IPropsType } from '../config/models';

export const FamilyOrFriendsSection: React.FC<IPropsType> = ({ onchange, formData }) => {

  return (
    <div>
      <FormRadioInput
        fields={familyFriendsManitoba}
        onChange={(e) => {
          onchange('close_friend_living_in_manitoba_18_years_or_older_', e.target.value);
        }}
        value={formData?.close_friend_living_in_manitoba_18_years_or_older_}
      />
      <FormRadioInput
        fields={familyFriendsCanada}
        onChange={(e) => {
          onchange('family_members_or_relatives_living_in_canada_18_years_or_older_', e.target.value);
        }}
        value={formData?.family_members_or_relatives_living_in_canada_18_years_or_older_}
      />
      {formData?.family_members_or_relatives_living_in_canada_18_years_or_older_ === 'Yes' &&
        <>
          <p>{'Please list all your and/or your spouse/common-law partner\'s relatives in Canada'}</p>
          <div className=' flex flex-col md:grid grid-cols-4 gap-4'>
            <FormDropdown
              options={familyRelationshipOptions[0].options}
              label={familyRelationshipOptions[0].label}
              value={formData?.relationship_to_family_member_in_canada}
              onChange={(e) => {
                onchange('relationship_to_family_member_in_canada', e.target.value);
              }}
            />
            <FormDropdown
              options={residencyStatusOptions[0].options}
              label={residencyStatusOptions[0].label}
              value={formData?.residency_status_of_family_member}
              onChange={(e) => {
                onchange('residency_status_of_family_member', e.target.value);
              }}
            />
            <FormDropdown
              options={livingIn[0].options}
              label={livingIn[0].label}
              value={formData?.family_member_living_in}
              onChange={(e) => {
                onchange('family_member_living_in', e.target.value);
              }}
            />
            <FormDropdown
              options={relativeSince[0].options}
              label={relativeSince[0].label}
              value={formData?.family_member_living_in_current_area_for_}
              onChange={(e) => {
                onchange('family_member_living_in_current_area_for_', e.target.value);
              }}
            />
          </div>
        </>
      }
    </div>
  );
};
