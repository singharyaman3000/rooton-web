import Header from '@/components/Header';
import React from 'react';
import Footer from '@/components/Footer';
import { getHeaderFooterData } from '../services/apiService/headerFooterAPI';
import { HeaderFooterDataProvider } from '@/providers/headerFooterDataProvider';
import IModalShowContextProvider from '@/providers/coreServicesMOdalOpenContext';
import ServiceListingOnAdviceMobile from '@/components/HomePage/CoreServiceListing/ServiceListOnAdviceMobile';
import ServicesPopUpModal from '@/components/HomePage/CoreServiceListing/ServicesPopUpModal';
import MobileModalShowContextProvider from '@/providers/coreServicesModalMobileContext';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const apiRes = await getHeaderFooterData();
  return (
    <HeaderFooterDataProvider headerFooterAPIData={apiRes}>
      <IModalShowContextProvider>
        <MobileModalShowContextProvider>
          <ServiceListingOnAdviceMobile />
          <ServicesPopUpModal />
          <Header />
          {children}
          <Footer />
        </MobileModalShowContextProvider>
      </IModalShowContextProvider>
    </HeaderFooterDataProvider>
  );
}
