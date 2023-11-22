'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToastMessageProps {
  message: string;
  durationInSeconds?: number;
  containerCss?: string;
  textCss?: string;
}

const ToastMessage = ({ message, containerCss, textCss, durationInSeconds = 2 }: ToastMessageProps) => {
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, durationInSeconds * 1000);
    return () => {
      return clearTimeout(timer);
    };
  }, [durationInSeconds]);

  return (
    showToast && (
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
    )
  );
};

export default ToastMessage;
