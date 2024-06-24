'use client';

import { handleStripePaymentSuccess } from '@/utils/actions/checkout';
import React, { useEffect, useState } from 'react';

const SuccessPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [session, setSession] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const paramValue = urlParams.get('session_id');

      if (paramValue) {
        handleStripePaymentSuccess(paramValue).then((data) => {
          if (data) {
            console.log(data);
            setSession(data);
          }
          setLoading(false);
        });
      } else {
        setLoading(false); // No session_id found
      }
    }
  }, []);

  const getTotalCadAmount = () => {
    const amountTotalCents = session?.amount_total ?? 0;
    const amountTotalDollars = amountTotalCents / 100;
    return amountTotalDollars.toFixed(2);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
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
            <h2 className="text-2xl font-semibold mb-2">
              {session?.currency === 'cad' ? `CAD $ ${getTotalCadAmount()}` : `₹ ${session?.amount_total?.toFixed(2)}`}
            </h2>
            <p className="text-lg font-semibold mb-4">Payment Successful!</p>
            <p className="text-gray-600 mb-6">The payment has been done successfully.</p>
            <p className="text-gray-600 mb-6">Thanks for being there with us.</p>
            <p className="text-sm text-gray-500 mb-8">
              Payment ID: {session?.payment_intent}, {new Date((session?.created || 0) * 1000)?.toLocaleString()}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SuccessPage;
