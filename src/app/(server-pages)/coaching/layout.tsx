import React from 'react';
import { getHeaderFooterData } from '../../services/apiService/headerFooterAPI';
import { HeaderFooterDataProvider } from '@/providers/headerFooterDataProvider';
import IModalShowContextProvider from '@/providers/coreServicesMOdalOpenContext';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const apiRes = await getHeaderFooterData();
  return (
    <HeaderFooterDataProvider headerFooterAPIData={apiRes}>
      <IModalShowContextProvider>
        {children}
      </IModalShowContextProvider>
    </HeaderFooterDataProvider>
  );
}
