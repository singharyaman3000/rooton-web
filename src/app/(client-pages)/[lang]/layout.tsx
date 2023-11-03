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
import ClientWhatsAppButton from '@/components/WhatsApp-Integration/ClientWhatsApp';
import IModalShowContextProvider from '@/providers/coreServicesMOdalOpenContext';
import MobileModalShowContextProvider from '@/providers/coreServicesModalMobileContext';
import ServiceListingOnAdviceMobile from '@/components/HomePage/CoreServiceListing/ServiceListOnAdviceMobile';
import ServicesPopUpModal from '@/components/HomePage/CoreServiceListing/ServicesPopUpModal';


const ClientPageLayout = ({ children }: { children: ReactNode }) => {
  const { isClient } = useClient();
  const { data } = useClientAPI({ apiFn: getHeaderFooterData });

  return (
    <section>
      {isClient && (
        <HeaderFooterDataProvider headerFooterAPIData={data}>
          <TranslationLoadingProvider>
            <IModalShowContextProvider>
              <MobileModalShowContextProvider>
                <ServiceListingOnAdviceMobile />
                <ServicesPopUpModal />
                <Translator />
                <ClientHeader />
                <ClientWhatsAppButton/>
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
