/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import React, { useState } from 'react';
import axios from 'axios';
import styles from './ForgotPassowd.module.css';
import logo from '../../../public/images/icons/dark-icon-192x192.png';
import Image from 'next/image';
import SnackbarAlert from '../ToolsPage-Services/Snackbar';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TailSpin } from 'react-loader-spinner';

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const CircularLoader = () => {
  return (
    <div className="px-3">
      <TailSpin
        visible
        height="20"
        width="20"
        color="#E7BA42"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

const ForgotPassword = () => {
  const [apiError, setApiError] = useState(false);
  const [apiSuccess, setApiSuccess] = useState(false);
  const [apiMessage, setApiMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleForgotPassword = async (email: string, setSubmitting: { (isSubmitting: boolean): void; (arg0: boolean): void; }) => {
    setSubmitted(true);
    try {
      setLoading(true);
      setApiError(false);
      setApiSuccess(false);
      const apiUrl = `${process.env.NEXT_SERVER_API_BASE_URL}/api/fogot-password`;
      const response = await axios.post(apiUrl, { email });
      const { Status, Message } = response.data;

      if (Status === 'Success') {
        setApiMessage(Message || 'Password reset form submitted successfully.');
        setApiSuccess(true);
      } else {
        setApiMessage(Message || 'Oops! Looks like something went wrong. Please try again.');
        setApiError(true);
        setSubmitted(false);
      }
    } catch (error) {
      setApiMessage('Oops! Looks like something went wrong. Please try again.');
      setApiError(true);
    } finally {
      setLoading(false);
      if (apiSuccess) {
        setSubmitting(false);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Image className={styles.logo} src={logo} alt="Logo" width={192} height={192} />
        <Formik
          initialValues={{ email: '' }}
          validationSchema={ForgotPasswordSchema}
          onSubmit={(values, { setSubmitting }) => {
            if (!submitted) { // Prevent multiple submissions
              handleForgotPassword(values.email, setSubmitting);
            }
          }}
        >
          {({ errors, touched, isSubmitting }) => {
            return (
              <Form>
                <div className="mb-4">
                  <label htmlFor="email" className="flex justify-start block text-black text-md mb-1 text-[18px] ">
                    Email Address<span className="text-[#ff0000]">*</span>
                  </label>
                  <Field
                    className={`border-2 bg-white border-[#ccccd3] hover:border-[#000] focus:border-[#000]
                    text-[16px] w-full h-[24px] py-6 px-6 text-gray-700 leading-6 focus:outline-none
                    focus:shadow-outline ${submitted ? 'cursor-not-allowed' : ''}`}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    disabled={submitted}
                  />
                  {errors.email && touched.email ? (
                    <div className="flex justify-start text-[#ff0000] text-[15px] leading-6">{errors.email}</div>
                  ) : null}
                </div>
                <button type="submit"
                  className={`${styles.continueButton} ${submitted ? 'cursor-not-allowed' : ''}`}
                  style={{ width: '-webkit-fill-available', display: 'flex', justifyContent: 'center' }}
                  disabled={submitted || loading}>
                  {loading ? <CircularLoader /> : 'Submit'}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
      <SnackbarAlert open={apiSuccess || apiError} message={apiMessage} type={apiSuccess ? 'success' : 'error'} />
    </div>
  );
};

export default ForgotPassword;
