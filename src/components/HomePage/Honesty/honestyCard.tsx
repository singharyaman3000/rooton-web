import NextImage from '@/components/UIElements/NextImage';
import React from 'react';

export interface IWhyRootON {
  key:string
  title: string;
  value: string;
  position: number;
  icon: string;
}

const HonestyCard = ({ title, icon, value }: IWhyRootON) => {
  return (
    <div className="flex flex-col justify-center p-4 lg:px-[50px] lg:py-[41px] bg-primary">
      <div className="relative mb-[14px] md:mb-[21px] w-[37px] h-[37px]">
        <NextImage sizes={'30vw'} src={icon} title={title} fill style={{ objectFit: 'contain' }} altText={title} />
      </div>
      <h1 className="text-primary-font-color w-[80%] mb-4 text-xl font-bold leading-6 tracking-normal">{title} </h1>
      <p className="mb- text-sm font-[500] leading-[1.71] tracking-normal text-font-color-light-gray">{value}</p>
    </div>
  );
};

export default HonestyCard;
