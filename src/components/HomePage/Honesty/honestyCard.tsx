import React, { FC } from 'react';
import NextImage from '@/components/UIElements/NextImage';

export interface IWhyRootON {
  key: string;
  title?: string;
  value: string;
  position: number;
  icon?: string;
  iconComponent?: FC;
  containerClass?: string;
}

const HonestyCard = ({ title, icon, value, containerClass, iconComponent: IconComponent }: IWhyRootON) => {
  return (
    <div
      className={`${containerClass} honestyCard flex flex-col justify-start p-4 py-[23px] lg:px-[50px] lg:py-[41px] bg-primary`}
    >
      <div className="relative mb-[14px] md:mb-[21px] w-[37px] h-[40px]">
        {icon ? (
          <NextImage
            sizes={'30vw'}
            src={`${process.env.NEXT_ASSETS_BASEURL}${icon}`}
            title={title || 'icon image'}
            fill
            style={{ objectFit: 'contain' }}
            altText={title || 'icon image'}
            priority
          />
        ) : null}
        {IconComponent ? <IconComponent /> : null}
      </div>
      <h3 className="text-primary-font-color line-clamp-3 w-[80%] mb-4 text-xl md:text-[22px] leading-[1.5] md:leading-[1.36] font-bold leading-6 tracking-normal">
        {title}{' '}
      </h3>
      <p className="text-sm md:text-base font-[500] leading-[1.71] md:leading-[1.63] md:opacity-[0.68] text-primary-font-color">
        {value}
      </p>
    </div>
  );
};

export default HonestyCard;
