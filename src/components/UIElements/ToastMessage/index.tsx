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
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        exit={{ y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`truncate min-w-[224px] px-4 py-2 absolute left-0 top-24 lg:top-[-44px] bg-pale-sandal ${containerCss}`}
      >
        <span className={textCss}>{message}</span>
      </motion.div>
    </AnimatePresence>
  );
};

export default ToastMessage;
