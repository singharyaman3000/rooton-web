'use client';

import React, { useState, useEffect, useCallback } from 'react';
import styles from './WhatsappCss.module.css';
import WhatsappInlineIcon from '../Icons/WhatsappInlineIcon';
import TypingAnimation from '../Icons/TypingAnimation';
import { IWhatsAppAttributes } from '@/app/services/apiService/headerFooterAPI';
import { appendAssetUrl } from '@/utils';

export interface IWhatsAppProps {
  whatsapp: IWhatsAppAttributes;
  hideTemplate: () => void;
  showTypingInitial: boolean;
}

const WhatsAppTemp: React.FC<IWhatsAppProps> = ({ hideTemplate, whatsapp, showTypingInitial }) => {
  const [showTyping, setShowTyping] = useState(showTypingInitial);

  const profileImageUrl = whatsapp?.profile_image?.data?.[0]?.attributes?.url || '';

  useEffect(() => {
    setShowTyping(showTypingInitial); 
  }, [showTypingInitial]);
  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const contact_name = (name: any) => {
    const maxLength = 7;
    if (name.length > maxLength) {
      return name.substring(0, maxLength) + '';
    }
    return name;
  };

  const default_message = (message: any) => {
    const maxLength = 41 - 2;
    if (message.length > maxLength) {
      return message.substring(0, maxLength) + '🍁...';
    }
    return message + '🍁...';
  };
  const handleButtonClick = () => {
    window.open(`https://wa.me/${whatsapp.whatsappnumber}`, '_blank', 'width=1080,height=800,left=200,top=200');
  };

  return (
    <div className={styles.template}>
      <div className={styles.header}>
        <button
          type="button"
          className={styles.cancel}
          onClick={useCallback(() => {
            return hideTemplate();
          }, [hideTemplate])}
        >
          {' '}
        </button>
        <div className={styles.logo_whatsApp}>
          <div className={styles.avatar}>
            <img src={appendAssetUrl(profileImageUrl)} alt="Profile" /> 
          </div>
        </div>
        <div className={styles.text}>
          <div title={whatsapp?.contactname} className={styles.header_name}>{whatsapp?.contactname}</div>
          <div className={styles.header_status}>{whatsapp?.status}</div>
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
              <div className={styles.ChatLayout_Author}>{contact_name(whatsapp.contactname)}</div>
              <div className={styles.ChatLayout_Text}>
                <p title={whatsapp.defaultmessage}>{default_message(whatsapp?.defaultmessage)}</p>
                <br />
              </div>
              <div className={styles.ChatLayout_TimeBottom}>{getCurrentTime()}</div>
            </div>
          </div>
        </div>
      )}
      <button className={styles.WhatsApp_button} type="button" title="WhatsApp" onClick={handleButtonClick}>
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
  );
};

export default WhatsAppTemp;
