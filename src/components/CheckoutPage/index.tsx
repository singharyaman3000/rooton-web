'use client';

import React, { useEffect, useState } from 'react';
import { H2 } from '../H2';
import { FormTextInput } from '../Forms/components/FormTextInput';
import { FormDropdown } from '../Forms/components/FormDropDown';
import CheckoutCart from './CheckoutCart';
import { IUserDetails, getCurrentUserDetails } from '@/app/services/apiService/checkoutPageAPI';
import LoadingUI from '../LoadingUI';

const inputStyle =
  'w-full border-2 bg-white border-[#ccccd3] hover:border-[#000] focus:border-[#000] text-[16px] h-[24px] py-6 px-6 text-gray-700 leading-6 focus:outline-none focus:shadow-outline';
const selectStyle =
  'w-full border-2 bg-white border-[#ccccd3] hover:border-[#000] focus:border-[#000] text-[16px] h-[55px] py-2 px-3 text-gray-700 leading-6 focus:outline-none focus:shadow-outline';

interface ICheckoutProps {
  currentLoggedInUser?: IUserDetails | null;
  planDetails: { planName: string; planPrice: number };
}

function Checkout({ currentLoggedInUser, planDetails }: ICheckoutProps) {
  const [currentUser, setCurrentUser] = useState(currentLoggedInUser);
  useEffect(() => {
    if (!currentLoggedInUser || typeof currentLoggedInUser === 'undefined') {
      if (localStorage.getItem('token')) {
        getCurrentUserDetails().then((data) => {
          if (data) {
            setCurrentUser(data);
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

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  };

  return (
    <div className="min-h-screen mt-[80px] py-2 px-4 w-full lg:w-5/6 lg:mx-auto lg:mt-[150px] flex flex-col lg:flex-row gap-10">
      {!currentUser || typeof currentUser === 'undefined' ? (
        <div className="w-full lg:w-1/2">
          <LoadingUI />
        </div>
      ) : (
        <div className="w-full lg:w-1/2 overflow-auto h-full">
          <form action="" className="flex flex-col items-center w-full gap-3 mb-10" onSubmit={submitHandler}>
            <div className="w-full flex flex-col gap-3 mb-6">
              <H2>CONTACT</H2>
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
              <H2>SHIPPING ADDRESS</H2>
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
                placeholder="Enter here.."
                field={{ label: 'Address', name: 'address' }}
                value=""
                className={inputStyle}
                invalidFormat={false}
              />
              <FormDropdown
                name="countryOfCitizenship"
                required
                value={currentUser?.countryOfCitizenship.toLowerCase() || ''}
                options={[
                  { id: 'c1', value: 'United States' },
                  { id: 'c2', value: 'Canada' },
                  { id: 'c3', value: 'Mexico' },
                  { id: 'c4', value: 'India' },
                  { id: 'c5', value: 'Australia' },
                  { id: 'c6', value: 'China' },
                  { id: 'c7', value: 'Russia' },
                  { id: 'c8', value: 'Germany' },
                  { id: 'c9', value: 'France' },
                ]}
                label="Country"
                className={selectStyle}
              />
              <FormTextInput
                placeholder="City"
                field={{ label: 'City', name: 'city' }}
                value=""
                className={inputStyle}
                invalidFormat={false}
              />
              <FormDropdown
                name="state"
                value=""
                required
                options={[
                  { id: '1', value: 'Alabama' },
                  { id: '2', value: 'Alaska' },
                  { id: '3', value: 'Arizona' },
                  { id: '4', value: 'Arkansas' },
                  { id: '5', value: 'California' },
                  { id: '6', value: 'Colorado' },
                  { id: '7', value: 'Connecticut' },
                  { id: '8', value: 'Delaware' },
                  { id: '9', value: 'Florida' },
                  { id: '10', value: 'Georgia' },
                  { id: '11', value: 'Hawaii' },
                  { id: '12', value: 'Idaho' },
                  { id: '13', value: 'Illinois' },
                  { id: '14', value: 'Indiana' },
                  { id: '15', value: 'Iowa' },
                  { id: '16', value: 'Kansas' },
                  { id: '17', value: 'Kentucky' },
                ]}
                label="State"
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
            <button className="w-full text-lg font-bold bg-golden-yellow p-2 rounded-md my-5" type="submit">
              Pay Now
            </button>
          </form>
        </div>
      )}
      <div className="w-full lg:w-1/2 lg:sticky lg:h-full lg:top-20">
        <CheckoutCart planDetails={planDetails} />
      </div>
    </div>
  );
}

export default Checkout;
