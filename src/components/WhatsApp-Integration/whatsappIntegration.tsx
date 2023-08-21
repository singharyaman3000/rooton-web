'use client';

import React, { useState, useEffect } from 'react';
import WhatsappIcon from '../Icons/WhatsappIcon';
import WhatsAppTemp from './whatsappTemplate';
import styles from './WhatsappCss.module.css';

/**
 * Renders a WhatsApp button component.
 */
function WhatsAppButton() {
  // State variables
  const [showTemplate, setShowTemplate] = useState(false);
  const [showTypingInitial, setShowTypingInitial] = useState(true);
  const [isMobileView, setIsMobileView] = useState(typeof window !== 'undefined' && window.innerWidth <= 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  /**
   * Opens a WhatsApp chat window.
   */
  const handleClick = () => {
    window.open('https://wa.me/1234567890', '_blank', 'width=1080,height=800,left=200,top=200');
  };

  /**
   * Handles the logo click event.
   */
  const handleLogoClick = () => {
    if (isMobileView) {
      handleClick();
      return;
    }
    setShowTemplate((prev) => {
      return !prev;
    });

    if (showTypingInitial) {
      setTimeout(() => {
        setShowTypingInitial(false);
      }, 3000);
    }
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
        <WhatsAppTemp hideTemplate={handleLogoClick} showTypingInitial={showTypingInitial} />
      </div>

      <div onClick={handleLogoClick} role="button" tabIndex={0}>
        <WhatsappIcon /> {}
      </div>
    </div>
  );
}

export default WhatsAppButton;
