'use client';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';

export interface ILanguage {
  key: string;
  label: string;
}

export const languages = [
  { key: 'en', label: 'English' },
  { key: 'es', label: 'Spanish' },
  { key: 'pu', label: 'Punjabi' },
  { key: 'pt', label: 'Portuguese' },
  { key: 'fr', label: 'France' },
  { key: 'it', label: 'Italian' },
  { key: 'de', label: 'German' },
];

const Translator = () => {
  const params = useParams();
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        includedLanguages: 'en,pa,pt,es,hi,it,de', // include this for selected languages
        // layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      'google_translate_element',
    );
  };

  useEffect(() => {
    if (!window.googleTranslateElementInit) {
      var addScript = document.createElement('script');
      addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
      document.body.appendChild(addScript);
      window.googleTranslateElementInit = googleTranslateElementInit;
      const language = languages.find((lan)=>lan.key === params.lang)
      document.cookie = `googtrans=/en/${language ? language.key : 'en'}`;
    }
  }, [params]);

  return <div id="google_translate_element"></div>;
};

export default Translator;
