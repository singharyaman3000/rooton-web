import Image from 'next/image';
import React from 'react';
import { H2 } from '../H2';
import { Divider } from '@mui/material';
import { useTheme } from 'next-themes';

interface CheckoutCartProps {
  planDetails: { planName: string; planPrice: number };
}

function CheckoutCart({ planDetails }: CheckoutCartProps) {
  const { theme } = useTheme();
  return (
    <div className="w-full p-2 my-4 rounded-md">
      <div className="flex flex-col gap-3 py-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <Image
              src={'/images/servicePage/my-project-44@3x.png'}
              alt={planDetails.planName}
              width={100}
              height={100}
            />
            <H2>{planDetails.planName}</H2>
          </div>
          <p>{planDetails.planPrice}</p>
        </div>
      </div>
      <Divider color={theme === 'dark' ? 'white' : 'black'} />
      <div className="flex flex-col gap-2 py-4">
        <div className="flex items-center justify-between">
          <p>Subtotal</p>
          <p>{planDetails.planPrice}</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Taxes:</p>
          <p>{(0.18 * planDetails.planPrice).toFixed(2)}</p>
        </div>
      </div>
      <Divider color={theme === 'dark' ? 'white' : 'black'} />
      <div className="flex flex-col gap-2 py-4">
        <div className="flex items-center justify-between">
          <p>Total</p>
          <p>{planDetails.planPrice + 0.18 * planDetails.planPrice}</p>
        </div>
      </div>
    </div>
  );
}

export default CheckoutCart;
