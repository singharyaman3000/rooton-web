/* eslint-disable no-alert */
/* eslint-disable no-lonely-if */

'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { FormTextInput } from '../Forms/components/FormTextInput';
import { FormDropdown } from '../Forms/components/FormDropDown';
import CheckoutCart, { extractNumbers } from './CheckoutCart';
import { IUserDetails, getCurrentUserDetails } from '@/app/services/apiService/checkoutPageAPI';
import LoadingUI from '../LoadingUI';
import style from '../SignUpPage/SignUpPage.module.css';
import {
  confirmPayment,
  createRazorpayOrder,
  decrypt,
  handleCustomStripePayment,
  handleRazorpayPaymentRedirection,
  handleStripPayment,
  verifyRazorpayPaymentStatus,
} from '@/utils/actions/checkout';
import { pricingPlansDetails } from '@/app/services/apiService/coachingContentsAPI';
import { useParams, useRouter } from 'next/navigation';
import { checkForGSTNumber, checkForNumber, cleanseServiceName, extractNumbersFromInput, findCityListByName, findCountryListByName, findStateListByName } from './functions';
import SnackbarAlert from '../ToolsPage-Services/Snackbar';
import { AlertColor } from '@mui/material';
import { inputStyle, selectStyle, visaTypes } from './constants';
import { Country, State, City } from 'country-state-city';

interface ICheckoutProps {
  currentLoggedInUser?: IUserDetails | null;
}

