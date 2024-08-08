import React, { useEffect } from 'react';
import { contactInfo, perferredIntake, programType } from '../config/formConfig';
import { IPropsType } from '../config/models';
import { FormDropdown } from '../../components/FormDropDown';
import { FormDatePicker } from '../../components/FormDatePicker';
import { FormTextArea } from '../../components/FormTextArea';

export const StudyDetails: React.FC<IPropsType> = ({ onchange, formNumber, isInValid, formData }) => {
  useEffect(() => {
    if (formNumber !== 2 || !isInValid) return;
    isInValid(
      !formData?.have_you_appeared_for_ielts_toefl_pte_duolingo_celpip_cael_?.trim() ||
        !(
          formData.what_is_your_preferred_intake_ ||
          formData.what_is_your_preferred_intake_1 ||
          formData.what_is_your_preferred_intake_2 ||
          formData.what_is_your_preferred_intake_3
        ) ||
        !(
          formData.what_type_of_study_program_are_you_interested_in_taking_in_canada_ ||
          formData.what_type_of_study_program_are_you_interested_in_taking_in_canada_1 ||
          formData.what_type_of_study_program_are_you_interested_in_taking_in_canada_2 ||
          formData.what_type_of_study_program_are_you_interested_in_taking_in_canada_3 ||
          formData.what_type_of_study_program_are_you_interested_in_taking_in_canada_4 ||
          formData.what_type_of_study_program_are_you_interested_in_taking_in_canada_5 ||
          formData.what_type_of_study_program_are_you_interested_in_taking_in_canada_6
        ),
    );
  }, [formData, formNumber]);

  return (
    <div>
      <FormDropdown
        name="have_you_appeared_for_ielts_toefl_pte_duolingo_celpip_cael_"
        label="Have you taken English language proficiency exams (IELTS/ TOEFL/ PTE/ Duolingo/ CELPIP/ CAEL) ?"
        onChange={(e) => {
          onchange('have_you_appeared_for_ielts_toefl_pte_duolingo_celpip_cael_', e.target.value);
        }}
        value={formData?.have_you_appeared_for_ielts_toefl_pte_duolingo_celpip_cael_ || ''}
        options={['Yes', 'No']}
        required
      />
      {formData?.have_you_appeared_for_ielts_toefl_pte_duolingo_celpip_cael_ === 'No' && (
        <FormDatePicker
          field={contactInfo[4]}
          value={formData.desired_test_date || ''}
          onChange={(value) => {
            onchange?.('desired_test_date', value);
          }}
        />
      )}
      {formData?.have_you_appeared_for_ielts_toefl_pte_duolingo_celpip_cael_ === 'Yes' && (
        <FormTextArea
          field={{ label: 'Overall Score in (IELTS/ TOEFL/ PTE/ Duolingo/ CELPIP/ CAEL)', name: 'overall_score_in__ielts_pte_toefl_' }}
          value={formData.overall_score_in__ielts_pte_toefl_}
          onChange={(e) => {
            onchange('overall_score_in__ielts_pte_toefl_', e.target.value);
          }}
        />
      )}
      <div className="hs-form-field">
        <div className="flex flex-row">
          <label className="hs-main-font-element" htmlFor={'What is your preferred Intake?'}>
            {'What is your preferred Intake?'}
          </label>
          <span className="hs-form-required text-[#ff0000]">*</span>
        </div>

        {perferredIntake.map((item) => {
          return (
            <div className="pb-2 relative" key={item.name}>
              <label
                htmlFor={item.name}
                id="custom-single-checkbox"
                className="inline-flex items-baseline text-lg font-medium leading-[1.67] text-black"
              >
                <input
                  type="checkbox"
                  id={item.name}
                  checked={formData?.[item.name] === item.label}
                  onChange={(e) => {
                    onchange(item.name, e.target.checked ? item.label : '');
                  }}
                />
                <span className={formData?.[item.name] === item.label ? 'checked' : ''}>{item.label}</span>
              </label>
            </div>
          );
        })}
      </div>

      <div className="hs-form-field">
        <div className="flex flex-row">
          <label className="hs-main-font-element" htmlFor={'Type of Study Program'}>
            {'Type of Study Program'}
          </label>
          <span className="hs-form-required text-[#ff0000]">*</span>
        </div>

        {programType.map((item) => {
          return (
            <div className="pb-2 relative" key={item.name}>
              <label
                htmlFor={item.name}
                id="custom-single-checkbox"
                className="inline-flex items-baseline text-lg font-medium leading-[1.67] text-black"
              >
                <input
                  type="checkbox"
                  id={item.name}
                  checked={formData?.[item.name] === item.label}
                  onChange={(e) => {
                    onchange(item.name, e.target.checked ? item.label : '');
                  }}
                />
                <span className={formData?.[item.name] === item.label ? 'checked' : ''}>{item.label}</span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
