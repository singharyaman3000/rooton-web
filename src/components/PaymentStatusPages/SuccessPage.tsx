'use client';

import { NumberFormatter } from '@/utils';
import {
  confirmPayment,
  handleRazorpayPaymentInvoice,
  handleStripePaymentInvoice,
  handleStripePaymentSuccess,
} from '@/utils/actions/checkout';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';

const SuccessPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [session, setSession] = useState<any>();
  const [invoiceURL, setInvoiceURL] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(true);

  const { width, height } = useWindowSize();

  useEffect(() => {
    // Set a timer to disable confetti after 4 seconds
    const timer = setTimeout(() => {
      setActive(false);
    }, 6000); // 6000 milliseconds = 6 seconds

    // Clean up the timer when the component is unmounted
    return () => {
      return clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const paramValue = urlParams.get('session_id');
      const paymentId = urlParams.get('payment_id');

      if (paramValue) {
        handleStripePaymentSuccess(paramValue).then((data) => {
          if (data) {
            if(data.invoice){
              handleStripePaymentInvoice(data.invoice).then((value: string | null | undefined) => {
                setInvoiceURL(value || null);
              });
            }
            setSession(data);
            confirmPayment('stripe', data.customer_email || '', paramValue).then((result) => {
              if (result) {
                setLoading(false);
              }
            });
          }
        });
      } else if (paymentId) {
        handleRazorpayPaymentInvoice(paymentId).then((data) => {
          if (data) {
            setSession(data);
          }
          setLoading(false);
        });
      } else {
        window.location.href = '/';
      }
    }
  }, []);

  const getTotalCadAmount = () => {
    const amountTotalCents = session?.amount_total ?? 0;
    const amountTotalDollars = amountTotalCents / 100;
    return NumberFormatter(amountTotalDollars);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 blogs-listing">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-md mx-auto">
        {loading ? (
          <div className="animate-pulse">
            <div className="w-12 h-12 bg-gray-200 rounded-full mb-4 mx-auto"></div>
            <div className="h-6 bg-gray-200 rounded mb-2 w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded mb-4 w-2/4 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded mb-4 w-1/2 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded mb-4 w-2/3 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded mb-8 w-1/3 mx-auto"></div>
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-4">
              <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 50 50"
                xmlSpace="preserve"
                className="w-12 h-12"
              >
                <circle style={{ fill: '#25AE88' }} cx="25" cy="25" r="25" />
                <polyline
                  style={{
                    fill: 'none',
                    stroke: '#FFFFFF',
                    strokeWidth: 2,
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    strokeMiterlimit: 10,
                  }}
                  points="38,15 22,33 12,25"
                />
              </svg>
            </div>
            <h2 className=" text-black text-2xl font-semibold mb-2">
              {session?.currency === 'cad'
                ? `CAD $ ${getTotalCadAmount()}`
                : `₹ ${NumberFormatter((session?.amount || 0) / 100)}`}
            </h2>
            <p className="text-black text-lg font-semibold mb-4">Payment Successful!</p>
            <p className="text-gray-600 mb-6">The payment has been done successfully.</p>
            <p className="text-gray-600 mb-6">Thanks for being there with us.</p>
            {session && (
              <p className="text-sm text-gray-500 mb-8">
                Payment ID: {session?.payment_intent || session?.id || 'N/A'}, <br />
                {new Date((session?.created || session?.created_at || 0) * 1000)?.toLocaleString()}
              </p>
            )}
            {active && (
              <>
                <Confetti
                  width={width}
                  height={height}
                  numberOfPieces={800}
                  gravity={0.025}
                  wind={0.1}
                  initialVelocityX={20}
                  initialVelocityY={20}
                  recycle={false}
                  run={active}
                  tweenDuration={6000}
                  confettiSource={{ x: 0, y: height - 10, w: 10, h: 10 }} // From the left bottom corner
                />
                <Confetti
                  width={width}
                  height={height}
                  numberOfPieces={800}
                  gravity={0.025}
                  wind={-0.1} // Wind blowing to the left for confetti coming from the right
                  initialVelocityX={-20}
                  initialVelocityY={20}
                  recycle={false}
                  run={active}
                  tweenDuration={6000}
                  confettiSource={{ x: width, y: height - 10, w: 10, h: 10 }} // From the right bottom corner
                />
              </>
            )}
          </>
        )}

        {invoiceURL && invoiceURL.length > 0 && (
          <Link
            href={invoiceURL}
            target="_blank"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            View Invoice
          </Link>
        )}
      </div>
    </div>
  );
};

export default SuccessPage;
