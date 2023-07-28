import NextImage from '@/components/UIElements/NextImage';
import React from 'react';

export interface IHonestyCard {
  iconUrl: string;
  cardTitle: string;
  cardDescription: string;
}

const HonestyCard = ({ iconUrl, cardTitle, cardDescription }: IHonestyCard) => {
  return (
    <div className="flex flex-col justify-center p-4">
      <div className="relative mb-4 w-[37px] h-[37px]">
        <NextImage
          sizes={'30vw'}
          src={iconUrl}
          title={cardTitle}
          fill
          style={{ objectFit: 'contain' }}
          altText={cardTitle}
        />
      </div>
      <h1 className='text-primary-font-color w-[70%] mb-4 text-xl font-bold leading-6 tracking-normal'>{cardTitle} </h1>
      <p className='mb- text-sm font-[500] leading-[1.71] tracking-normal text-font-color-light-gray'>{cardDescription}</p>
    </div>
  );
};

export default HonestyCard;