function Checkout({ currentLoggedInUser }: ICheckoutProps) {
  const params = useParams();
  const [currentUser, setCurrentUser] = useState(currentLoggedInUser);
  const [emailInputValue, setEmailInputValue] = useState<string | undefined>(undefined);
  const [planDetails, setPlanDetails] = useState<{ details?: pricingPlansDetails; serviceName: string }>();
  const [token, setToken] = useState<string>('');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isSnackBarOpen, setIsSnackBarOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [type, setType] = useState<AlertColor | undefined>('error');
  const [amountError, setAmountError] = useState<{status:boolean, message:string}>({ status:false, message:'' });

  const [selectedCountry, setSelectedCountry] = useState<any>(
    findCountryListByName(currentLoggedInUser?.countryOfCitizenship || ''),
  );
  const [selectedState, setSelectedState] = useState<any>(null);
  const [selectedCity, setSelectedCity] = useState<any>(null);

  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      let userDetails = currentLoggedInUser;
      if (!userDetails) {
        const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (storedToken) {
          userDetails = await getCurrentUserDetails();
          setCurrentUser(userDetails);
        }
      }

      if (userDetails) {
        setSelectedCountry(findCountryListByName(userDetails.countryOfCitizenship || ''));
      }

      const urlParams =
        typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
      const tokenParam = urlParams.get('token');
      const emailParam = urlParams.get('email');

      if (tokenParam) {
        setToken(tokenParam);
        const decryptedValue = await decrypt(tokenParam);
        if (decryptedValue) {
          setPlanDetails(JSON.parse(decryptedValue));
        }
      }
      if (emailParam) {
        setEmailInputValue(emailParam);
      }

      setLoading(false);
    }

    fetchData();
  }, [currentLoggedInUser]);

  useEffect(() => {
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry.isoCode));
      setSelectedState({ name: '' });
      setSelectedCity({ name: '' });
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      const cityList =
        City.getCitiesOfState(selectedState.countryCode, selectedState.isoCode)?.length > 0
          ? City.getCitiesOfState(selectedState.countryCode, selectedState.isoCode)
          : [selectedState];
      setCities(cityList);
      setSelectedCity({ name: '' });
    }
  }, [selectedState]);

  const handleCountryChange = (countryName: string) => {
    const country = findCountryListByName(countryName);
    setSelectedCountry(country);
  };

  const handleStateChange = (stateName: string) => {
    const state = findStateListByName(stateName, selectedCountry?.isoCode);
    setSelectedState(state);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // print all the data received from form
    const form = e.currentTarget;
    const formData = new FormData(form);
    let email = '';
    let name = '';
    let phone = '';
    let address= '';
    let gst = '';
    formData.forEach((value, key) => {
      if (key === 'email') {
        email = value as string;
      }

      if (key === 'FullName') {
        name = value as string;
      }

      if (key === 'Phone') {
        phone = value as string;
      }
      if(key==='address'){
        address=value as string;
      }
      if (key === 'GSTNumber') {
        gst = value as string;
      }
    });

    if (typeof window !== 'undefined') {
      if (window.location.origin.includes('rooton.ca')) {
        if (planDetails?.details) {
          handleStripPayment(planDetails?.details?.stripePriceID || '', email || '', token, params?.lang).then(
            (res) => {
              if (res.status) {
                router.push(res.payment_url || '');
              } else {
                setType('error');
                setIsSnackBarOpen(true);
                setMessage('Something went wrong. Please try again later');
              }
            },
          );
        } else {
          handleCustomStripePayment(customAmount, email || '', params?.lang).then((res) => {
            if (res.status) {
              router.push(res.payment_url || '');
            } else {
              setType('error');
              setIsSnackBarOpen(true);
              setMessage('Something went wrong. Please try again later');
            }
          });
        }
      } else {
        if (planDetails?.details) {
          const inrTaxedPrice = extractNumbers(planDetails?.details?.pricingINR || '');
          const gstTaxes = (inrTaxedPrice ?? 0) * 0.18;
          const amountToBePaid = Number((inrTaxedPrice + gstTaxes).toFixed(2));
          const orderId = await createRazorpayOrder(amountToBePaid, email || '',name,cleanseServiceName(planDetails?.serviceName || ''),address,gst);
          if (orderId) {
            const options = {
              key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
              currency: 'INR',
              amount: amountToBePaid * 100,
              name: cleanseServiceName(planDetails?.serviceName || ''),
              description: planDetails?.details?.planDescription,
              order_id: orderId,
              modal: {
                confirm_close: true,
                backdropclose: true,
              },
              async handler(response: any) {
                const data = {
                  orderCreationId: orderId,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                };
                const paymentVerificationStatus = await verifyRazorpayPaymentStatus(data);
                if (paymentVerificationStatus) {
                  setType('success');
                  setIsSnackBarOpen(true);
                  setMessage('Payment Successful, You\'ll be redirected soon.');
                  await confirmPayment('razorpay', email, undefined, orderId, response.razorpay_payment_id);
                  const url = await handleRazorpayPaymentRedirection(
                    params?.lang || '',
                    response.razorpay_payment_id,
                    true,
                  );
                  router.push(url);
                } else {
                  setType('error');
                  setIsSnackBarOpen(true);
                  setMessage('Something went wrong. Please try again later');
                  const url = await handleRazorpayPaymentRedirection(
                    params?.lang || '',
                    response.razorpay_payment_id,
                    false,
                  );
                  router.push(url);
                }
              },
              prefill: {
                name,
                email,
                contact: phone,
              },
              theme: {
                color: '#f59723',
              },
            };
            try {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              const paymentObject = new window.Razorpay(options);
              paymentObject.open();
            } catch (error) {
              setType('error');
              setIsSnackBarOpen(true);
              setMessage('Something went wrong. Please try again later');
            }
          }
        } else {
          const gstTaxes = ((customAmount as unknown as number | undefined) ?? 0) * 0.18;
          const amountToBePaid = Number((parseFloat(customAmount) + gstTaxes).toFixed(2));
          const orderId = await createRazorpayOrder(amountToBePaid, email || '',name,cleanseServiceName(planDetails?.serviceName || ''),address,gst);
          if (orderId) {
            const options = {
              key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
              currency: 'INR',
              amount: amountToBePaid * 100,
              name: 'Personalized Plan',
              description: '',
              order_id: orderId,
              async handler(response: any) {
                const data = {
                  orderCreationId: orderId,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                };
                const paymentVerificationStatus = await verifyRazorpayPaymentStatus(data);
                if (paymentVerificationStatus) {
                  setType('success');
                  setIsSnackBarOpen(true);
                  setMessage('Payment Successful, You\'ll be redirected soon.');
                  await confirmPayment('razorpay', email, undefined, orderId, response.razorpay_payment_id);
                  const url = await handleRazorpayPaymentRedirection(
                    params?.lang || '',
                    response.razorpay_payment_id,
                    true,
                  );
                  router.push(url);
                } else {
                  setType('error');
                  setIsSnackBarOpen(true);
                  setMessage('Something went wrong. Please try again later');
                  const url = await handleRazorpayPaymentRedirection(
                    params?.lang || '',
                    response.razorpay_payment_id,
                    false,
                  );
                  router.push(url);
                }
              },
              prefill: {
                name,
                email,
                contact: phone,
              },
              theme: {
                color: '#f59723',
              },
            };
            try {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              const paymentObject = new window.Razorpay(options);
              paymentObject.open();
            } catch (error) {
              setType('error');
              setIsSnackBarOpen(true);
              setMessage('Something went wrong. Please try again later');
            }
          }
        }
      }
    }
  };

  return (
    <div className="min-h-screen mt-[80px] py-2 px-4 w-full lg:w-5/6 lg:mx-auto lg:mt-[150px] flex flex-col-reverse lg:flex-row gap-10">
      {loading ? (
        <div className="w-full lg:w-1/2">
          <LoadingUI />
        </div>
      ) : (
        <div className="w-full lg:w-1/2 overflow-auto h-full">
          <form
            action=""
            className="flex flex-col items-center w-full gap-3 mb-10 p-4 sm:p-8 bg-pale-sandal border-golden-yellow border"
            onSubmit={submitHandler}
          >
            <div className="w-full flex flex-col gap-3 mb-6">
              <h1
                className={`${style.heading_page} text-black xs-mb-24 sm-mb-32
            overflow-visible justify-center !mb-0`}
              >
                Billing Information
              </h1>
              <FormTextInput
                placeholder="John"
                required
                field={{ label: 'Name or Business Name', name: 'FullName' }}
                value={`${currentUser?.Firstname || ''} ${currentUser?.Lastname || ''}` || ''}
                className={inputStyle}
                invalidFormat={false}
              />
              <FormTextInput
                placeholder="ex: john_doe@example.com"
                type="email"
                required
                validationFn={(emailToBeTested: string) => {
                  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                  return regex.test(emailToBeTested);
                }}
                value={emailInputValue || currentUser?.email || ''}
                field={{ label: 'Email', name: 'email' }}
                className={inputStyle}
                invalidFormat={false}
              />
              {typeof window !== 'undefined' && !window.location.origin.includes('rooton.ca') && (
                <FormTextInput
                  placeholder="Enter here."
                  field={{ label: 'GST Number', name: 'GSTNumber' }}
                  value=""
                  type="gst"
                  allUpperCase
                  className={inputStyle}
                  validationFn={checkForGSTNumber}
                  invalidFormat={false}
                />
              )}
              {!planDetails?.details && (
                <>
                  <FormTextInput
                    placeholder="Enter Custom amount here."
                    required
                    field={{ label: 'Amount', name: 'customAmount' }}
                    value={customAmount || ''}
                    className={inputStyle}
                    invalidFormat={false}
                    onChange={(e) => {
                      if (checkForNumber(e.target.value)) return;
                      const inputValue = extractNumbersFromInput(e.target.value);
                      const amount = parseFloat(inputValue);

                      if (amount * 1.18 > 500000 && window && !window.location.origin.includes('rooton.ca')) {
                        setAmountError({ status: true, message: 'Amount should be less than 5,00,000' });
                        return;
                      }
                      setAmountError({ status: false, message: '' });
                      if (inputValue.length <= 1) {
                        setCustomAmount('');
                        return;
                      }

                      setCustomAmount(inputValue);
                    }}
                  />

                  {amountError.status && <p className="text-[#FF0000]">{amountError.message}</p>}
                  <FormDropdown
                    name="serviceType"
                    required
                    value=""
                    options={visaTypes}
                    label="Service Type"
                    className={selectStyle}
                    onChange={(e) => {
                      setPlanDetails((prev) => {
                        return {
                          ...prev,
                          serviceName: e.target.value,
                        };
                      });
                    }}
                  />
                </>
              )}
            </div>
            {typeof window !== 'undefined' && !window.location.origin.includes('rooton.ca') && (
              <div className="w-full flex flex-col gap-3">
                <h1
                  className={`${style.heading_page} text-black xs-mb-24 sm-mb-32
            overflow-visible justify-center !mb-0`}
                >
                  Billing Address
                </h1>
                <FormTextInput
                  placeholder="Enter here.."
                  field={{ label: 'Address', name: 'address' }}
                  value=""
                  required
                  className={inputStyle}
                  invalidFormat={false}
                />
                <FormDropdown
                  name="countryOfCitizenship"
                  required
                  value={selectedCountry?.name || ''}
                  options={Country?.getAllCountries().map((countryData) => {
                    return countryData?.name || '';
                  })}
                  onChange={(e) => {
                    return handleCountryChange(e.currentTarget.value);
                  }}
                  label="Country"
                  className={selectStyle}
                />
                <FormDropdown
                  name="state"
                  value={selectedState?.name || ''}
                  required
                  options={states?.map((stateData) => {
                    return stateData?.name || '';
                  })}
                  onChange={(e) => {
                    return handleStateChange(e.currentTarget.value);
                  }}
                  label="State"
                  className={selectStyle}
                />
                <FormDropdown
                  name="city"
                  required
                  value={selectedCity?.name || ''}
                  options={cities?.map((cityData) => {
                    return cityData?.name || '';
                  })}
                  onChange={(e) => {
                    return setSelectedCity(
                      findCityListByName(e.currentTarget.value, selectedState?.countryCode, selectedState?.isoCode),
                    );
                  }}
                  label="City"
                  className={selectStyle}
                />
                <FormTextInput
                  placeholder="Zip Code"
                  field={{ label: 'Zip Code', name: 'zip_code' }}
                  value=""
                  className={inputStyle}
                  invalidFormat={false}
                />
                <FormTextInput
                  placeholder="Phone Number"
                  type="phone"
                  field={{ label: 'Phone Number', name: 'Phone' }}
                  value={currentUser?.Phone || ''}
                  className={inputStyle}
                  invalidFormat={false}
                />
              </div>
            )}
            <button
              className={`${style.button_width} bg-[#000] text-white mt-2 py-3 px-6 focus:outline-none focus:shadow-outline`}
              type="submit"
            >
              Pay Now
            </button>
          </form>
        </div>
      )}
      {planDetails?.details && (
        <div className="w-full lg:w-1/2 lg:sticky lg:h-full lg:top-20 login-background p-4 sm:p-8 md:mb-10 border border-solid">
          <CheckoutCart planDetails={planDetails} />
        </div>
      )}
      {!planDetails?.details && (
        <div className="w-full lg:w-1/2 lg:sticky lg:h-full lg:top-20 login-background p-4 sm:p-8 md:mb-10 border border-solid">
          <CheckoutCart customAmount={customAmount} planDetails={planDetails} />
        </div>
      )}
      <SnackbarAlert open={isSnackBarOpen} message={message} type={type} />
    </div>
  );
}

export default Checkout;
