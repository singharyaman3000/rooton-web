'use client';

import { useHeaderFooterContext } from '@/providers/headerFooterDataProvider';
import React, { ReactNode, useEffect } from 'react';

export interface ILanguage {
  key: string;
  label: string;
  icon: ReactNode;
}

const Translator = () => {
  const { headerFooterData } = useHeaderFooterContext();

  const googleTranslateElementInit = () => {
    // eslint-disable-next-line no-new
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        // includedLanguages: 'en,pa,pt,es,hi,it,de,gu', // include this for selected languages
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
    const langCode = window.location.href.split(String(process.env.NEXT_APP_BASE_URL))[1].split('/')[0];
    const language = headerFooterData?.[0]?.attributes.languages.data?.find((lan) => lan.attributes.code === langCode);
    const appMainDomain = process.env.NEXT_APP_MAIN_DOMAIN;
    document.cookie = `googtrans=/en/${
      language ? language.attributes.code : 'en'
    }; + new Date + ;path=/;domain=${appMainDomain}`;
    document.cookie = `googtrans=/en/${language ? language.attributes.code : 'en'}; path=/`;
  }, [headerFooterData]);

  return <div id="google_translate_element"></div>;
};

export default Translator;
