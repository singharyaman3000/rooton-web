import React, { useState, useEffect } from 'react';
import styles from '../WhatsApp-Integration/WhatsappCss.module.css';

const TypingAnimation = () => {
  return (
    <div className={styles.ChatLayout_Author}>
      <svg width="40" height="17" xmlns="http://www.w3.org/2000/svg">
        <foreignObject width="40" height="17">
          <div className={styles.typing}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>
        </foreignObject>
      </svg>
    </div>
  );
};

export default TypingAnimation;
