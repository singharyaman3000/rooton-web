'use client';

import React, { useState, useEffect } from 'react';
import WhatsappIcon from '../Icons/WhatsappIcon';
import WhatsAppTemp from './whatsappTemplate';
import styles from './WhatsappCss.module.css';
import { getHeaderFooterData, IWhatsAppAttributes } from '@/app/services/apiService/headerFooterAPI';

export interface IWhatsAppProps {
  whatsapp: IWhatsAppAttributes | undefined;
  hideTemplate: () => void;
  showTypingInitial: boolean;
}

const WhatsAppButton: React.FC<{ whatsapp: IWhatsAppAttributes, theme: string }> = ({ theme }) => {
  const [showTemplate, setShowTemplate] = useState(false);
  const [showTypingInitial, setShowTypingInitial] = useState(true);
  const [isMobileView, setIsMobileView] = useState(typeof window !== 'undefined' && window.innerWidth <= 768);
  const [whatsAppData, setWhatsAppData] = useState<IWhatsAppAttributes | undefined | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const headerFooterData = await getHeaderFooterData();
      setWhatsAppData(headerFooterData[0]?.attributes?.whats_app?.data?.attributes);
    };
    fetchData();
  }, []);

  const handleLogoClick = () => {
    // If mobile view, open the WhatsApp link
    if (isMobileView) {
      const whatsAppLink = `https://wa.me/${whatsAppData?.whatsappnumber}?text=${encodeURIComponent(whatsAppData?.welcomeText || '')}`;
      window.open(whatsAppLink, '_blank', 'width=1080,height=800,left=200,top=200');
    } else {
      setShowTemplate((prev) => {return !prev;});
      if (showTypingInitial) {
        setTimeout(() => {return setShowTypingInitial(false);}, 1000);
      }
    }
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {return window.removeEventListener('resize', handleResize);};
  }, []);

  return (
    <div className={styles.whatsAppIntegration}>
      <div className={showTemplate ? styles.fade_show : styles.fade}>{showTemplate && whatsAppData && (<WhatsAppTemp
        hideTemplate={() => {return setShowTemplate(false);}}
        showTypingInitial={showTypingInitial}
        whatsapp={whatsAppData}
      />
      )}
      </div>
      <div
        onClick={handleLogoClick}
        role="button"
        tabIndex={0}
        aria-label="Open WhatsApp"
        className={styles.whatsappIconContainer}
      >
        <WhatsappIcon theme={theme}/>
      </div>
    </div>
  );
};

export default WhatsAppButton;
