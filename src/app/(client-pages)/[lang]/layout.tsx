'use client';

import useClient from '@/hooks/useClient';
import React, { ReactNode } from 'react';
import Translator from './translator';

const ClientPageLayout = ({ children }: { children: ReactNode }) => {
  const { isClient } = useClient();

  return (
    <section>
      {isClient && (
        <>
          {' '}
          <Translator /> {children}
        </>
      )}
    </section>
  );
};

export default ClientPageLayout;
