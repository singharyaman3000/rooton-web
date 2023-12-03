'use client';

import 'tailwindcss/tailwind.css';
import React, { useEffect, useState } from 'react';
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
} from '../config/formConfig';
import { IPropsType } from '../config/models';

const intialFormStates = {
  occupation: '',
  workHoursOptions: '',
  workProvinceTerritory: '',
  contractDurationOptions: '',
  jobOfferUnderLIMA: '',
  haveWrittenOffer: '',
  jobOfferUnderAtlanticProvince: '',
  jobOfferFieldSaskatchewan: '',
  jobOfferFieldAlberta: '',
  jobOfferFieldManitoba: '',

};

export const JobOfferSection: React.FC<IPropsType> = ({ occupations, formNumber, onchange }) => {
  const [formValues, setFormValues] = useState(intialFormStates);

  const handleFieldChange = (fieldName: string, value: unknown) => {
    setFormValues((prevFormValues) => {
      return {
        ...prevFormValues,
        [fieldName]: value,
      };
    });
  };

  const shouldShowAtlantic = () => { return AtlanticProvinces.includes(formValues.workProvinceTerritory); };
  const shouldShowSaskatchewan = () => { return formValues.workProvinceTerritory === 'Saskatchewan, Canada'; };
  const shouldShowManitoba = () => { return formValues.workProvinceTerritory === 'Manitoba, Canada'; };
  const shouldShowAlberta = () => { return formValues.workProvinceTerritory === 'Alberta, Canada'; };

  useEffect(() => {
    if (formNumber !== 6) return;
    if (onchange) {
      onchange(formValues.haveWrittenOffer === '');
    }
  }, [formValues, formNumber]);

  return (
    <div className='flex flex-col gap-4 md:gap-8'>
      <FormRadioInput
        fields={haveWrittenOffer}
        onChange={(e) => {
          handleFieldChange('haveWrittenOffer', e.target.value);
        }}
        required
      />
      <div style={{ display: formValues.haveWrittenOffer === 'Yes' ? 'block' : 'none', gap: '2rem' }}>
        <div className="flex flex-col gap-4 md:grid grid-cols-2">
          <FormDropdown
            options={occupations || []}
            label={occupation[0].label}
            value={formValues.occupation}
            onChange={(e) => {
              handleFieldChange('occupation', e.target.value);
            }}
          />
          <FormDropdown
            options={workProvinceTerritory[0].options}
            label={workProvinceTerritory[0].label}
            value={formValues.workProvinceTerritory}
            onChange={(e) => {
              handleFieldChange('workProvinceTerritory', e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-4 md:grid grid-cols-2">
          <FormRadioInput
            fields={workHoursOptions}
            onChange={(e) => {
              handleFieldChange('workHoursOptions', e.target.value);
            }}
          />
          <FormRadioInput
            fields={contractDurationOptions}
            onChange={(e) => {
              handleFieldChange('contractDurationOptions', e.target.value);
            }}
          />
          <FormRadioInput
            fields={jobOfferUnderLIMA}
            onChange={(e) => {
              handleFieldChange('jobOfferUnderLIMA', e.target.value);
            }} />
          <div style={{ display: shouldShowAtlantic() ? 'block' : 'none' }}>
            <FormRadioInput
              fields={jobOfferUnderAtlanticProvince}
              onChange={(e) => {
                handleFieldChange('jobOfferUnderAtlanticProvince', e.target.value);
              }}
            />
          </div>
          <div style={{ display: shouldShowSaskatchewan() ? 'block' : 'none' }}>
            <FormRadioInput
              fields={jobOfferFieldSaskatchewan}
              onChange={(e) => {
                handleFieldChange('jobOfferFieldSaskatchewan', e.target.value);
              }}
            />
          </div>

          <div style={{ display: shouldShowAlberta() ? 'block' : 'none' }}>
            <FormRadioInput
              fields={jobOfferFieldAlberta}
              onChange={(e) => {
                handleFieldChange('jobOfferFieldAlberta', e.target.value);
              }}
            />
          </div>
          <div style={{ display: shouldShowManitoba() ? 'block' : 'none' }}>
            <FormRadioInput
              fields={jobOfferFieldManitoba}
              onChange={(e) => {
                handleFieldChange('jobOfferFieldManitoba', e.target.value);
              }}
            />
          </div>
        </div>
      </div>

    </div>
  );
};
