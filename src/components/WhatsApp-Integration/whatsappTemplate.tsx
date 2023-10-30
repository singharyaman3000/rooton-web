'use client';

import React, { useState, useEffect, useCallback } from 'react';
import styles from './WhatsappCss.module.css';
import WhatsappInlineIcon from '../Icons/WhatsappInlineIcon';
import TypingAnimation from '../Icons/TypingAnimation';
import { IWhatsAppAttributes } from '@/app/services/apiService/headerFooterAPI';

// type WhatsAppTempProps = {
//   hideTemplate: () => void;
//   showTypingInitial: boolean;
// };

export interface IWhatsAppProps {
  whatsapp: IWhatsAppAttributes;
  hideTemplate: () => void;
  showTypingInitial: boolean;
}

// New combined props type
// type IWhatsAppTempProps = WhatsAppTempProps & IWhatsAppProps;

const WhatsAppTemp = ({
  hideTemplate,
  whatsapp,
  showTypingInitial,
}: IWhatsAppProps) => {

  useEffect(() => {
    console.log("WhatsApp number: ", whatsapp.whatsappnumber);
    console.log("Contact name: ", whatsapp.contactname);
    console.log("Default message: ", whatsapp.defaultmessage);
  }, [whatsapp]);

  // State to manage whether to show typing animation or not
  const [showTyping, setShowTyping] = useState(showTypingInitial);

  // Update showTyping state when showTypingInitial prop changes
  useEffect(() => {
    setShowTyping(showTypingInitial);
  }, [showTypingInitial]);

  /**
   * Handles the button click event by opening a new window with the specified URL and dimensions.
   *
   * @return {void} No return value.
   */
  const handleButtonClick = () => {
    window.open(`https://wa.me/${whatsapp.whatsappnumber}`, '_blank', 'width=1080,height=800,left=200,top=200');
  };



  // Render the WhatsAppTemp component
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
            <img src="https://i.ibb.co/BnDptt4/rooton.jpg" alt="Profile" />
          </div>
        </div>
        <div className={styles.text}>
        <div className={styles.header_name}>{whatsapp.contactname}</div>
          <div className={styles.header_status}>{whatsapp.status}</div>
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
              <div className={styles.ChatLayout_Author}>Root On Immigration Consultants...</div>
              <div className={styles.ChatLayout_Text}>
                {/* Hi there&nbsp;🍁
                <br />
                <br />
                let&apos;s chat about your dreams. 🇨🇦 */}
                <p>{whatsapp.defaultmessage}</p>
              </div>
              <div className={styles.ChatLayout_TimeBottom}>13:40</div>
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