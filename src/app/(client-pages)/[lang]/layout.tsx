'use client';

import useClient from '@/app/hooks/useClient';
import React, { ReactNode, useState } from 'react';
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
