'use client';

import { useState } from 'react';
import { FormDropdown } from '../components/FormDropDown';
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

const initialStates = {
  englishWrite: '',
  englishSpeak: '',
  englishListen: '',
  englishRead: '',
  frenchWrite: '',
  frenchSpeak: '',
  frenchListen: '',
  frenchRead: '',
};

export const LanguageSection = () => {
  const [formValues, setFormValues] = useState(initialStates);

  const handleFieldChange = (fieldName: string, value: unknown) => {
    setFormValues((prevFormValues) => {
      return {
        ...prevFormValues,
        [fieldName]: value,
      };
    });
  };
  return (
    <div>
      <p className="mb-5">
        Please describe your proficiency in English and/or French under each of the four skills listed below.{' '}
      </p>
      {/* English Skills */}
      <div>
        <span className='block text-xl font-[500] mb-2'>English</span>
        <div className="grid grid-cols-4 gap-4">
          <FormDropdown
            options={englishListeningLevels[0].options}
            label={englishListeningLevels[0].label}
            value={formValues.englishListen}
            onChange={(e) => {
              handleFieldChange('englishListen', e.target.value);
            }}
          />
          <FormDropdown
            options={englishWritingLevels[0].options}
            label={englishWritingLevels[0].label}
            value={formValues.englishWrite}
            onChange={(e) => {
              handleFieldChange('englishWrite', e.target.value);
            }}
          />
          <FormDropdown
            options={englishSpeakingLevels[0].options}
            label={englishSpeakingLevels[0].label}
            value={formValues.englishSpeak}
            onChange={(e) => {
              handleFieldChange('englishSpeak', e.target.value);
            }}
          />
          <FormDropdown
            options={englishReadingLevels[0].options}
            label={englishReadingLevels[0].label}
            value={formValues.englishRead}
            onChange={(e) => {
              handleFieldChange('englishRead', e.target.value);
            }}
          />
        </div>
      </div>
      {/* French Skills */}
      <div>
        <span className='block text-xl font-[500] mb-2'>French</span>
        <div className="grid grid-cols-4 gap-4">
          <FormDropdown
            options={frenchListeningLevels[0].options}
            label={frenchListeningLevels[0].label}
            value={formValues.frenchListen}
            onChange={(e) => {
              handleFieldChange('frenchListen', e.target.value);
            }}
          />
          <FormDropdown
            options={frenchWritingLevels[0].options}
            label={frenchWritingLevels[0].label}
            value={formValues.frenchWrite}
            onChange={(e) => {
              handleFieldChange('frenchWrite', e.target.value);
            }}
          />
          <FormDropdown
            options={frenchSpeakingLevels[0].options}
            label={frenchSpeakingLevels[0].label}
            value={formValues.frenchSpeak}
            onChange={(e) => {
              handleFieldChange('frenchSpeak', e.target.value);
            }}
          />
          <FormDropdown
            options={frenchReadingLevels[0].options}
            label={frenchReadingLevels[0].label}
            value={formValues.frenchRead}
            onChange={(e) => {
              handleFieldChange('frenchRead', e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};
