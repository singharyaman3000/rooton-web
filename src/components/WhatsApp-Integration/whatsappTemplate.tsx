'use client';

import React, { useState, useEffect } from 'react';
import styles from './WhatsappCss.module.css';
import WhatsappInlineIcon from '../Icons/WhatsappInlineIcon';
import TypingAnimation from '../Icons/TypingAnimation';

type WhatsAppTempProps = {
  hideTemplate: () => void;
  showTypingInitial: boolean;
};

let isInitialLoad = true;

const WhatsApp_Temp: React.FC<WhatsAppTempProps> = ({ hideTemplate, showTypingInitial }) => {
  const [showTyping, setShowTyping] = useState(showTypingInitial);

  useEffect(() => {
    setShowTyping(showTypingInitial);
  }, [showTypingInitial]);

  const handleButtonClick = () => {
    console.log('Clicked!');
    window.open('https://wa.me/1234567890', '_blank', 'width=1080,height=800,left=200,top=200');
  };

  return (
    <>
      <div className={styles.template}>
        <div className={styles.header}>
          <div className={styles.cancel} onClick={hideTemplate}></div>
          <div className={styles.logo_whatsApp}>
            <div className={styles.avatar}>
              <img src="https://i.ibb.co/BnDptt4/rooton.jpg" alt="Profile" />
            </div>
          </div>
          <div className={styles.text}>
            <div className={styles.header_name}>Root On Immigration Consultants Pvt. Ltd.</div>
            <div className={styles.header_status}>Typically replies within a minute</div>
          </div>
        </div>
        {showTypingInitial ? (
          <div className={styles.chat_layout}>
            <div className={styles.chat_layout_message}>
              <div className={styles.WhatsApp_component}>
                <div className={styles.WhatsApp_component1}>
                  <div className={styles.WhatsApp_Dot}></div>
                  <div className={styles.WhatsApp_Dot1}></div>
                  <div className={styles.WhatsApp_Dot2}></div>
                </div>
              </div>
              <div className={styles.ChatLayout_Message}>
                <TypingAnimation />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.chat_layout}>
              <div className={styles.chat_layout_message}>
                <div className={styles.WhatsApp_component}>
                  <div className={styles.WhatsApp_component1}>
                    <div className={styles.WhatsApp_Dot}></div>
                    <div className={styles.WhatsApp_Dot1}></div>
                    <div className={styles.WhatsApp_Dot2}></div>
                  </div>
                </div>
                <div className={styles.ChatLayout_Message1}>
                  <div className={styles.ChatLayout_Author}>Root On Immigration Consultants...</div>
                  <div className={styles.ChatLayout_Text}>
                    Hi there 🍁
                    <br />
                    <br />
                    let's chat about your dreams. 🇨🇦
                  </div>
                  <div className={styles.ChatLayout_TimeBottom}>13:40</div>
                </div>
              </div>
            </div>
          </>
        )}
        <button className={styles.WhatsApp_button} title="WhatsApp" role="button" onClick={handleButtonClick}>
          <span className={styles.ButtonBase}>
            <div className={styles.ButtonBase1}>
              <div className={styles.Icon_Container}>
                <div>
                  <WhatsappInlineIcon />
                </div>
              </div>
            </div>
            <span className={styles.ButtonBase2}>Start Chat</span>
          </span>
        </button>
      </div>
    </>
  );
};

export default WhatsApp_Temp;
