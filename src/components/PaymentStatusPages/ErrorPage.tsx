'use client';

import React from 'react';

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 blogs-listing">
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
            <circle style={{ fill: '#D75A4A' }} cx="25" cy="25" r="25" />
            <polyline
              style={{ fill: 'none', stroke: '#FFFFFF', strokeWidth: 2, strokeLinecap: 'round', strokeMiterlimit: 10 }}
              points="16,34 25,25 34,16"
            />
            <polyline
              style={{ fill: 'none', stroke: '#FFFFFF', strokeWidth: 2, strokeLinecap: 'round', strokeMiterlimit: 10 }}
              points="16,16 25,25 34,34"
            />
          </svg>
        </div>
        <p className="text-lg font-semibold mb-4 text-red-600">Payment Failed!</p>
        <p className="text-gray-600 mb-6">
          Unfortunately, your payment could not be processed. Please try again or contact support.
        </p>
        <p className="text-sm text-gray-500 mb-8">Payment ID: 283848, 24 Oct,2020-11:55 PM</p>
      </div>
    </div>
  );
};

export default ErrorPage;
