import { ClientContainer } from '@/components/Containers/ClientContainer';
import React, { useEffect, useState } from 'react';
import  WhatsAppButton from '@/components/WhatsApp-Integration';
import { getHeaderFooterData, IWhatsAppAttributes } from '@/app/services/apiService/headerFooterAPI';


export interface IWhatsAppProps {
  whatsapp: IWhatsAppAttributes;
  hideTemplate: () => void;
  showTypingInitial: boolean;
}

const ClientWhatsAppButton = () => {
  const [whatsAppData, setWhatsAppData] = useState<IWhatsAppAttributes | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      const headerFooterData = await getHeaderFooterData();

      setWhatsAppData(headerFooterData[0]?.attributes?.whats_app?.data?.attributes ?? null);

    };

    fetchData();
  }, []);

  const shouldRenderWhatsAppButton = whatsAppData != null;

  return (
    <ClientContainer>
      {shouldRenderWhatsAppButton && (
        <WhatsAppButton whatsapp={whatsAppData} />
      )}
    </ClientContainer>
  );
};

export default ClientWhatsAppButton;
