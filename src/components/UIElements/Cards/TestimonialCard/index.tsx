import React from 'react';
import NextImage from '../../NextImage';
import artistThumbnail from '../../../../../public/images/user.png';
import QuoteIcon from '../../../../../public/images/icons/quote.png';
import PlayButton from '@/components/Icons/PlayButton';

export interface ITestimonial {
  type?: 'video' | 'text';
}

const TestimonialCard = ({ type }: ITestimonial) => {
  return (
    <div className={`h-[32.5rem] p-[12.8px] md:p-[20px] relative ${type === 'text' ? 'bg-secondary-grey' : ''}`}>
      <div className=" relative h-full">
        {type === 'text'&& <div className='text-xs font-medium p-[20px] md:p-[36px] not-italic !leading-[1.67] tracking-[normal] md:text-sm text-primary-text'>
          <p>
            "I got admission to Meng Mechanical at the University of Windsor. And I got my PPR in 11 Days. Yes, it is
            true. It was a great experience to work with Root On. They give personalized attention to every detail of my
            profile. They regularly keep in touch with me and give regular updates on the University administration
            process to till date I have received my PPR. Thank you Mehulsir, Anjali ma'am, and Ronaksir for everything.
            This means a lot."
          </p>
        </div>}
        <div className="absolute flex  items-center z-[10] left-0 bottom-0 bg-white p-[10px] md:p-[16px] w-full">
          <div className="relative w-full flex items-center">
            <div className="absolute right-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="48.5" height="39.99" viewBox="0 0 48.5 39.99">
                <defs>
                  <linearGradient x1="0%" y1="113.297%" x2="193.447%" y2="18%" id="2udtthevka">
                    <stop stop-color="#C8C8C8" stop-opacity="0" offset="0%" />
                    <stop stop-color="#979797" offset="100%" />
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
            <div className="square-[30.7px] mr-[14px] rounded-full overflow-hidden md:square-[48px] relative">
              <NextImage
                src={artistThumbnail}
                fill={true}
                title="Artist"
                altText={'at'}
                style={{ objectFit: 'cover' }}
                sizes="
              (max-width: 768px) 50vw,
               25vw"
              />
            </div>
            <div className="">
              <div className="text-bold font-bold text-[11.2px] text-primary-text  not-italic leading-[normal] tracking-[normal] md:text-base ">
                Darshan Modi
              </div>
              <div className="text-[10px] text-primary-text  not-italic leading-[normal] tracking-[normal] md:text-[14px]">
                University of Windsor
              </div>
            </div>
          </div>
        </div>
      </div>
      {type === 'video' &&<div className='w-full h-full absolute flex flex-col justify-center items-center left-0 top-0'>
            <NextImage src={'/images/tempImages/testimonial.png'} altText='testimonial video' fill={true}
              style={{ objectFit: 'cover' }}
              title=''
              sizes="
              (max-width: 768px)100vw,
               33vw"
            />
            <div className='absolute w-full h-full top-0 bg-black opacity-[0.32]'>

            </div>
             <button className='relative z-10'>
             <PlayButton/>

             </button>
            
            </div>}
    </div>
  );
};

export default TestimonialCard;
