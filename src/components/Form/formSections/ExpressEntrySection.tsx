import React from 'react';
import { FormRadioInput } from '../components/FormRadioInput';
import { expressEntryInvitation, expressEntrySubmitted } from '../config/formConfig';
import { IPropsType } from '../config/models';

export const ExpressEntrySection: React.FC<IPropsType> = ({ onchange, formData }) => {

  return (
    <div>
      <FormRadioInput
        fields={expressEntrySubmitted}
        value={formData?.have_you_already_submitted_an_express_entry_profile_to_the_government_of_canada_within_the_past_12_}
        onChange={(e) => {
          onchange('have_you_already_submitted_an_express_entry_profile_to_the_government_of_canada_within_the_past_12_', e.target.value);
        }}
      />
      {formData.have_you_already_submitted_an_express_entry_profile_to_the_government_of_canada_within_the_past_12_ === 'Yes' && (
        <FormRadioInput
          fields={expressEntryInvitation}
          value={formData?.have_you_already_received_an_invitation_to_apply_for_permanent_residence_from_the_government_of_can}
          onChange={(e) => {
            onchange('have_you_already_received_an_invitation_to_apply_for_permanent_residence_from_the_government_of_can', e.target.value);
          }}
        />
      )}
    </div>
  );
};
