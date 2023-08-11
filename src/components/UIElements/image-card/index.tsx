import React from 'react';
import { motion } from 'framer-motion';

import NextImage from '../NextImage';

const ImageCard = ({
  imageUrl,
  cssClass,
  sizes,
  title,
  altText,
  iconClass,
  borderClass,
}: {
  imageUrl: string;
  cssClass: string;
  sizes: string;
  title: string;
  altText: string;
  iconClass: string;
  borderClass?: string;
}) => {
  return (
    <motion.div className="h-full md:h-auto md:w-full bg-white   flex flex-col justify-center relative">
      <div
        className={`${iconClass} ${borderClass?.replace(
          '.png',
          '',
        )} absolute top-0 right-0 mt-[13.6px] mr-[13.6px] lg:mt-[20px] lg:mr-[20px] border-l-transparent border-t-[15px] border-l-[15px] lg:border-l-[22px]  lg:border-t-[22px] w-[15px] h-[15px] lg:w-[22px] lg:h-[22px]`}
      ></div>
      <div className={`${cssClass} relative h-full bg-primary z-[111] flex justify-center`}>
        <div className="w-[78%] md:w-[80%] relative mx-0 h-full my-auto">
          <NextImage
            sizes={sizes}
            src={process.env.NEXT_ASSETS_BASEURL + imageUrl}
            title={title}
            fill
            style={{ objectFit: 'contain' }}
            altText={altText}
          />
        </div>
      </div>
      <div className=" w-[66%] mx-auto my-0 h-[89%] blur-[34.1px] md:w-[84%] md:h-[72%] absolute md:m-auto md:opacity-31 md:blur-[50px] bg-gray-300 bottom-0 right-0 left-0"></div>
    </motion.div>
  );
};

export default ImageCard;
