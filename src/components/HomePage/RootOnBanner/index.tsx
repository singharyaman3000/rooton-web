'use client';

import NextImage from '@/components/UIElements/NextImage';
import { ReactElement } from 'react';
import Image from 'next/image';
import ReactHtmlParser from 'react-html-parser';
import { motion } from 'framer-motion';
import BannerGrids from './BannerGrid';

type RTONBannerProps = {
  backgroundImageUrl: string;
  heroText: string;
  description: string;
  button: ReactElement;
};

export default function RootOnBanner({ backgroundImageUrl, heroText, description, button }: RTONBannerProps) {
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
      <div className=" w-full h-full flex flex-col justify-end z-20">
        <div
          className="
           pb-[36px] md:pb-[120px]
          relative z-[10]
          px-[24px]
          whitespace-pre-wrap
          md:px-[80px]
          "
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
                    text-[37.2px]
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
            <p className="mt-[15px] md:mt-[35px] text-white font-bold text-[15px] leading-[1.67] lg:text-2xl">
              {ReactHtmlParser(description)}
            </p>
          </motion.div>

          <div className=" mt-[57.8px] max-w-[418px]">{button}</div>
        </div>
      </div>
      <NextImage
        sizes="100vw"
        priority
        src={backgroundImageUrl}
        fill
        style={{ objectFit: 'cover' }}
        altText="root-on-banner-image"
        title="Banner Image"
      />
      <Image alt="" priority fill src="/images/overlay/banner-overlay.png" style={{ objectFit: 'cover' }} />
      <div className="absolute bottom-0 right-0 hidden md:block">
        <BannerGrids />
      </div>
    </div>
  );
}
