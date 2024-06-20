import Image from 'next/image';
import React from 'react';
import { H2 } from '../H2';
import { Divider } from '@mui/material';
import { useTheme } from 'next-themes';

const items = [
  {
    title: 'Item 1',
    price: 10,
    quantity: 2,
    imgUrl: '/images/servicePage/my-project-44@3x.png',
  },
  {
    title: 'Item 2',
    price: 10,
    quantity: 2,
    imgUrl: '/images/servicePage/my-project-44@3x.png',
  },
];

function CheckoutCart() {
  const { theme } = useTheme();
  return (
    <div className="w-full p-2 my-4 rounded-md">
      <div className="flex flex-col gap-3 py-4">
        {items.map((item) => {
          return (
            <div className="flex items-center justify-between w-full" key={item.title}>
              <div className="flex items-center gap-3">
                <Image src={item.imgUrl} alt={item.title} width={100} height={100} />
                <H2>{item.title}</H2>
              </div>
              <p>{item.price * item.quantity}</p>
            </div>
          );
        })}
      </div>
      <Divider color={theme === 'dark' ? 'white' : 'black'} />
      <div className="flex flex-col gap-2 py-4">
        <div className="flex items-center justify-between">
          <p>Subtotal</p>
          <p>
            {items.reduce((total, item) => {
              return total + item.price * item.quantity;
            }, 0)}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p>Taxes:</p>
          <p>{(0.18 * items.reduce((total, item) => {return total + item.price * item.quantity;}, 0)).toFixed(2)}</p>
        </div>
      </div>
      <Divider color={theme === 'dark' ? 'white' : 'black'} />
      <div className="flex flex-col gap-2 py-4">
        <div className="flex items-center justify-between">
          <p>Total</p>
          <p>
            {items.reduce((total, item) => {
              return total + item.price * item.quantity;
            }, 0) +
              0.18 *
                items.reduce((total, item) => {
                  return total + item.price * item.quantity;
                }, 0)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CheckoutCart;
