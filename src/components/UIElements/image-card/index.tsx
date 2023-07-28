import React from 'react';
import NextImage from '../NextImage';
import { motion } from 'framer-motion';

const ImageCard = ({
  imageUrl,
  cssClass,
  sizes,
  title,
  altText,
  iconClass,
  index,
}: {
  imageUrl: string;
  cssClass: string;
  sizes: string;
  title: string;
  altText: string;
  iconClass: string;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        ease: 'easeInOut',
        duration: 0.6,
        delay: 0.12,
      }}
      viewport={{ once: true }}
      className={
        'h-[120px] md:h-[240px] w-[86.666vw] max-w-[408.19px] shadow-lg md:w-full bg-white  border flex flex-col justify-center relative'
      }
    >
      <div
        className={`${iconClass} absolute top-0 right-0 mt-[13.6px] mr-[13.6px] lg:mt-[20px] lg:mr-[20px] border-t-[15px] border-l-[15px] lg:border-l-[22px]  lg:border-t-[22px] w-[15px] h-[15px] lg:w-[22px] lg:h-[22px]`}
      ></div>
      <div className={`${cssClass} relative`}>
        <NextImage sizes={sizes} src={process.env.NEXT_ASSETS_BASEURL + imageUrl} title={title} fill style={{ objectFit: 'contain' }} altText={altText} />
      </div>
    </motion.div>
  );
};

export default ImageCard;
