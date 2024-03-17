/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styles from './ResetPassowd.module.css';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/images/icons/dark-icon-192x192.png';
import CircularLoader from '@/components/UIElements/CircularLoader';
import { useParams } from 'next/navigation';
import { Formik, Form, Field, FormikProps } from 'formik';
import * as Yup from 'yup';
import { EyeOffIcon } from '../Icons/eyeOffIcon';
import { EyeOnIcon } from '../Icons/eyeOnIcon';
import SnackbarAlert from '../ToolsPage-Services/Snackbar';

const ResetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/(?=.*[0-9])/, 'Password must contain a number'),
  repeatNewPassword: Yup.string()
    .required('Password confirmation is required')
    .oneOf([Yup.ref('newPassword'), ''], 'Passwords must match'),
});

const Loader = () => {
  return (
    <div className="px-10">
      <CircularLoader />
    </div>
  );
};

const ResetPassword = () => {
  const [apiError, setApiError] = useState(false);
  const [apiSuccess, setApiSuccess] = useState(false);
  const [apiMessage, setApiMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState('');
  const params = useParams();
  const formikRef = useRef<FormikProps<{ newPassword: string; repeatNewPassword: string }>>(null);

  const resetPassword = async (authId: string, newPassword: string) => {
    try {
      setIsLoading(true);
      setApiError(false);
      setApiSuccess(false);
      const apiUrl = `${process.env.NEXT_SERVER_API_BASE_URL}/api/reset-password`;
      const response = await axios.post(apiUrl, { authId, newpassword: newPassword });
      const { Status, Message } = response.data;
      if (Status === 'Success') {
        setStatus('Success');
        setApiMessage(Message || 'Password reset form submitted successfully.');
        setApiSuccess(true);
      } else {
        setApiMessage(Message || 'Oops! Looks like something went wrong. Please try again.');
        setApiError(true);
      }
    } catch (error) {
      setApiMessage('Oops! Looks like something went wrong. Please try again.');
      setApiError(true);
      setStatus('Failure');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const authId = searchParams.get('authId');

    if (authId) {
      localStorage.setItem('resetAuthId', authId);
      setStatus('Ready');
    } else {
      const storedAuthId = localStorage.getItem('resetAuthId');
      if (storedAuthId) {
        setStatus('Ready');
      } else {
        setStatus('NoAuthId');
      }
    }
    setIsLoading(false);
  }, []);

  const handleResetPassword = () => {
    if (formikRef.current) {
      formikRef.current.submitForm();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword(!showRepeatPassword);
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

    if (status === 'Success') {
      return (
        <Link
          style={{ width: '-webkit-fill-available', display: 'flex', justifyContent: 'center' }}
          href={params.lang ? `/${params.lang}/login` : '/login'}
        >
          Login
        </Link>
      );
    }

    return (
      <button
        type='button'
        style={{ width: '-webkit-fill-available', display: 'flex', justifyContent: 'center' }}
        className={styles.resetButton}
        onClick={handleResetPassword}
      >
          Submit
      </button>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Image className={styles.logo} src={logo} alt="Logo" width={192} height={192} />
        <Formik
          innerRef={formikRef}
          initialValues={{ newPassword: '', repeatNewPassword: '' }}
          validationSchema={ResetPasswordSchema}
          onSubmit={(values, { setSubmitting }) => {
            const authId = localStorage.getItem('resetAuthId');
            if (authId) {
              resetPassword(authId, values.newPassword);
              setSubmitting(false);
            }
          }}
        >
          {({ errors, touched }) => {
            return (
              <Form>
                <div className="mt-4 mb-4">
                  <div className="flex justify-between">
                    <div>
                      <label htmlFor="newPassword" className="block text-black text-md mb-1 text-[18px]">New Password<span className="text-[#ff0000]">*</span></label>
                    </div>
                    <button type="button" onClick={togglePasswordVisibility} className="cursor-pointer">
                      {showPassword ? (
                        <div className="flex">
                          <EyeOffIcon className="text-2xl text-black text-default-400 pointer-events-none flex-shrink-0 mr-2 " />
                          <h4 className="text-black mb-2 ">Hide</h4>
                        </div>
                      ) : (
                        <div className="flex">
                          <EyeOnIcon className="text-2xl  text-black text-default-400 pointer-events-none flex-shrink-0 mr-2" />
                          <h4 className="text-black mb-2 ">Show</h4>
                        </div>
                      )}
                    </button>
                  </div>
                  <Field
                    className="border-2 bg-white border-[#ccccd3] hover:border-[#000] focus:border-[#000] text-[16px] w-full h-[24px] py-6 px-6 text-gray-700 leading-6 focus:outline-none focus:shadow-outline"
                    name="newPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="New Password" />
                  {errors.newPassword && touched.newPassword && <div className="flex justify-start text-[#ff0000] text-[15px] leading-6">{errors.newPassword}</div>}
                </div>
                <div className="mb-3">
                  <div className="flex justify-between">
                    <div>
                      <label htmlFor="repeatNewPassword">Repeat New Password</label>
                    </div>
                    <button type="button" onClick={toggleRepeatPasswordVisibility} className="cursor-pointer">
                      {showRepeatPassword ? (
                        <div className="flex">
                          <EyeOffIcon className="text-2xl text-black text-default-400 pointer-events-none flex-shrink-0 mr-2 " />
                          <h4 className="text-black mb-2 ">Hide</h4>
                        </div>
                      ) : (
                        <div className="flex">
                          <EyeOnIcon className="text-2xl  text-black text-default-400 pointer-events-none flex-shrink-0 mr-2" />
                          <h4 className="text-black mb-2 ">Show</h4>
                        </div>
                      )}
                    </button>
                  </div>
                  <Field
                    className="border-2 bg-white border-[#ccccd3] hover:border-[#000] focus:border-[#000] text-[16px] w-full h-[24px] py-6 px-6 text-gray-700 leading-6 focus:outline-none focus:shadow-outline"
                    name="repeatNewPassword"
                    type={showRepeatPassword ? 'text' : 'password'}
                    placeholder="Repeat New Password" />
                  {errors.repeatNewPassword && touched.repeatNewPassword && <div className="flex justify-start text-[#ff0000] text-[15px] leading-6">{errors.repeatNewPassword}</div>}
                </div>
              </Form>
            );
          }}
        </Formik>
        <div className={styles.continueButton}>{renderContent()}</div>
      </div>
      <SnackbarAlert open={apiSuccess || apiError} message={apiMessage} type={apiSuccess ? 'success' : 'error'} />
    </div>
  );
};

export default ResetPassword;
