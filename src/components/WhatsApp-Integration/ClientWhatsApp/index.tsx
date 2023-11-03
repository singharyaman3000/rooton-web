import { ClientContainer } from '@/components/Containers/ClientContainer';
import React, { useEffect, useState } from 'react';
import  WhatsAppButton from '@/components/WhatsApp-Integration';
import { getHeaderFooterData } from '@/app/services/apiService/headerFooterAPI';

const ClientWhatsAppButton = () => {
  const [whatsAppData, setWhatsAppData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const headerFooterData = await getHeaderFooterData();

      setWhatsAppData(headerFooterData[0]?.attributes?.whats_app?.data?.attributes);
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
