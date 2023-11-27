import React from 'react';
import { appendAssetUrl, formatDate } from '@/utils';
import { IAttributes } from '@/app/services/apiService/interfaces';
import NextImage from '../../NextImage';
import Button from '../../Button';

export interface IBlogCardData {
  id: number;
  attributes: IAttributes;
}

const BlogCard = ({ attributes }: IBlogCardData) => {
  return (
    <div className="py-[3px] relative flex flex-col h-full">
      <div className="h-[10rem] md:min-h-[252px] md:h-[15.75rem] relative">
        <NextImage
          sizes="(max-width: 768px) 100vw,  25vw"
          src={appendAssetUrl(attributes.media_url?.data[0].attributes.url)}
          title="Blog Image"
          fill
          style={{ objectFit: 'cover' }}
          altText={attributes.media_url?.data[0].attributes.alternativeText}
        />
      </div>
      <div className="p-[16px] flex-grow-[1] md:p-[28px] flex flex-col justify-between gap-y-[57px] bg-white blog-bg">
        <h5 className="text-xs line-clamp-3 font-semibold not-italic leading-[1.67] tracking-[normal] md:text-base text-primary-font-color">
          {attributes.title}
        </h5>
        <div className="flex line-clamp-2 gap-x-[12px] flex-wrap items-start flex-col-reverse md:flex-row  md:flex-nowrap md:items-center w-full justify-between">
          <Button
            label="Read More"
            ariaLabel="Read More"
            cssClass="text-black"
            handleOnClick={() => null}
            tabIndex={0}
          />
          <div className="text-xs mb-[8px] md:mb-[0px] mt-[8px] md:mt-0 order-2 md:order-1  not-italic leading-[normal] tracking-[normal] md:text-sm">
            <span className="mr-[8px]  opacity-[0.36] text-primary-font-color">Last updated:</span>
            <span className="line-clamp-2 text-primary-font-color">{formatDate(attributes.updatedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
