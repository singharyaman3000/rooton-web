'use client';

import useClient from '@/hooks/useClient';
import React, { ReactNode, useEffect, useState } from 'react';
import Translator from './translator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { TranslationLoadingProvider } from '@/providers/translationLoadingProvider';

const ClientPageLayout = ({ children }: { children: ReactNode }) => {
  const { isClient } = useClient();
  return (
    <section>
      {isClient  && (
        <TranslationLoadingProvider>
          <Header />
          <Translator />
          {children}
          <Footer />
        </TranslationLoadingProvider>
      )}
    </section>
  );
};

export default ClientPageLayout;
