/* eslint-disable no-return-assign */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import React, { useEffect, useState } from 'react';
import { EyeOffIcon } from '../Icons/eyeOffIcon';
import { EyeOnIcon } from '../Icons/eyeOnIcon';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import CircularLoader from '@/components/UIElements/CircularLoader';
import GoogleIcon from '../Icons/GoogleIcon';
import style from './LoginInPage.module.css';
import SnackbarAlert from '../ToolsPage-Services/Snackbar';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  Password: Yup.string().required('Password is required'),
});

const LoginModalComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [errorMessage, setErrorMessage] = useState('');
  const [isAgreed, setIsAgreed] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem('token');
    if (isLoggedIn) {
      const toolsUrl = params.lang ? `/${params.lang}/tools` : '/tools';
      window.location.href = toolsUrl;
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleApiRequest = async (values: { email: string; Password: string }) => {
    try {
      setLoading(true);
      setSnackbarOpen(false);
      const API_BASEURL = process.env.NEXT_SERVER_API_BASE_URL;
      console.log('API_BASEURL', API_BASEURL);
      const apiUrl = `${API_BASEURL}/api/login`;
      const response = await axios.post(apiUrl, values);
      const token = response.data.access_token;
      if (token) {
        localStorage.setItem('token', response.data.access_token);
        const toolsUrl = params.lang ? `/${params.lang}/tools` : '/tools';
        window.location.href = toolsUrl;
      }
    } catch (error: any) {
      if (error.response && error.response.data.detail) {
        setErrorMessage(error.response.data.detail);
      } else {
        setErrorMessage('Oops! Looks like something went wrong. Please try again.');
      }
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full background-[#000] lg:h-[82px] md:h-[72px] sm:h-[62px]"></div>
      <div className="flex flex-col lg:flex-row w-full min-h-screen">
        {/* Access your account section */}
        <div className="flex flex-grow lg:flex-1 justify-center items-center bg-pale-sandal p-4">
          <Formik
            initialValues={{
              email: '',
              Password: '',
            }}
            validationSchema={LoginSchema}
            onSubmit={handleApiRequest}
          >
            {({ errors, touched }) => {
              return (
                <Form>
                  <div className="w-full max-w-lg sm:p-8">
                    <div className="mb-4">
                      <h1 className={` ${style.heading_page} ${style.heading} text-black mt-20 xs-mb-24 sm-mb-32 `}>
                        Access your account
                      </h1>
                      <label htmlFor="first-name" className="block text-black text-md mb-1 text-[18px]">
                        Email Address<span className="text-[#ff0000]">*</span>
                      </label>
                      <Field
                        className="border-2 bg-white border-[#ccccd3]
                        hover:border-[#000] focus:border-[#000] text-[16px] w-full
                        h-[24px] py-6 px-6 text-gray-700 leading-6 focus:outline-none focus:shadow-outline"
                        id="email"
                        name="email"
                        type="email"
                        placeholder=""
                      />
                      {errors.email && touched.email ? (
                        <div className="text-[#ff0000] text-[15px] leading-6">{errors.email}</div>
                      ) : null}
                    </div>
                    <div className="mb-6">
                      <div className="flex justify-between">
                        <div>
                          <label htmlFor="first-name" className="block text-black text-md mb-1 text-[18px] mt-2">
                            Password<span className="text-[#ff0000]">*</span>
                          </label>
                        </div>
                        <button type="button" onClick={togglePasswordVisibility} className="cursor-pointer">
                          {showPassword ? (
                            <div className="flex justify-center items-center">
                              <EyeOffIcon className="text-black text-2xl text-default-400 pointer-events-none flex-shrink-0 mr-2 " />
                              <h4 className="text-black mt-2 mb-2 ">Hide</h4>
                            </div>
                          ) : (
                            <div className="flex justify-center items-center">
                              <EyeOnIcon className="text-black text-2xl  text-default-400 pointer-events-none flex-shrink-0 mr-2" />
                              <h4 className="text-black mt-2 mb-2 ">Show</h4>
                            </div>
                          )}
                        </button>
                      </div>
                      <Field
                        className="border-2 bg-white border-[#ccccd3] hover:border-[#000] focus:border-[#000] text-[16px] w-full h-[24px] py-6 px-6 text-gray-700 leading-6 focus:outline-none focus:shadow-outline"
                        id="Password"
                        type={showPassword ? 'text' : 'Password'}
                        name="Password"
                        placeholder=""
                      />
                      {errors.Password && touched.Password ? (
                        <div className="text-[#ff0000] text-[15px] leading-6">{errors.Password}</div>
                      ) : null}
                      <Link
                        className="text-[#3574e3] text-sm"
                        href={params.lang ? `/${params.lang}/forgot-password` : '/forgot-password'}
                      >
                        Forgot your Password?
                      </Link>{' '}
                    </div>
                    <div className="mt-4 mb-2 flex">
                      <input
                        id="terms"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                        onChange={(event) => {
                          return setIsAgreed(event.target.checked);
                        }}
                        checked={isAgreed}
                      />
                      <p className="text-black text-sm ml-2">
                        By continuing, you agree to Root On&#39;s
                        <Link
                          className="text-[#3574e3] ml-1"
                          href={params.lang ? `/${params.lang}/privacy-policy` : '/privacy-policy'}
                          target="_blank"
                        >
                          Privacy Policy
                        </Link>{' '}
                        and
                        <Link
                          className="text-[#3574e3] ml-1"
                          href={params.lang ? `/${params.lang}/terms-and-conditions` : '/terms-and-conditions'}
                          target="_blank"
                        >
                          Terms & Conditions
                        </Link>{' '}
                        apply.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-start mt-6 gap-[20px]">
                      <button
                        className={`${style.button_width} bg-[#000] text-white py-3 px-6 focus:outline-none focus:shadow-outline`}
                        type="submit"
                        disabled={!isAgreed || loading}
                      >
                        {loading ? <CircularLoader /> : 'Sign in'}
                      </button>
                      <button
                        type="button"
                        disabled={!isAgreed}
                        className={`${style.button_width} flex items-center justify-center bg-[#000] text-white px-6 py-3 text-sm font-medium`}
                        onClick={() => {
                          return (window.location.href = `${process.env.NEXT_SERVER_API_BASE_URL}/api/login/google`);
                        }}
                      >
                        <GoogleIcon />
                        <span>Continue with Google</span>
                      </button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>

        {/* Register online section */}
        <div className="flex flex-grow lg:flex-1 justify-center items-center login-background p-4">
          <div className="w-full max-w-lg sm:p-8">
            <div className="mb-4">
              <h1 className={`${style.heading_page} heading mt-20 xs-mb-24 sm-mb-32`}>Register online</h1>
              <p className="text-sm">
                Create an online account to save tracked items, unlock valuable discounts for your business, and more.
              </p>
              <p className="text-sm mt-4">Access your personalized dashboard in a few easy steps!</p>
              <Link className="" href={params.lang ? `/${params.lang}/signup` : '/signup'}>
                <button
                  className={`${style.button_width} bg-toggle-dark-bg hover:bg-[#595959] text-primary-white py-3 px-6 focus:outline-none focus:shadow-outline mt-[24px]`}
                  type="button"
                >
                  Register now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <SnackbarAlert open={snackbarOpen} message={errorMessage} />
    </>
  );
};

export default LoginModalComponent;
