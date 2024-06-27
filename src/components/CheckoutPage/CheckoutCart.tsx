import Image from 'next/image';
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Divider } from '@mui/material';
import { useTheme } from 'next-themes';
import { pricingPlansDetails } from '@/app/services/apiService/coachingContentsAPI';
import style from '../SignUpPage/SignUpPage.module.css';

export interface CheckoutCartProps {
  planDetails?: { details: pricingPlansDetails; serviceName: string } | undefined;
  customAmount?: string;
}
export const extractNumbers = (pricingString: string): number => {
  const numberPattern = /[\d,]+(?:\.\d+)?/; // This pattern matches numbers, including those with commas and decimal points
  const match = pricingString.match(numberPattern);
  if (match) {
    // Remove any commas from the number string and convert it to a number
    return parseFloat(match[0].replace(/,/g, ''));
  }
  throw new Error('No number found in the string');
};
function CheckoutCart({ planDetails, customAmount }: CheckoutCartProps) {
  const { theme } = useTheme();

  const getPriceBasedOnDomain = () => {
    let index = 0;
    if (typeof window !== 'undefined') {
      const domain = window?.location?.origin;
      index = domain.includes('rooton.ca') ? 0 : 1;
    }
    if (index === 1) {
      if (planDetails) {
        const inrTaxedPrice = extractNumbers(planDetails?.details?.pricingINR || '');
        const inrObject = {
          totalPrice: `₹ ${inrTaxedPrice.toFixed(2)}`,
          subTotal: `₹ ${(inrTaxedPrice / 1.18).toFixed(2)}`,
          taxes: `₹ ${(inrTaxedPrice - inrTaxedPrice / 1.18).toFixed(2)}`,
        };
        return inrObject;
      }
      const parsedAmount = parseFloat(customAmount || '0');
      return {
        totalPrice: `₹ ${parsedAmount.toFixed(2)}`,
        subTotal: `₹ ${(parsedAmount / 1.18).toFixed(2)}`,
        taxes: `₹ ${(parsedAmount - parsedAmount / 1.18).toFixed(2)}`,
      };
    }
    if (planDetails) {
      const cadTaxedPrice = extractNumbers(planDetails?.details?.pricingCAD || '');
      const cadObject = {
        totalPrice: `CAD$ ${cadTaxedPrice.toFixed(2)}`,
        subTotal: `CAD$ ${cadTaxedPrice.toFixed(2)}`,
        taxes: null,
      };
      return cadObject;
    }
    const parsedAmount = parseFloat(customAmount || '0');
    return {
      totalPrice: `CAD$ ${parsedAmount.toFixed(2)}`,
      subTotal: `CAD$ ${parsedAmount.toFixed(2)}`,
      taxes: null,
    };
  };

  return (
    <div className="w-full rounded-md">
      <div className="flex flex-col gap-3 pb-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <Image
              src={'/images/servicePage/my-project-44@3x.png'}
              alt={planDetails?.details.planName || 'Custom Plan'}
              width={100}
              height={100}
              className="hidden sm:block"
            />
            {planDetails ? (
              <h1
                className={`${style.heading_page} text-primary-font-color xs-mb-24 sm-mb-32
            overflow-visible justify-center !mb-0`}
              >
                {ReactHtmlParser(planDetails.serviceName) || ''}
              </h1>
            ) : (
              <h1
                className={`${style.heading_page} text-primary-font-color xs-mb-24 sm-mb-32
            overflow-visible justify-center !mb-0`}
              >
                Custom Plan
              </h1>
            )}
          </div>
        </div>
      </div>
      {planDetails && (
        <div className="flex items-center justify-between py-2">
          <p>Plan Type</p>
          <p>{planDetails.details.planName}</p>
        </div>
      )}
      <Divider color={theme === 'dark' ? 'white' : 'black'} />
      <div className="flex flex-col gap-2 py-4">
        {getPriceBasedOnDomain().subTotal && (
          <div className="flex items-center justify-between">
            <p>Subtotal</p>
            <p>{getPriceBasedOnDomain().subTotal}</p>
          </div>
        )}
        <div className="flex justify-between">
          <p>Taxes:</p>
          <p>{getPriceBasedOnDomain().taxes || 'Calculated at next step'}</p>
        </div>
      </div>
      <Divider color={theme === 'dark' ? 'white' : 'black'} />
      <div className="flex flex-col gap-2 py-4">
        <div className="flex items-center justify-between">
          <p>Total</p>
          <p>{getPriceBasedOnDomain().totalPrice}</p>
        </div>
      </div>
    </div>
  );
}

export default CheckoutCart;
