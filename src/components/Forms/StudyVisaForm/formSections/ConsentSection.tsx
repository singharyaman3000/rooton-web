import React, { useEffect } from 'react';
import { consultationType, rootOnHelp } from '../config/formConfig';
import { IPropsType } from '../config/models';
import { FormRadioInput } from '../../components/FormRadioInput';
import { FormSingleCheckBoxInput } from '../../components/FormSingleCheckBoxInput';
import { texts } from '@/constants/texts';
import { PrivacyPolicy } from '../../components/PrivacySection';

export const ConsentSection: React.FC<IPropsType> = ({ onchange, formNumber, isInValid, formData }) => {

  useEffect(() => {
    if (formNumber !== 4 || !isInValid) return;
    isInValid(!formData?.preferred_consultation_type_);
  }, [formData, formNumber]);

  return (
    <div>
      <div className="hs-form-field">
        <div className="flex flex-row">
          <label className="hs-main-font-element" htmlFor={'How can Root On help you?'}>
            {'How can Root On help you?'}
          </label>
        </div>

        {rootOnHelp.map((item) => {
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
      <FormRadioInput
        required
        fields={consultationType}
        value={formData?.preferred_consultation_type_}
        onChange={(e) => {
          onchange('preferred_consultation_type_', e.target.value);
        }}
      />
      <FormSingleCheckBoxInput
        id="FSW-Form-consent"
        value={
          formData?.i_consent_to_receive_email_communications_from_root_on_regarding_my_canadian_immigration_inquiry_
        }
        label={texts.CONSENT}
        onChange={(value: 'Yes' | 'No') => {
          onchange(
            'i_consent_to_receive_email_communications_from_root_on_regarding_my_canadian_immigration_inquiry_',
            value,
          );
        }}
      />
      <PrivacyPolicy />
    </div>
  );
};
