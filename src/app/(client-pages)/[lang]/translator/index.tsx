'use client';

import FranceFlagIcon from '@/components/Icons/FranceFlagIcon';
import GermanyFlagIcon from '@/components/Icons/GermanyFlagIcon';
import IndiaFlagIconSm from '@/components/Icons/IndiaFlagIconSm';
import ItalyFlagIcon from '@/components/Icons/ItalyFlagIcon';
import PortugalFlagIcon from '@/components/Icons/PortugalFlagIcon';
import SpainflagIcon from '@/components/Icons/SpainflagIcon';
import UKFlagIcon from '@/components/Icons/UKFlagIcon';
import { useParams } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';

export interface ILanguage {
  key: string;
  label: string;
  icon: ReactNode;
}

export const languages: ILanguage[] = [
  { key: 'en', label: 'English', icon: <UKFlagIcon /> },
  { key: 'es', label: 'Spanish', icon: <SpainflagIcon /> },
  { key: 'pu', label: 'Punjabi', icon: <IndiaFlagIconSm /> },
  { key: 'pt', label: 'Portuguese', icon: <PortugalFlagIcon /> },
  { key: 'fr', label: 'France', icon: <FranceFlagIcon /> },
  { key: 'it', label: 'Italian', icon: <ItalyFlagIcon /> },
  { key: 'de', label: 'German', icon: <GermanyFlagIcon /> },
  { key: 'gu', label: 'Gujarati', icon: <IndiaFlagIconSm /> },
];

const Translator = () => {
  const params = useParams();
  const googleTranslateElementInit = () => {
    // eslint-disable-next-line no-new
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        includedLanguages: 'en,pa,pt,es,hi,it,de,gu', // include this for selected languages
        // layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      'google_translate_element',
    );
  };

  useEffect(() => {
    const addScript = document.createElement('script');
    addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
    const language = languages.find((lan) => lan.key === params.lang);
    document.cookie = `googtrans=/en/${language ? language.key : 'en'}`;
  }, [params]);

  return <div id="google_translate_element"></div>;
};

export default Translator;
