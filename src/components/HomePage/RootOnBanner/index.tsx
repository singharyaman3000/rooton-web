'use client';

import NextImage from '@/components/UIElements/NextImage';
import { ReactElement } from 'react';
import Image from 'next/image';
import ReactHtmlParser from 'react-html-parser';
import { motion } from 'framer-motion';
import VideoElement from '@/components/UIElements/VideoElement';
import BannerGrids from './BannerGrid';
import { SOURCE_PAGE } from '@/components/BlogsListPage/constants';

type RTONBannerProps = {
  backgroundImageUrl: string;
  heroText: string;
  description: string;
  button: ReactElement;
  isVideoBanner: boolean;
  sourcePage?: string;
};

export default function RootOnBanner({
  sourcePage,
  backgroundImageUrl,
  isVideoBanner,
  heroText,
  description,
  button,
}: RTONBannerProps) {
  return (
    <div
      className="
        w-full
        relative
        mt-0
        h-[100vh]
        max-h-[650px]
        md:max-h-[unset]
        min-h-[380px]
      "
    >
      <div className={`${!(sourcePage && sourcePage === SOURCE_PAGE.SERVICE) ? 'md:justify-evenly' : ''}
      w-full h-full flex flex-col justify-end  z-20`}>
        <div
          className={` ${sourcePage && sourcePage === SOURCE_PAGE.SERVICE ?
            'xs:pb-[36px] sm:pb-[60px] md:pb-[101px] md:pt-[50px]' :
            'pb-[36px] md:pb-0 md:pt-[50px]'}
          relative z-[10]
          px-[24px]
          whitespace-pre-wrap
          md:px-[48px]
          lg:px-[80px]
          `}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              ease: 'easeInOut',
              duration: 0.5,
            }}
            className="overflow-hidden w-full"
          >
            <h1
              className="
                    banner-text
                    xs:text-[30px]
                    md:text-[37.2px]
                    lg:text-[62px]
                    mr-9
                    font-bold
                    leading-[normal]
                    text-white
                    font-jakartaSans
                    banner-text
                "
            >
              {ReactHtmlParser(heroText)}
            </h1>
            <p className={`${sourcePage && sourcePage === SOURCE_PAGE.SERVICE ?
              'mt-[24px] lg:mt-[20px] whitespace-normal md:whitespace-break-spaces' :
              'mt-[15px] md:mt-[35px]'} text-white font-bold text-[15px] leading-[1.67] lg:text-2xl`}>
              {ReactHtmlParser(description)}
            </p>
          </motion.div>

          <div className={`${sourcePage && sourcePage === SOURCE_PAGE.SERVICE ? 'mt-[40px] lg:mt-[102px]' :
            'mt-[32px] md:mt-[68.4px]'} w-full md:max-w-[418px]`}>{button}</div>
        </div>
      </div>
      {isVideoBanner ? (
        <VideoElement
          constrols={false}
          muted
          poster=""
          cssClass="top-0 object-cover w-full h-full absolute top-0"
          loop
          src={backgroundImageUrl}
        />
      ) : (
        <NextImage
          sizes="100vw"
          priority
          src={backgroundImageUrl}
          fill
          style={{ objectFit: 'cover' }}
          altText="root-on-banner-image"
          title="Banner Image"
        />
      )}
      <Image alt="" priority fill src="/images/overlay/banner-overlay.png" style={{ objectFit: 'cover' }} />
      <div className="absolute bottom-0 right-0 hidden md:block">
        <BannerGrids />
      </div>
    </div>
  );
}
