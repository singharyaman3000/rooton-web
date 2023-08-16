'use client';

import useClient from '@/hooks/useClient';
import React, { ReactNode } from 'react';
import Translator from './translator';
import { TranslationLoadingProvider } from '@/providers/translationLoadingProvider';
import useClientAPI from '@/components/UIElements/Slider/hooks/useClientAPI';
import { getHeaderFooterData } from '@/app/services/apiService/headerFooterAPI';
import { HeaderFooterDataProvider } from '@/providers/headerFooterDataProvider';
import ClientFooter from '@/components/Footer/ClientFooter';
import ClientHeader from '@/components/Header/ClientHeader';

const ClientPageLayout = ({ children }: { children: ReactNode }) => {
  const { isClient } = useClient();
  const { data } = useClientAPI({ apiFn: getHeaderFooterData });

  return (
    <section>
      {isClient && (
        <HeaderFooterDataProvider headerFooterAPIData={data}>
          <TranslationLoadingProvider>
            <Translator />
            <ClientHeader />
            {children}
            <ClientFooter />
          </TranslationLoadingProvider>
        </HeaderFooterDataProvider>
      )}
    </section>
  );
};

export default ClientPageLayout;
