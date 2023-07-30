import React from 'react';
import { appendAssetUrl, formatDate } from '@/utils';
import NextImage from '../../NextImage';
import Button from '../../Button';
import gridOverlay from '../../../../../public/images/overlay/card-grid-overlay.png';
import { IAttributes } from '@/app/services/apiService/interfaces';

export interface IBlogCardData {
  id: number;
  attributes: IAttributes;
}

const BlogCard = ({ attributes }: IBlogCardData) => {
  return (
    <div className="py-[3px] relative">
      <div className="h-[10rem] md:min-h-[252px] md:h-[15.75rem] relative">
        <NextImage
          sizes=""
          src={appendAssetUrl(attributes.media_url.data[0].attributes.url)}
          title=""
          fill
          style={{ objectFit: 'cover' }}
          altText={attributes.media_url.data[0].attributes.alternativeText}
        />
      </div>
      <div className="p-[16px] md:p-[28px] flex flex-col justify-between gap-y-[57px] bg-white ">
        <h5 className="text-xs text-primary-text font-semibold not-italic leading-[1.67] tracking-[normal] md:text-base">
          {attributes.title}
        </h5>
        <div className="flex flex-wrap md:flex-nowrap items-center w-full justify-between">
          <Button label="Read More" ariaLabel="Read More" handleOnClick={() => null} tabIndex={0} />
          <div className="text-xs mt-[8px] md:mt-0 order-2 md:order-1  not-italic leading-[normal] tracking-[normal] md:text-sm">
            <span className="mr-[8px]  opacity-[0.36] text-primary-text">Last updated:</span>
            <span className="">{formatDate(attributes.updatedAt)}</span>
          </div>
        </div>
      </div>
      <div className="absolute">
        <NextImage src={gridOverlay} altText="" title="" fill={false} sizes="" />
      </div>
    </div>
  );
};

export default BlogCard;
