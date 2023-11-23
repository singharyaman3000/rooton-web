'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Dispatch, SetStateAction, useEffect } from 'react';

interface ToastMessageProps {
  message: string;
  setShowToast: Dispatch<SetStateAction<boolean>>;
  durationInSeconds?: number;
  containerCss?: string;
  textCss?: string;
}

const ToastMessage = ({ message, containerCss, textCss, durationInSeconds = 2, setShowToast }: ToastMessageProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, durationInSeconds * 1000);

    return () => {
      return clearTimeout(timer);
    };
  }, [durationInSeconds, setShowToast]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        exit={{ x: 100 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`px-4 py-2.5 fixed right-0 top-[100px] bg-pale-sandal ${containerCss}`}
      >
        <span className={textCss}>{message}</span>
      </motion.div>
    </AnimatePresence>
  );
};

export default ToastMessage;
