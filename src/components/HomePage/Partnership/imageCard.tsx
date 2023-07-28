import NextImage from "@/components/UIElements/NextImage";
import React from "react";

interface IimageCard {
    imageUrl:string,
    title:string
}

const ImageCard = ({imageUrl, title}: IimageCard) => (
    <div className="relative flex justify-center items-center mb-4 w-[146px] h-[112.5px] lg:w-[260px] lg:h-[177px]">
        <NextImage
          sizes={'30vw'}
          src={imageUrl}
          title={title}
          fill
          style={{ objectFit: 'contain' }}
          altText={title}
        />
      </div>
)

export default ImageCard