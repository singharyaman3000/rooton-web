import { IImageAttributes } from '@/app/services/apiService/interfaces';
import NextImage from '@/components/UIElements/NextImage';
import { appendAssetUrl } from '@/utils';
import React from 'react';

export interface IimageCard {
  attributes: IImageAttributes;
}

const ImageCard = ({ attributes }: IimageCard) => {
  return (
    <div className="relative ml-5 mb-[45.5px] mt-[37px] lg:mb-[106px] lg:mt-[110px]   lg:ml-20 bg-white shadow-[0px_4px_19px_-1px_rgb(178_178_178_/_22%)] flex justify-center items-center max-w-[240px] min-w-[286px] w-[40.55vw] h-[112.7px] lg:h-[177px]">
      {/* <div className="relative bg-white shadow-[0px_4px_19px_-1px_rgb(178_178_178_/_22%)] flex justify-center items-center w-full h-full"> */}
      <NextImage
        sizes={'30vw'}
        src={appendAssetUrl(attributes.url)}
        title={attributes.alternativeText ?? ''}
        fill
        style={{ objectFit: 'contain' }}
        altText={attributes.alternativeText ?? ''}
        priority
      />
    </div>
  );
};

export default ImageCard;
