'use client';

import { useHeaderFooterContext } from '@/providers/headerFooterDataProvider';
import { useParams } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';

export interface ILanguage {
  key: string;
  label: string;
  icon: ReactNode;
}

const Translator = () => {
  const params = useParams();
  const { headerFooterData } = useHeaderFooterContext();

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
    if (params.lang) {
      const addScript = document.createElement('script');
      addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
      document.body.appendChild(addScript);
      window.googleTranslateElementInit = googleTranslateElementInit;
      const language = headerFooterData?.attributes.languages.data?.find((lan) => lan.attributes.code === params.lang);
      const domain = window.location.hostname;
      // document.cookie = 'googtrans=;Path=/; ';
      document.cookie = `googtrans=/en/${language ? language.attributes.code : 'en'}; domain=${domain}; path=/`;
    }
  }, [params]);

  return <div id="google_translate_element"></div>;
};

export default Translator;
