'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import styles from './EmailVarification.module.css';
import Link from 'next/link';
import logo from '../../../public/images/icons/dark-icon-192x192.png';
import Image from 'next/image';
import CircularLoader from '@/components/UIElements/CircularLoader';

const Loader = () => {
  return (
    <div className="px-10">
      <CircularLoader />
    </div>
  );
};

const EmailVerification = () => {
  const params = useParams();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState('');

  const verifyEmail = async (authId: string) => {
    setIsLoading(true);
    try {
      const apiUrl = `${process.env.NEXT_SERVER_API_BASE_URL}/api/verification`;
      const response = await axios.post(apiUrl, { authId });
      setMessage(response?.data?.Message || '');
      setStatus(response?.data?.Status || '');
    } catch (error) {
      setMessage('An error occurred during verification.');
      setStatus('Error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const authId = searchParams.get('authId');

    if (authId) {
      localStorage.setItem('userAuthId', authId);
      verifyEmail(authId);
    } else {
      const storedAuthId = localStorage.getItem('userAuthId');
      if (storedAuthId) {
        const verificationUrl = params.lang
          ? `/${params.lang}/ver-email?authId=${storedAuthId}`
          : `/ver-email?authId=${storedAuthId}`;
        window.location.href = verificationUrl;
      } else {
        setMessage('Please register yourself...');
        setStatus('NoAuthId');
      }
    }
  }, [params.lang]);

  useEffect(() => {
    if (status === 'Invalid' || status === 'Error') {
      const verificationUrl = params.lang ? `/${params.lang}/` : '/';
      window.location.href = verificationUrl;
    }
  }, [params.lang, status]);

  const handleResendEmail = async () => {
    setIsLoading(true);
    setResendDisabled(true);
    setTimeLeft(60);

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1;
        if (newTime <= 0) {
          clearInterval(interval);
          setResendDisabled(false);
          return 0;
        }
        return newTime;
      });
    }, 1000);

    try {
      const storedData = localStorage.getItem('userToken');
      if (!storedData) {
        setMessage('No email found for resend.');
        return;
      }
      const { email } = JSON.parse(storedData);

      const dataToSend = {
        email,
        Firstname: '',
        Lastname: '',
        Password: '',
        Phone: '',
        Second: true,
      };

      const apiUrl = `${process.env.NEXT_SERVER_API_BASE_URL}/api/send-otp`;
      const response = await axios.post(apiUrl, dataToSend);
      setMessage(response?.data?.Message || '');
      setVerificationStatus(response?.data?.Status || '');
    } catch (error) {
      setMessage('Error resending email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center">
          <Loader />
        </div>
      );
    }
    if (status === 'NoAuthId') {
      return (
        <Link
          style={{ width: '-webkit-fill-available', display: 'flex', justifyContent: 'center' }}
          href={params.lang ? `/${params.lang}/signup` : '/signup'}
        >
          Register
        </Link>
      );
    }
    if (verificationStatus === 'Verified') {
      return (
        <Link
          style={{ width: '-webkit-fill-available', display: 'flex', justifyContent: 'center' }}
          href={params.lang ? `/${params.lang}/login` : '/login'}
        >
          Login
        </Link>
      );
    }
    switch (status) {
    case 'Success':
      return <Link href={params.lang ? `/${params.lang}/login` : '/login'}>Login</Link>;
    case 'Failure':
      return (
        <div className="flex justify-center">
          <button
            type="button"
            className={styles.resendButton}
            style={{ width: '-webkit-fill-available', display: 'flex', justifyContent: 'center' }}
            onClick={handleResendEmail}
            disabled={resendDisabled}
          >
              Resend Link
          </button>
          {timeLeft > 0 && <p className={styles.timerText}>({timeLeft}s)</p>}
        </div>
      );
    default:
      return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Image className={styles.logo} src={logo} alt="Logo" width={192} height={192} />
        {message && <p className={styles.subtitle}>{message}</p>}
        <div className={styles.continueButton}>{renderContent()}</div>
        {status !== 'NoAuthId' && (
          <p className={styles.terms}>
            By signing in, you agree to{' '}
            <span className="text-[#3574e3]">
              <Link
                href={params.lang ? `/${params.lang}/terms-and-conditions` : '/terms-and-conditions'}
                target="_blank"
              >
                Terms and Conditions
              </Link>
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
