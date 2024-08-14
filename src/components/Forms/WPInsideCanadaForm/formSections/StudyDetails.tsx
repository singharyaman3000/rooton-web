import React, { useEffect } from 'react';
import { currentOccupation, fieldOfStudy, highestLevelOfEducation } from '../config/formConfig';
import { IPropsType } from '../config/models';
import { FormDropdown } from '../../components/FormDropDown';
import { FormTextArea } from '../../components/FormTextArea';
import { FormTextInput } from '../../components/FormTextInput';

export const StudyDetails: React.FC<IPropsType> = ({ onchange, isInValid, formData }) => {
  useEffect(() => {
    isInValid?.(false);
  }, []);

  return (
    <div>
      <FormDropdown
        options={highestLevelOfEducation[0].options}
        label={highestLevelOfEducation[0].label}
        value={formData?.[highestLevelOfEducation[0].name] || ''}
        onChange={(e) => {
          onchange(highestLevelOfEducation[0].name, e.target.value);
        }}
      />
      <FormTextInput
        field={fieldOfStudy[0]}
        value={formData?.[fieldOfStudy[0].name] || ''}
        onChange={(e) => {
          onchange(fieldOfStudy[0].name, e.target.value);
        }}
      />
      <FormDropdown
        name="have_you_appeared_for_ielts_toefl_pte_duolingo_celpip_cael_"
        label="Have you taken English language proficiency exams (IELTS/ TOEFL/ PTE/ Duolingo/ CELPIP/ CAEL) ?"
        onChange={(e) => {
          onchange('have_you_appeared_for_ielts_toefl_pte_duolingo_celpip_cael_', e.target.value);
        }}
        value={formData?.have_you_appeared_for_ielts_toefl_pte_duolingo_celpip_cael_ || ''}
        options={['Yes', 'No']}
      />
      {formData?.have_you_appeared_for_ielts_toefl_pte_duolingo_celpip_cael_ === 'Yes' && (
        <FormTextArea
          field={{
            label: 'Overall Score in (IELTS/ TOEFL/ PTE/ Duolingo/ CELPIP/ CAEL)',
            name: 'overall_score_in__ielts_pte_toefl_',
          }}
          value={formData.overall_score_in__ielts_pte_toefl_}
          onChange={(e) => {
            onchange('overall_score_in__ielts_pte_toefl_', e.target.value);
          }}
        />
      )}
      <FormDropdown
        options={currentOccupation[0].options}
        label={currentOccupation[0].label}
        value={formData?.[currentOccupation[0].name] || ''}
        onChange={(e) => {
          onchange(currentOccupation[0].name, e.target.value);
        }}
      />
    </div>
  );
};
