import Header from '@/components/Header';
import React from 'react';
import Footer from '@/components/Footer';
import { getHeaderFooterData } from '../../services/apiService/headerFooterAPI';
import { HeaderFooterDataProvider } from '@/providers/headerFooterDataProvider';
import IModalShowContextProvider from '@/providers/coreServicesMOdalOpenContext';
import ServiceListingOnAdviceMobile from '@/components/CoachingPage/CoreServiceListing/ServiceListOnAdviceMobile';
import ServicesPopUpModal from '@/components/CoachingPage/CoreServiceListing/ServicesPopUpModal';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const apiRes = await getHeaderFooterData();
  return (
    <HeaderFooterDataProvider headerFooterAPIData={apiRes}>
      <IModalShowContextProvider>
        <ServiceListingOnAdviceMobile />
        <ServicesPopUpModal />
        {children}
      </IModalShowContextProvider>
    </HeaderFooterDataProvider>
  );
}
