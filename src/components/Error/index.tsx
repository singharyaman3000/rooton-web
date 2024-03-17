'use client';

import React from 'react';
import styles from './Error.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import logo from '../../../public/images/icons/dark-icon-192x192.png';

const LoginError = () => {
  const params = useParams();
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Image className={styles.logo} src={logo} alt="Logo" width={192} height={192} />
        <p className={styles.subtitle}>Error !!!!!</p>
        <div className={styles.continueButton}>
          <Link href={params.lang ? `/${params.lang}/login` : '/login'}>Login / Register</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginError;
