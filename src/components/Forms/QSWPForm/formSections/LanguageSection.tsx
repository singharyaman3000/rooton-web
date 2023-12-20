import React from 'react';
import {
  englishListeningLevels,
  englishReadingLevels,
  englishSpeakingLevels,
  englishWritingLevels,
  frenchListeningLevels,
  frenchReadingLevels,
  frenchSpeakingLevels,
  frenchWritingLevels,
} from '../config/formConfig';
import { IPropsType } from '../config/models';
import { FormDropdown } from '../../components/FormDropDown';

export const LanguageSection: React.FC<IPropsType> = ({ formData, onchange }) => {
  return (
    <div>
      <p className="mb-5 text-black">
        Please describe your proficiency in English and/or French under each of the four skills listed below.
      </p>
      {/* English Skills */}
      <div className="flex flex-col gap-4 md:grid grid-cols-4">
        <FormDropdown
          options={englishListeningLevels[0].options}
          label={englishListeningLevels[0].label}
          value={formData?.english_listening}
          onChange={(e) => {
            onchange('english_listening', e.target.value);
          }}
        />
        <FormDropdown
          options={englishWritingLevels[0].options}
          label={englishWritingLevels[0].label}
          value={formData?.english_writing}
          onChange={(e) => {
            onchange('english_writing', e.target.value);
          }}
        />
        <FormDropdown
          options={englishSpeakingLevels[0].options}
          label={englishSpeakingLevels[0].label}
          value={formData?.english_speaking}
          onChange={(e) => {
            onchange('english_speaking', e.target.value);
          }}
        />
        <FormDropdown
          options={englishReadingLevels[0].options}
          label={englishReadingLevels[0].label}
          value={formData?.english_reading}
          onChange={(e) => {
            onchange('english_reading', e.target.value);
          }}
        />
      </div>
      {/* French Skills */}
      <div className="flex flex-col gap-4 md:grid grid-cols-4">
        <FormDropdown
          options={frenchListeningLevels[0].options}
          label={frenchListeningLevels[0].label}
          value={formData?.french_listening}
          onChange={(e) => {
            onchange('french_listening', e.target.value);
          }}
        />
        <FormDropdown
          options={frenchWritingLevels[0].options}
          label={frenchWritingLevels[0].label}
          value={formData?.french_writing}
          onChange={(e) => {
            onchange('french_writing', e.target.value);
          }}
        />
        <FormDropdown
          options={frenchSpeakingLevels[0].options}
          label={frenchSpeakingLevels[0].label}
          value={formData?.french_speaking}
          onChange={(e) => {
            onchange('french_speaking', e.target.value);
          }}
        />
        <FormDropdown
          options={frenchReadingLevels[0].options}
          label={frenchReadingLevels[0].label}
          value={formData?.french_reading}
          onChange={(e) => {
            onchange('french_reading', e.target.value);
          }}
        />
      </div>
    </div>
  );
};
