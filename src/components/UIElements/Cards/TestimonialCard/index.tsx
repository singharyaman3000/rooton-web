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
  return (
    <div className={`h-[27rem] md:h-[32.5rem] p-[12.8px] md:p-[20px] relative ${type === 'text' ? 'bg-secondary-grey' : ''}`}>
      <div className=" relative h-full">
        {type === 'text' && (
          <div className="text-xs font-medium p-[20px] md:p-[36px] not-italic !leading-[1.67] tracking-[normal] md:text-sm text-black">
            <p>{HtmlParser(attributes?.description)}</p>
          </div>
        )}
        <div className="absolute flex  items-center z-[10] left-0 bottom-0 bg-white p-[10px] md:p-[16px] w-full">
          <TestimonialFooter
            college_photo={appendAssetUrl(attributes?.icon.data?.[0].attributes.url)}
            name={attributes?.name}
            college={attributes?.college}
            caption={attributes?.profile_picture.data.attributes.caption}
            url={attributes?.profile_picture.data.attributes.url}
            alternativeText={attributes?.profile_picture.data.attributes.alternativeText}
          />
        </div>
      </div>
      {type === 'video' && (
        <div className="w-full h-full absolute flex flex-col justify-center items-center left-0 top-0">
          <NextImage
            src={appendAssetUrl(attributes?.icon.data[0].attributes.url)}
            altText={attributes?.icon.data[0].attributes.alternativeText}
            fill
            style={{ objectFit: 'cover' }}
            title="Video thumbnail"
            sizes="
              (max-width: 768px)100vw,
               33vw"
          />
          <div className="absolute w-full h-full top-0 bg-black opacity-[0.32]"></div>
          <button className="relative z-10" type="button" onClick={() => handleOnClick(attributes)}>
            <PlayButton />
          </button>
        </div>
      )}
    </div>
  );
};

export default TestimonialCard;
