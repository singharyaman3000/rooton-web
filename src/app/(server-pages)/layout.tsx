import Header from '@/components/Header';
import React from 'react';
import Footer from '@/components/Footer';
import { getHeaderFooterData } from '../services/apiService/headerFooterAPI';
import { HeaderFooterDataProvider } from '@/providers/headerFooterDataProvider';
import ServiceListingOnAdviceMobile from '@/components/HomePage/ServiceListingOnAdvice/ServiceListOnAdviceMobile';
import IModalShowContextProvider from '@/providers/coreServicesMOdalOpenContext';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const apiRes = await getHeaderFooterData();
  return (
    <HeaderFooterDataProvider headerFooterAPIData={apiRes}>
      <IModalShowContextProvider>
        <ServiceListingOnAdviceMobile />
        <Header />
        {children}
        <Footer />
      </IModalShowContextProvider>
    </HeaderFooterDataProvider>
  );
}
