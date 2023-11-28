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
import IModalShowContextProvider from '@/providers/coreServicesMOdalOpenContext';
import MobileModalShowContextProvider from '@/providers/coreServicesModalMobileContext';
import ServiceListingOnAdviceMobile from '@/components/HomePage/CoreServiceListing/ServiceListOnAdviceMobile';
import ServicesPopUpModal from '@/components/HomePage/CoreServiceListing/ServicesPopUpModal';
import { getNewsAlertContent } from '@/app/services/apiService/newsAlertAPI';

const ClientPageLayout = ({ children }: { children: ReactNode }) => {
  const { isClient } = useClient();
  const { data } = useClientAPI({ apiFn: getHeaderFooterData });
  const { data: newsAlertResponse } = useClientAPI({ apiFn: getNewsAlertContent });

  return (
    <section>
      {isClient && (
        <HeaderFooterDataProvider
          headerFooterAPIData={data}
          newsAlertAPIData={newsAlertResponse}
        >
          <TranslationLoadingProvider>
            <IModalShowContextProvider>
              <MobileModalShowContextProvider>
                <ServiceListingOnAdviceMobile />
                <ServicesPopUpModal />
                <Translator />
                <ClientHeader />
                {children}
                <ClientFooter />
              </MobileModalShowContextProvider>
            </IModalShowContextProvider>
          </TranslationLoadingProvider>
        </HeaderFooterDataProvider>
      )}
    </section>
  );
};

export default ClientPageLayout;
