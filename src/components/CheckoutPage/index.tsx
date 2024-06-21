'use client';

import React, { useEffect, useState } from 'react';
import { FormTextInput } from '../Forms/components/FormTextInput';
import { FormDropdown } from '../Forms/components/FormDropDown';
import CheckoutCart from './CheckoutCart';
import { IUserDetails, getCurrentUserDetails } from '@/app/services/apiService/checkoutPageAPI';
import LoadingUI from '../LoadingUI';
import style from '../SignUpPage/SignUpPage.module.css';
import { decrypt, handleStripPayment } from '@/utils/actions/checkout';
import { pricingPlansDetails } from '@/app/services/apiService/coachingContentsAPI';
import { city } from '../ProfilePage/profileCIty';
import { useRouter } from 'next/navigation';

const inputStyle =
  'w-full border-2 bg-white border-[#ccccd3] hover:border-[#000] focus:border-[#000] text-[16px] h-[24px] py-6 px-6 text-gray-700 leading-6 focus:outline-none focus:shadow-outline';
const selectStyle =
  'w-full border-2 bg-white border-[#ccccd3] hover:border-[#000] focus:border-[#000] text-[16px] h-[55px] py-2 px-3 text-gray-700 leading-6 focus:outline-none focus:shadow-outline';

interface ICheckoutProps {
  currentLoggedInUser?: IUserDetails | null;
}

const getCityOptions = (country: string) => {
  const countryData = city.find((item) => {
    return item.country === country;
  });
  return countryData ? countryData.cities : [];
};

function Checkout({ currentLoggedInUser }: ICheckoutProps) {
  const [currentUser, setCurrentUser] = useState(currentLoggedInUser);
  const [planDetails, setPlanDetails] = useState<{ details: pricingPlansDetails; serviceName: string }>();
  const [country, setCountry] = useState<string>(currentLoggedInUser?.countryOfCitizenship || '');

  const countryOptions = city.map((item) => {
    return item.country;
  });
  const cityOptions = getCityOptions(country || '');

  const router = useRouter();

  const decodedToken = async () => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const paramValue = urlParams.get('token');

      if (paramValue) {
        const token = await decrypt(paramValue);
        if (token) {
          setPlanDetails(JSON.parse(token));
        }
      }
    }
  };

  useEffect(() => {
    decodedToken();
  }, []);

  useEffect(() => {
    if (!currentLoggedInUser || typeof currentLoggedInUser === 'undefined') {
      if (localStorage.getItem('token')) {
        getCurrentUserDetails().then((data) => {
          if (data) {
            setCurrentUser(data);
            setCountry(data?.countryOfCitizenship || '');
          }
        });
      }
    }
  }, [currentLoggedInUser]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // print all the data received from form
    const form = e.currentTarget;
    const formData = new FormData(form);
    let email = '';
    formData.forEach((value, key) => {
      if (key === 'email') {
        email = value as string;
      }
    });

    if (window) {
      if (!window.location.origin.includes('rooton.ca')) {
        handleStripPayment(planDetails?.details.stripePriceID || '', email || '')
          .then((res) => {
            if (res.status) {
              router.push(res.payment_url || '');
            } else {
              console.log(JSON.parse(res.error || ''));
            }
          });
      }
    }
  };

  return (
    <div className="min-h-screen mt-[80px] py-2 px-4 w-full lg:w-5/6 lg:mx-auto lg:mt-[150px] flex flex-col lg:flex-row gap-10">
      {(!currentUser || typeof currentUser === 'undefined') && localStorage.getItem('token') ? (
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
                Contact Information
              </h1>
              <FormTextInput
                placeholder="John"
                required
                field={{ label: 'First Name', name: 'Firstname' }}
                value={currentUser?.Firstname || ''}
                className={inputStyle}
                invalidFormat={false}
              />
              <FormTextInput
                placeholder="Doe"
                field={{ label: 'Last Name', name: 'Lastname' }}
                value={currentUser?.Lastname || ''}
                className={inputStyle}
                invalidFormat={false}
              />
              <FormTextInput
                placeholder="ex: john_doe@example.com"
                type="email"
                required
                value={currentUser?.email || ''}
                field={{ label: 'Email', name: 'email' }}
                className={inputStyle}
                invalidFormat={false}
              />
            </div>
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
                className={inputStyle}
                invalidFormat={false}
              />
              <FormDropdown
                name="countryOfCitizenship"
                required
                value={country || ''}
                options={countryOptions}
                onChange={(e) => {
                  return setCountry(e.target.value);
                }}
                label="Country"
                className={selectStyle}
              />
              {/* <FormTextInput
                placeholder="City"
                field={{ label: 'City', name: 'city' }}
                value=""
                className={inputStyle}
                invalidFormat={false}
              /> */}
              <FormDropdown name="city" value="" required options={cityOptions} label="City" className={selectStyle} />
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
            <button
              className={`${style.button_width} bg-toggle-dark-bg text-primary-white py-3 px-6 focus:outline-none focus:shadow-outline`}
              type="submit"
            >
              Pay Now
            </button>
          </form>
        </div>
      )}
      {planDetails && (
        <div className="w-full lg:w-1/2 lg:sticky lg:h-full lg:top-20 login-background p-4 sm:p-8 mb-10">
          <CheckoutCart planDetails={planDetails} />
        </div>
      )}
    </div>
  );
}

export default Checkout;
