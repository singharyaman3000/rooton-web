import React, { useState, useEffect } from 'react';
import styles from './sop.module.css';

const messages = [
  'Designing your roadmap to success...',
  'Turning your visions into statements...',
  'Personalizing your pathway to potential...',
  'Sculpting your purpose with precision...',
  'Hold tight, great content coming!',
  'Just a moment, we\'re almost there.',
  'Wait for a while, it\'s worth it!',
  'Your patience is appreciated!',
];

const Loader: React.FC = () => {
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prevCurrentMessage) => {return (prevCurrentMessage + 1) % messages.length;});
    }, 4000);

    return () => {return clearInterval(interval);};
  }, []);

  return (
    <div className="flex flex-col justify-center h-screen w-full items-center">
      <div className={styles.loader}></div>
      <p className={styles.loaderText}>{messages[currentMessage]}</p>
    </div>
  );
};

export default Loader;
