import NextImage from '@/components/UIElements/NextImage';
import React from 'react';
import { IService } from '../..';

export const AccordionHeader = ({ service, icon }: IService) => {
  return (
    <div className='flex items-center '>
      <div className="relative mr-3 square-[30px] mb-[8px] text-base not-italic leading-[normal] tracking-[normal] text-black">
        <NextImage
          sizes="100vw"
          altText={`${service}-icon`}
          title={`${service}-icon`}
          src={icon}
          fill={true}
          style={{ objectFit: 'cover' }}
        />
      </div>
      {service}
    </div>
  );
};
