'use client';

import React, { useState, useEffect } from 'react';
import WhatsappIcon from '../Icons/WhatsappIcon';
import WhatsApp_Temp from './whatsappTemplate';
import styles from './WhatsappCss.module.css';

function WhatsAppButton() {
  const [showTemplate, setShowTemplate] = useState(false);
  const [showTypingInitial, setShowTypingInitial] = useState(true);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 425);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogoClick = () => {
    if (isMobileView) {
      handleClick();
      return;
    }
    setShowTemplate((prev) => !prev);

    if (showTypingInitial) {
      setTimeout(() => {
        setShowTypingInitial(false);
      }, 3000);
    }
  };
  const handleClick = () => {
    window.open('https://wa.me/1234567890', '_blank', 'width=1080,height=800,left=200,top=200');
  };

  return (
    <div
      style={{
        position: 'fixed',
        right: '10px',
        bottom: '10px',
        cursor: 'pointer',
        zIndex: '1000',
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          handleLogoClick();
        }
      }}
    >
      <div className={showTemplate ? styles.fade_show : styles.fade}>
        <WhatsApp_Temp hideTemplate={handleLogoClick} showTypingInitial={showTypingInitial} />
      </div>

      <div onClick={handleLogoClick}>
        <WhatsappIcon /> {}
      </div>
    </div>
  );
}

export default WhatsAppButton;
