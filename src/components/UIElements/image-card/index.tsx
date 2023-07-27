import React from "react"
import NextImage from "../NextImage"

const ImageCard = ({
  imageUrl,
  cssClass,
  sizes,
  title,
  altText,
  iconClass
}: {
  imageUrl: string;
  cssClass: string;
  sizes: string;
  title: string;
  altText: string;
  iconClass: string;
}) => {
  return (
    <div
      className={
        'h-[120px] md:h-[240px] w-[86.666vw] max-w-[408.19px] shadow-lg md:w-full bg-white  border flex flex-col justify-center relative'
      }
    >
      <div className={`${iconClass} absolute top-0 right-0 mt-[13.6px] mr-[13.6px] lg:mt-[20px] lg:mr-[20px] border-t-[15px] border-l-[15px] lg:border-l-[22px]  lg:border-t-[22px] w-[15px] h-[15px] lg:w-[22px] lg:h-[22px]`}></div>
      <div className={`${cssClass} relative`}>
        <NextImage sizes={sizes} src={imageUrl} title={title} fill style={{ objectFit: 'contain' }} altText={altText} />
      </div>
    </div>
  );
};

export default ImageCard