/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { EyeOffIcon } from '../Icons/eyeOffIcon';
import { EyeOnIcon } from '../Icons/eyeOnIcon';
import Link from 'next/link';
import Select from 'react-select';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TailSpin } from 'react-loader-spinner';
import GoogleIcon from '../Icons/GoogleIcon';
import style from './SignUpPage.module.css';
import SnackbarAlert from '../ToolsPage-Services/Snackbar';

const RegisterSchema = Yup.object().shape({
  Firstname: Yup.string().required('First Name is required'),
  Lastname: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  Password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/(?=.*[0-9])/, 'Password must contain a number'),
  repeatPassword: Yup.string()
    .required('Password confirmation is required')
    .oneOf([Yup.ref('Password'), ''], 'Passwords must match'),
  countryCode: Yup.string().required('Country code is required'),
  Phone: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]+$/, 'Phone number must be only digits')
    .min(10, 'Phone number must be at least 10 digits long')
    .max(15, 'Phone number must not be more than 15 digits long'),
});

const customStyles = {
  control: (provided: any) => {
    return {
      ...provided,
      border: '2px solid #ccccd3',
      boxShadow: 'none',
      borderRadius: 'none',
      padding: '6px',
      '&:hover': {
        border: '2px solid #000',
      },
      '&:focus': {
        border: '2px solid #000',
      },
    };
  },
  option: (provided: any, state: { isSelected: any }) => {
    return {
      ...provided,
      backgroundColor: state.isSelected ? '#0467C6' : 'white',
      '&:hover': {
        backgroundColor: '#0467C6',
        color: 'white',
      },
    };
  },
  menu: (provided: any) => {
    return {
      ...provided,
      backgroundColor: 'white',
      color: '#000',
      zIndex: 9999,
    };
  },
};

type SelectFieldProps = {
  options: any;
  field: any;
  form: any;
};
const SelectField = ({ options, field, form }: SelectFieldProps) => {
  const handleChange = (selectedOption: { value: any }) => {
    form.setFieldValue(field.name, selectedOption ? selectedOption.value : '');
  };

  return (
    <Select
      options={options}
      name={field.name}
      value={options.find((option: { value: any }) => {
        return option.value === field.value;
      })}
      onChange={handleChange}
      onBlur={() => {
        return form.setFieldTouched(field.name, true);
      }}
      styles={customStyles}
    />
  );
};

