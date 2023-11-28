import React from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getNewsAlertContent } from '../services/apiService/newsAlertAPI';
import { IBlogDetailsResponse } from '../services/apiService/blogDetailAPI';
import { getHeaderFooterData } from '../services/apiService/headerFooterAPI';
import { HeaderFooterDataProvider } from '@/providers/headerFooterDataProvider';
import IModalShowContextProvider from '@/providers/coreServicesMOdalOpenContext';
import ServiceListingOnAdviceMobile from '@/components/HomePage/CoreServiceListing/ServiceListOnAdviceMobile';
import ServicesPopUpModal from '@/components/HomePage/CoreServiceListing/ServicesPopUpModal';
import MobileModalShowContextProvider from '@/providers/coreServicesModalMobileContext';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const apiRes = await getHeaderFooterData();
  const newsAlertResponse = (await getNewsAlertContent()) as IBlogDetailsResponse;

  return (
    <HeaderFooterDataProvider headerFooterAPIData={apiRes} newsAlertAPIData={newsAlertResponse}>
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
