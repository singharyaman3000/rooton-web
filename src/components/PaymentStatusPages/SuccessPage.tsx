'use client';

import React from 'react';

const SuccessPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md mx-auto">
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
        <h2 className="text-2xl font-semibold mb-2">₹1,18,355</h2>
        <p className="text-lg font-semibold mb-4">Payment Successful!</p>
        <p className="text-gray-600 mb-6">The payment has been done successfully. Thanks for being there with us.</p>
        <p className="text-sm text-gray-500 mb-8">Payment ID: 283848, 24 Oct,2020-11:55 PM</p>
      </div>
    </div>
  );
};

export default SuccessPage;
