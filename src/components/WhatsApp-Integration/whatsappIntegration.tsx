'use client';

import React, { useState, useEffect } from 'react';
import WhatsappIcon from '../Icons/WhatsappIcon';
import WhatsAppTemp from './whatsappTemplate';
import styles from './WhatsappCss.module.css';
import { getHeaderFooterData } from '@/app/services/apiService/headerFooterAPI';
import { IWhatsAppAttributes } from '@/app/services/apiService/headerFooterAPI';

export interface IWhatsAppProps {
  whatsapp: IWhatsAppAttributes;
  hideTemplate: () => void;
  showTypingInitial: boolean;
}

const WhatsAppButton = ({ whatsapp, }: IWhatsAppProps) => {
  // State variables
  const [showTemplate, setShowTemplate] = useState(false);
  const [showTypingInitial, setShowTypingInitial] = useState(true);
  const [isMobileView, setIsMobileView] = useState(typeof window !== 'undefined' && window.innerWidth <= 768);
  const [whatsAppData, setWhatsAppData] = useState(null);

  // Fetch WhatsApp data
  useEffect(() => {
    const fetchData = async () => {
      const headerFooterData = await getHeaderFooterData();
      // Adjust according to your actual API response structure
      setWhatsAppData(headerFooterData[0]?.attributes?.whats_app?.data?.attributes);
      console.log(headerFooterData[0]?.attributes?.whats_app?.data?.attributes,"dwdwd")
    };

    fetchData();
  }, []);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = () => {
    window.open(`https://wa.me/${whatsAppData.whatsappnumber}`, '_blank', 'width=1080,height=800,left=200,top=200');
  };

  const handleLogoClick = () => {
    if (isMobileView) {
      handleClick();
      return;
    }
    setShowTemplate(prev => !prev);

    if (showTypingInitial) {
      setTimeout(() => setShowTypingInitial(false), 3000);
    }
  };

  // Check if WhatsApp data is available
  if (!whatsAppData) {
    return <div>Loading...</div>; // Or any loading placeholder
  }

  return (
    <div style={{ position: 'fixed', right: '10px', bottom: '10px', cursor: 'pointer', zIndex: '1000' }}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => { if (event.key === 'Enter') handleLogoClick(); }}
    >
      <div className={showTemplate ? styles.fade_show : styles.fade}>
        <WhatsAppTemp
          hideTemplate={handleLogoClick}
          showTypingInitial={showTypingInitial}
          whatsapp={whatsAppData}  // Pass the data here
        />
      </div>

      <div onClick={handleLogoClick} role="button" tabIndex={0}>
        <WhatsappIcon />
      </div>
    </div>
  );
};

export default WhatsAppButton;
