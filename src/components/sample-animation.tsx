'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const SampleAnimation = () => {
  React.useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}blogs`)
      .then(() => {
        console.log('API call success');
      })
      .catch(() => {
        console.error('API call failed');
      });
  });

  return (
    <motion.h1
      initial={{ scale: 0 }}
      animate={{ rotate: 360, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
      className=" text-[48px]"
    >
      Welcome to Root On
    </motion.h1>
  );
};

export default SampleAnimation;
