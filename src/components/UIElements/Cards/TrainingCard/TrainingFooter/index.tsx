import { IMediaAttributes } from '@/app/services/apiService/interfaces';
import NextImage from '@/components/UIElements/NextImage';
import { appendAssetUrl } from '@/utils';
import React from 'react';

export type TTestimonialFooter = Pick<IMediaAttributes, 'alternativeText' | 'url' | 'caption'> & {
  name: string;
  college: string;
  college_photo: string;
};

const TrainingFooter = ({ alternativeText, url, caption, name, college, college_photo }: TTestimonialFooter) => {
  return (
    <div className="relative w-full flex items-center">
      <div className="absolute right-0 w-[30px] h-[24px] md:w-[47.5px] md:h-[38px]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48.5 39.99">
          <defs>
            <linearGradient x1="0%" y1="113.297%" x2="193.447%" y2="18%" id="2udtthevka">
              <stop stopColor="#C8C8C8" stopOpacity="0" offset="0%" />
              <stop stopColor="#979797" offset="100%" />
            </linearGradient>
          </defs>
          <path
            d="M294 463.798h13.767c.415 1.827.556 3.786.366 5.785-.295 3.162-1.397 6.416-3.273 9.417a22.36 22.36 0 0 0 7.789-7.853c2.116-3.592 2.809-7 3.065-9.01V441H294v22.798zm25.786 0h13.767c.414 1.827.556 3.786.365 5.785-.294 3.162-1.396 6.416-3.272 9.417a22.36 22.36 0 0 0 7.789-7.853c2.116-3.592 2.809-7 3.065-9.01V441h-21.714v22.798z"
            transform="translate(-293.5 -440.5)"
            fillRule="nonzero"
            stroke="url(#2udtthevka)"
            fill="none"
          />
        </svg>
      </div>
      <div className="square-[30.7px] flex-shrink-0 mr-[14px] rounded-full overflow-hidden md:square-[48px] relative">
        <NextImage
          src={appendAssetUrl(url)}
          fill
          title={caption}
          altText={alternativeText}
          style={{ objectFit: 'cover' }}
          sizes="
              (max-width: 768px) 50vw,
               25vw"
        />
      </div>
      <div className="max-w-[72%]">
        <div className="text-bold line-clamp-1 font-bold text-[11.2px] text-black  not-italic leading-[normal] tracking-[normal] md:text-base ">
          {name}
        </div>
        <div className="flex items-center relative ">
          {college_photo && (
            <div className="h-[14px] relative w-[12px] md:w-[20px] md:h-[20px] mr-[5px] md:mr-[6px]">
              <NextImage
                src={college_photo}
                fill
                style={{ objectFit: 'cover' }}
                sizes="100vw"
                altText="college photo"
                title=""
              />
            </div>
          )}
          <div className="text-[10px] line-clamp-1 text-[#2f2f2f;]  not-italic leading-[normal] tracking-[normal] md:text-[14px]">
            {college}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingFooter;
