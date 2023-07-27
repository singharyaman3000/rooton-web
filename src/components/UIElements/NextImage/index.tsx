import { getAssetUrl } from '@/utils';
import { StaticImageData } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import React, { CSSProperties } from 'react';

export interface INextImage {
  src: string | StaticImageData;
  classSelector?: string;
  altText: string;
  priority?: boolean;
  sizes: string;
  fill: boolean;
  style?: CSSProperties;
  title: string;
}

const NextImage = ({
  src,
  altText,
  priority = false,
  sizes = '',
  fill = true,
  style,
  classSelector,
  title,
}: INextImage) => {
  return (
    <Image
      className={classSelector}
      sizes={sizes}
      src={typeof src === 'string' ? getAssetUrl(src) : src || ''}
      fill={fill}
      alt={altText}
      priority={priority}
      title={title}
      style={style}
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPcuHujBQAGmQJXrAhuFQAAAABJRU5ErkJggg=="
    />
  );
};

export default NextImage;
