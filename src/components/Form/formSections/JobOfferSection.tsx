'use client';

import 'tailwindcss/tailwind.css';
import React, { useEffect } from 'react';
import { FormDropdown } from '../components/FormDropDown';
import { FormRadioInput } from '../components/FormRadioInput';
import { AtlanticProvinces } from '@/app/constants/textConstants';
import {
  contractDurationOptions,
  occupation,
  workHoursOptions,
  workProvinceTerritory,
  haveWrittenOffer,
  jobOfferUnderLIMA,
  jobOfferUnderAtlanticProvince,
  jobOfferFieldSaskatchewan,
  jobOfferFieldManitoba,
  jobOfferFieldAlberta,
  jobOfferFieldBCDistrict,
  jobOfferFieldBC,
  canadianJobOfferWages,
  jobOfferFieldBCExperience,
  jobOfferFieldBCTraining,
} from '../config/formConfig';
import { IPropsType } from '../config/models';

export const JobOfferSection: React.FC<IPropsType> = ({ occupations, formNumber, onchange, isInValid, formData }) => {

  const shouldShowAtlantic = () => { return AtlanticProvinces.includes(formData?.province_or_territory_of_the_canadian_job_offer); };
  const shouldShowSaskatchewan = () => { return formData?.province_or_territory_of_the_canadian_job_offer === 'Saskatchewan, Canada'; };
  const shouldShowManitoba = () => { return formData?.province_or_territory_of_the_canadian_job_offer === 'Manitoba, Canada'; };
  const shouldShowAlberta = () => { return formData?.province_or_territory_of_the_canadian_job_offer === 'Alberta, Canada'; };
  const shouldShowBritishColumbia = () => { return formData?.province_or_territory_of_the_canadian_job_offer === 'British Columbia, Canada'; };

  useEffect(() => {
    if (formNumber !== 6) return;
    if (isInValid) {
      isInValid(formData?.do_you_have_a_written_job_offer_from_a_canadian_employer_ === '');
    }
  }, [formData, formNumber]);

  return (
    <div className='flex flex-col gap-4 md:gap-8'>
      <FormRadioInput
        fields={haveWrittenOffer}
        value={formData?.do_you_have_a_written_job_offer_from_a_canadian_employer_}
        onChange={(e) => {
          onchange('do_you_have_a_written_job_offer_from_a_canadian_employer_', e.target.value);
        }}
        required
      />
      {formData?.do_you_have_a_written_job_offer_from_a_canadian_employer_ === 'Yes' &&
        <div className='gap-8'>
          <div className="flex flex-col gap-4 md:grid grid-cols-2">
            <FormDropdown
              options={occupations || []}
              label={occupation[0].label}
              value={formData?.occupation_as_per_offer}
              onChange={(e) => {
                onchange('occupation_as_per_offer', e.target.value);
              }}
            />
            <FormDropdown
              options={workProvinceTerritory[0].options}
              label={workProvinceTerritory[0].label}
              value={formData?.province_or_territory_of_the_canadian_job_offer}
              onChange={(e) => {
                onchange('province_or_territory_of_the_canadian_job_offer', e.target.value);
              }}
            />
          </div>
          {shouldShowBritishColumbia() &&
            <>
              <div className='flex flex-col gap-4 md:grid grid-cols-2'>
                <FormDropdown options={jobOfferFieldBCDistrict[0].options}
                  label={jobOfferFieldBCDistrict[0].label}
                  value={formData?.in_what_region_is_the_job_that_is_being_offered_in_british_columbia_}
                  onChange={(e) => {
                    onchange('in_what_region_is_the_job_that_is_being_offered_in_british_columbia_', e.target.value);
                  }}
                />
                <FormDropdown
                  options={canadianJobOfferWages[0].options}
                  label={canadianJobOfferWages[0].label}
                  value={formData?.what_is_the_annual_wage_of_the_canadian_job_offer_}
                  onChange={(e) => {
                    onchange('what_is_the_annual_wage_of_the_canadian_job_offer_', e.target.value);
                  }}
                />
              </div>
              <FormRadioInput
                fields={jobOfferFieldBC}
                value={formData?.are_you_currently_working_in_the_northeast_development_region_of_british_columbia_}
                onChange={(e) => {
                  onchange('are_you_currently_working_in_the_northeast_development_region_of_british_columbia_', e.target.value);
                }}
              />
            </>
          }
          <div className="flex flex-col gap-4 md:grid grid-cols-2">
            <FormRadioInput
              fields={workHoursOptions}
              value={formData?.work_hours_for_the_canadian_job_offer}
              onChange={(e) => {
                onchange('work_hours_for_the_canadian_job_offer', e.target.value);
              }}
            />
            <FormRadioInput
              fields={contractDurationOptions}
              value={formData?.what_is_the_contract_duration_for_the_canadian_job_offer_}
              onChange={(e) => {
                onchange('what_is_the_contract_duration_for_the_canadian_job_offer_', e.target.value);
              }}
            />
            <FormRadioInput
              fields={jobOfferUnderLIMA}
              value={formData?.is_this_canadian_job_offer_supported_by_a_labour_market_impact_assessment__lmia__}
              onChange={(e) => {
                onchange('is_this_canadian_job_offer_supported_by_a_labour_market_impact_assessment__lmia__', e.target.value);
              }}
            />
            {shouldShowAtlantic() &&
              <FormRadioInput
                fields={jobOfferUnderAtlanticProvince}
                value={formData?.is_employer_offering_job_part_of_atlantic_immigration_pilot_by_the_atlantic_province_}
                onChange={(e) => {
                  onchange('is_employer_offering_job_part_of_atlantic_immigration_pilot_by_the_atlantic_province_', e.target.value);
                }}
              />
            }
            {shouldShowSaskatchewan() &&
              <FormRadioInput
                value={formData?.is_this_job_offer_related_to_your_field_of_study_saskatchewan__}
                fields={jobOfferFieldSaskatchewan}
                onChange={(e) => {
                  onchange('is_this_job_offer_related_to_your_field_of_study_saskatchewan__', e.target.value);
                }}
              />
            }
            {shouldShowAlberta() &&
              <FormRadioInput
                fields={jobOfferFieldAlberta}
                value={formData?.have_you_received_an_invitation_to_apply_from_the_manitoba_provincial_nominee_program_for_canadian_}
                onChange={(e) => {
                  onchange('have_you_received_an_invitation_to_apply_from_the_manitoba_provincial_nominee_program_for_canadian_', e.target.value);
                }}
              />
            }
            {shouldShowManitoba() &&
              <FormRadioInput
                fields={jobOfferFieldManitoba}
                value={formData?.have_you_received_an_invitation_to_apply_from_the_manitoba_provincial_nominee_program_for_canadian_}
                onChange={(e) => {
                  onchange('have_you_received_an_invitation_to_apply_from_the_manitoba_provincial_nominee_program_for_canadian_', e.target.value);
                }}
              />
            }
            {shouldShowBritishColumbia() &&
              <>
                <FormDropdown
                  options={jobOfferFieldBCExperience[0].options}
                  label={jobOfferFieldBCExperience[0].label}
                  value={formData?.how_many_years_of_full_time__or_part_time_equivalent__work_experience_do_you_have_that_is_directly_}
                  onChange={(e) => {
                    onchange('how_many_years_of_full_time__or_part_time_equivalent__work_experience_do_you_have_that_is_directly_', e.target.value);
                  }}
                />
                <FormRadioInput
                  fields={jobOfferFieldBCTraining}
                  value={formData?.completed__itabc_s__challenge_certification_process_}
                  onChange={(e) => {
                    onchange('completed__itabc_s__challenge_certification_process_', e.target.value);
                  }}
                />
              </>}
          </div>
        </div>}
    </div>
  );
};
