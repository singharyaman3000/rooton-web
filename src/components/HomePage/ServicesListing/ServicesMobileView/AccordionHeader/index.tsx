import NextImage from '@/components/UIElements/NextImage';
import React from 'react';

export const AccordionHeader = ({ service, icon }: { service: string; icon: string }) => {
  return (
    <div className="flex items-center ">
      <div className="relative mr-3 square-[30px] mb-[8px] text-base not-italic leading-[normal] tracking-[normal] text-black">
        {icon && (
          <NextImage
            sizes="100vw"
            altText={`${service}-icon`}
            title={`${service}-icon`}
            src={icon}
            fill
            style={{ objectFit: 'cover' }}
          />
        )}
      </div>
      {service}
    </div>
  );
};
