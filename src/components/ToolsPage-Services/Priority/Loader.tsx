/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import styles from './Priority.module.css';

// const messages = [
//   'Recommendation is on the way...',
//   'Hold tight, great content coming!',
//   'Just a moment, we\'re almost there.',
//   'Wait for a while, it\'s worth it!',
//   'Your patience is appreciated!',
// ];

const messages = [
  'Hanging tight while we check if your dreams are Canadian enough!', 'Hold on, we\'re making sure the moose are in line for your grand Canadian adventure!', 'Just a moment – we\'re politely asking the courses to line up for you, eh!', 'Hang tight, we\'re checking if your courses are polite enough for Canada!', 'One sec, we\'re just finishing our poutine before we get your results!', 'Almost there, we\'re just asking a Mountie for directions to your courses!', 'Wait up, we\'re making sure none of your courses are afraid of snow!', 'Hold on, we\'re knitting a digital toque to warm up your results!', 'Just a moose-ment, we\'re gathering all the friendly courses for you!', 'Patience, please – we\'re on a syrup run to fuel up your course list!',
];

const Loader: React.FC = () => {
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((Message) => {return (Message + 1) % messages.length;});
    }, 4000);

    return () => {return clearInterval(interval);};
  }, []);

  return (
    <div className="flex justify-center h-screen w-full items-center flex-col">
      <div className={styles.loader}></div>
      <p className={styles.loaderText}>{messages[currentMessage]}</p>
    </div>
  );
};

export default Loader;