const Loader = () => {
  return (
    <div className="px-10">
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

const SignupModalComponent = () => {
  const params = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [countryOptions, setCountryOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [apiSuccess, setApiSuccess] = useState(false);

  const [apiMessage, setApiMessage] = useState('');
  const [isAgreed, setIsAgreed] = useState(true);

  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem('token');
    if (isLoggedIn) {
      const toolsUrl = params.lang ? `/${params.lang}/tools` : '/tools';
      window.location.href = toolsUrl;
    }
  }, []);

  const handleApiRequest = async (formData: any) => {
    try {
      const apiUrl = `${process.env.NEXT_SERVER_API_BASE_URL}/api/send-otp`;
      const response = await axios.post(apiUrl, formData);
      return response.data;
    } catch (error) {
      console.error('Error in API request:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchCountryCodes = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const options = response.data.map((country: { idd: { root: any; suffixes: any[] }; name: { common: any } }) => {
          const code = country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : '');
          const label = `${code} (${country.name.common})`;
          return { value: code, label };
        });
        setCountryOptions(options);
      } catch (error) {
        console.error('There was an error fetching the country codes:', error);
      }
    };

    fetchCountryCodes();
  }, []);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const handleSuccess = async (values: any) => {
    setLoading(true);
    setApiError(false);
    setApiSuccess(false);
    try {
      const formattedValues = {
        ...values,
        Phone: `${values.countryCode}${values.Phone}`,
        Second: false,
      };
      delete formattedValues.countryCode;
      delete formattedValues.repeatPassword;

      const apiResponse = await handleApiRequest(formattedValues);
      if (apiResponse.Status === 'Success') {
        const tokenData = {
          email: values.email,
        };
        localStorage.setItem('userToken', JSON.stringify(tokenData));
        setApiMessage(apiResponse.Message || 'Oops! Looks like something went wrong. Please try again.');
        setApiError(false);
        setApiSuccess(true);
      } else {
        setApiMessage(apiResponse.Message || 'Oops! Looks like something went wrong. Please try again.');
        setApiError(true);
        setApiSuccess(false);
      }
    } catch (error) {
      setApiMessage('Oops! Looks like something went wrong. Please try again.');
      setApiError(true);
      setApiSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full min-h-screen">
        <div className={`${style.register_container} flex flex-grow items-center p-4`}>
          <div className="mt-20 w-full max-w-3xl p-4 sm:p-8 bg-pale-sandal border-golden-yellow border">
            <div className="mb-4">
              <h1
                className={`${style.heading_page} ${style.heading_top} text-black xs-mb-24 sm-mb-32
            overflow-visible justify-center`}
              >
                Create your personal Root On profile
              </h1>

              <Formik
                initialValues={{
                  Firstname: '',
                  Lastname: '',
                  email: '',
                  Password: '',
                  repeatPassword: '',
                  countryCode: '',
                  Phone: '',
                }}
                validationSchema={RegisterSchema}
                onSubmit={handleSuccess}
              >
                {({ errors, touched, handleSubmit }) => {
                  return (
                    <Form onSubmit={handleSubmit}>
                      <div className="flex flex-col sm:flex-row -mx-3 mb-3">
                        <div className="flex-1 px-3">
                          <label htmlFor="first-name" className="block text-black text-md mb-1 text-[18px]">
                            First name<span className="text-[#ff0000]">*</span>
                          </label>
                          <Field
                            className="border-2 bg-white border-[#ccccd3] hover:border-[#000] focus:border-[#000] text-[16px] w-full h-[24px] py-6 px-6 text-gray-700 leading-6 focus:outline-none focus:shadow-outline"
                            id="Firstname"
                            name="Firstname"
                            type="text"
                            placeholder=""
                          />
                          {errors.Firstname && touched.Firstname ? (
                            <div className="text-[#ff0000] text-[15px] leading-6">{errors.Firstname}</div>
                          ) : null}
                        </div>
                        <div className="flex-1 px-3">
                          <label htmlFor="last-name" className="block text-black text-md mb-1 text-[18px]">
                            Last name<span className="text-[#ff0000]">*</span>
                          </label>
                          <Field
                            className="border-2 bg-white border-[#ccccd3] hover:border-[#000] focus:border-[#000] text-[16px] w-full h-[24px] py-6 px-6 text-gray-700 leading-6 focus:outline-none focus:shadow-outline"
                            id="Lastname"
                            name="Lastname"
                            type="text"
                            placeholder=""
                          />
                          {errors.Lastname && touched.Lastname ? (
                            <div className="text-[#ff0000] text-[15px] leading-6">{errors.Lastname}</div>
                          ) : null}
                        </div>
                      </div>

                      {/* Contact information section */}
                      <div className="mb-4">
                        <label htmlFor="email" className="block text-black text-md mb-1 text-[18px]">
                          Email Address<span className="text-[#ff0000]">*</span>
                        </label>
                        <Field
                          className="border-2 bg-white border-[#ccccd3] hover:border-[#000] focus:border-[#000] text-[16px] w-full h-[24px] py-6 px-6 text-gray-700 leading-6 focus:outline-none focus:shadow-outline"
                          id="email"
                          name="email"
                          type="email"
                          placeholder=""
                        />
                        {errors.email && touched.email ? (
                          <div className="text-[#ff0000] text-[15px] leading-6">{errors.email}</div>
                        ) : null}
                      </div>

                      <div className="mt-4 mb-4">
                        <div className="flex justify-between">
                          <div>
                            <label htmlFor="first-name" className="block text-black text-md mb-1 text-[18px]">
                              Password<span className="text-[#ff0000]">*</span>
                            </label>
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
                          id="Password"
                          type={showPassword ? 'text' : 'password'}
                          name="Password"
                          placeholder=""
                        />
                        {errors.Password && touched.Password ? (
                          <div className="text-[#ff0000] text-[15px] leading-6">{errors.Password}</div>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <div className="flex justify-between">
                          <div>
                            <label htmlFor="first-name" className="block text-black text-md mb-1 text-[18px]">
                              Repeat Password<span className="text-[#ff0000]">*</span>
                            </label>
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
                          id="repeatPassword"
                          type={showRepeatPassword ? 'text' : 'password'}
                          name="repeatPassword"
                          placeholder=""
                        />
                        {errors.repeatPassword && touched.repeatPassword ? (
                          <div className="text-[#ff0000] text-[15px] leading-6">{errors.repeatPassword}</div>
                        ) : null}
                      </div>
                      <div className="mb-4 flex flex-col sm:flex-row">
                        <div className="w-full sm:w-1/3 sm:pr-2">
                          {' '}
                          {/* Adjust the width as necessary */}
                          <label htmlFor="countryCode" className="block text-black text-md mb-1 text-[18px]">
                            Phone No<span className="text-[#ff0000]">*</span>
                          </label>
                          <Field name="countryCode" component={SelectField} options={countryOptions} />
                          {errors.countryCode && touched.countryCode ? (
                            <div className="text-[#ff0000] text-[15px] leading-6">{errors.countryCode}</div>
                          ) : null}
                        </div>
                        <div className="w-full sm:w-2/3 sm:pl-2">
                          {' '}
                          {/* Adjust the width as necessary */}
                          <label htmlFor="Phone" className="block text-transparent text-[18px] mb-1">
                            Phone No
                          </label>
                          <Field
                            className="border-2 bg-white border-[#ccccd3] hover:border-[#000] focus:border-[#000] text-[16px] w-full h-[24px] py-6 px-6 text-gray-700 leading-6 focus:outline-none focus:shadow-outline"
                            id="Phone"
                            name="Phone"
                            type="number"
                            placeholder=""
                          />
                          {errors.Phone && touched.Phone ? (
                            <div className="text-[#ff0000] text-[15px] leading-6">{errors.Phone}</div>
                          ) : null}
                        </div>
                      </div>

                      {/* Terms and Conditions checkbox */}
                      <div className="flex items-center mt-4 mb-6">
                        <input
                          id="terms"
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          onChange={(event) => {
                            return setIsAgreed(event.target.checked);
                          }}
                          checked={isAgreed}
                        />
                        <label htmlFor="terms" className="ml-2 text-black block text-sm ">
                          I have read and agree with the
                          <Link
                            className="text-[#3574e3] ml-1"
                            href={params.lang ? `/${params.lang}/terms-and-conditions` : '/terms-and-conditions'}
                            target="_blank"
                          >
                            Root On Terms and Conditions
                          </Link>
                          .
                        </label>
                      </div>
                      {apiError && <div className="text-red-500">{apiError}</div>}
                      {apiSuccess && <div className="text-green-500">{apiSuccess}</div>}
                      {/* Submit button */}
                      <div className="flex flex-col sm:flex-row items-center justify-start mt-6 gap-[20px]">
                        <button
                          className={`${style.button_width} bg-toggle-dark-bg text-primary-white py-3 px-6 focus:outline-none focus:shadow-outline`}
                          type="submit"
                          disabled={!isAgreed || loading}
                        >
                          {loading ? <Loader /> : 'Create profile'}
                        </button>
                        <button
                          type="button"
                          disabled={!isAgreed}
                          className={`${style.button_width} flex items-center justify-center bg-toggle-dark-bg text-primary-white px-6 py-3 text-sm font-medium`}
                          onClick={() => {
                            // eslint-disable-next-line no-return-assign
                            return (window.location.href = `${process.env.NEXT_SERVER_API_BASE_URL}/api/login/google`);
                          }}
                        >
                          <GoogleIcon />
                          <span>Continue with Google</span>
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <SnackbarAlert open={apiSuccess || apiError} message={apiMessage} type={apiSuccess ? 'success' : 'error'} />
    </>
  );
};

export default SignupModalComponent;
