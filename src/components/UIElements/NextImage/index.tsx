// import { getAssetUrl } from '@/utils';
import { OnLoadingComplete, PlaceholderValue, StaticImageData } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import React, { CSSProperties } from 'react';

export interface INextImage {
  src: string | StaticImageData;
  classSelector?: string;
  altText: string;
  priority?: boolean;
  disableStyle?: boolean;
  objectFit?: 'contain' | 'cover';
  handleLoadingComplete?: (e: ImageSize) => void;
  sizes: string;
  fill: boolean;
  style?: CSSProperties;
  title:string
}

export type ImageSize = {
  naturalHeight: number;
  naturalWidth: number;
};

const NextImage = ({
  src,
  altText,
  priority = false,
  disableStyle = false,
  objectFit = 'contain',
  handleLoadingComplete,
  sizes = '',
  fill = true,
  style,
  classSelector,
  title
}: INextImage) => {
    const getAssetUrl = (src:string) => src
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