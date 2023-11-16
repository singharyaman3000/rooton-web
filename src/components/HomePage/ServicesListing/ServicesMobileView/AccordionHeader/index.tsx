import NextImage from '@/components/UIElements/NextImage';
import React from 'react';

export const AccordionHeader = ({ service, icon , cssClass }: { service: string; icon: string , cssClass?:string }) => {
  return (
    <div className={`flex items-center ${cssClass}`}>
      <div className="relative mr-3 square-[30px] mb-0 text-base not-italic leading-[normal] tracking-[normal] text-black">
        {icon && (
          <NextImage
            sizes="100vw"
            altText={`${service}-icon`}
            title={`${service}-icon`}
            src={icon}
            fill
            style={{ objectFit: 'contain' }}
          />
        )}
      </div>
      {service}
    </div>
  );
};
