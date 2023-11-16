import React from 'react';
import PlayButton from '@/components/Icons/PlayButton';
import { IMediaUrlData, MediaUrl } from '@/app/services/apiService/interfaces';
import HtmlParser from 'react-html-parser';
import { appendAssetUrl } from '@/utils';
import NextImage from '../../NextImage';
import TestimonialFooter from './TestimonialFooter';

export interface ITestimonialAttributes {
  name: string;
  description: string;
  college: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  testimonial_type: string;
  media_url: MediaUrl;
  icon: MediaUrl;
  profile_picture: { data: IMediaUrlData };
}

export interface ITestimonial {
  type?: 'video' | 'text';
  /* eslint-disable no-unused-vars */
  handleOnClick: (attributes: ITestimonialAttributes) => void;
}

export interface ITestimonialData extends ITestimonial {
  id: number;
  attributes: ITestimonialAttributes;
}

const TestimonialCard = ({ attributes, type, handleOnClick }: ITestimonialData) => {
  const getVideoThumbnail = () => {
    const thumbnailObj = attributes?.media_url?.data?.find((item) => {
      return item.attributes.formats;
    });
    let thumbnailUrl = '';
    if (thumbnailObj) thumbnailUrl = thumbnailObj?.attributes?.formats?.thumbnail?.url;
    else thumbnailUrl = attributes?.icon?.data?.[0]?.attributes?.url;
    return appendAssetUrl(thumbnailUrl);
  };

  return (
    <div
      className={`h-[520px] p-[24px] md:p-[20px]
      relative ${type === 'text' ? 'bg-secondary-grey' : ''}`}
    >
      <div className=" relative h-full">
        {type === 'text' && (
          <div
            className="text-[13px] font-medium p-[16px] pr-[10px] md:p-[36px] md:pr-[26px]
            not-italic !leading-[1.67] tracking-[normal] md:text-sm text-black
            h-[calc(100%-80px)]"
          >
            <p className="h-full overflow-y-auto pr-[10px]">{HtmlParser(attributes?.description)}</p>
          </div>
        )}
        <div className="absolute flex  items-center z-[10] left-0 bottom-0 bg-white p-[13px] md:p-[16px] w-full">
          <TestimonialFooter
            college_photo={appendAssetUrl(attributes?.icon?.data?.[0]?.attributes?.url)}
            name={attributes?.name}
            college={attributes?.college}
            caption={attributes?.profile_picture?.data?.attributes?.caption}
            url={attributes?.profile_picture?.data?.attributes?.url}
            alternativeText={attributes?.profile_picture?.data?.attributes?.alternativeText}
          />
        </div>
      </div>
      {type === 'video' && (
        <div className="w-full h-full absolute flex flex-col justify-center items-center left-0 top-0">
          <NextImage
            src={getVideoThumbnail()}
            altText={attributes?.icon?.data?.[0]?.attributes?.alternativeText}
            fill
            style={{ objectFit: 'cover' }}
            title="Video thumbnail"
            sizes="
              (max-width: 768px)100vw,
               33vw"
          />
          <div className="absolute w-full h-full top-0 bg-black opacity-[0.32]"></div>
          <button
            className="relative z-10"
            type="button"
            onClick={() => handleOnClick(attributes)}
            aria-label="Play video"
          >
            <PlayButton />
          </button>
        </div>
      )}
    </div>
  );
};

export default TestimonialCard;
