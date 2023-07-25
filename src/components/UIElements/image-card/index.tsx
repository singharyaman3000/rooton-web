import React from "react"
import NextImage from "../NextImage"

const ImageCard = ({
  imageUrl,
  cssClass,
  sizes,
  title,
  altText,
}: {
  imageUrl: string;
  cssClass: string;
  sizes: string;
  title: string;
  altText: string;
}) => {
  return (
    <div className={'h-[120px] md:h-[240px] w-[86.666vw] max-w-[408.19px] shadow-lg md:w-full  border flex flex-col justify-center'}>
        <div className={`${cssClass} relative`}>
          <NextImage
            sizes={sizes}
            src={imageUrl}
            title={title}
            fill
            style={{ objectFit: 'contain' }}
            altText={altText}
          />
        </div>
    </div>
  );
};

export default ImageCard