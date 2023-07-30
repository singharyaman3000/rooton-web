import NextImage from '@/components/UIElements/NextImage';
import React from 'react';

export interface IWhyRootON {
  key: string;
  value: string;
  position: number;
  icon: string;
}

const HonestyCard = ({ key, icon, value }: IWhyRootON) => {
  return (
    <div className="flex flex-col justify-center p-4">
      <div className="relative mb-4 w-[37px] h-[37px]">
        <NextImage sizes={'30vw'} src={icon} title={key} fill style={{ objectFit: 'contain' }} altText={key} />
      </div>
      <h1 className="text-primary-font-color w-[70%] mb-4 text-xl font-bold leading-6 tracking-normal">{key} </h1>
      <p className="mb- text-sm font-[500] leading-[1.71] tracking-normal text-font-color-light-gray">{value}</p>
    </div>
  );
};

export default HonestyCard;
