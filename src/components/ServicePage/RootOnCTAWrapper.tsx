import { ReactElement } from 'react';
import RTONButtonBlack from '../RTONButtonBlack';
import NextImage from '../UIElements/NextImage';

type RootOnCTAWrapperProps = {
  buttonText: string;
  buttonIcon: ReactElement;
  buttonAriaLabel: string;
  onClick: () => void;
  imageSrc: string;
  imageAlt: string;
  imageTitle: string;
  heading: string | ReactElement;
};

export default function RootOnCTAWrapper({
  buttonText,
  buttonIcon,
  buttonAriaLabel,
  onClick,
  imageSrc,
  imageAlt,
  imageTitle,
  heading,
}: RootOnCTAWrapperProps) {
  return (
    <div className=" bg-pale-sandal mt-20 px-6 pt-6 flex flex-col gap-5 md:flex-row-reverse md: justify-center">
      <div className=' m-auto md:m-0 flex flex-col gap-5 lg:gap-12 md:justify-center'>
        <h4 className=" text-lg text-black font-extrabold leading-primary-lg">
          {heading}
        </h4>
        <RTONButtonBlack
          icon={buttonIcon}
          text={buttonText}
          onClick={onClick}
          ariaLabel={buttonAriaLabel}
          className=" max-w-[400px]"
        />
      </div>
      <div className=" max-w-[264px] m-auto relative h-60 w-full lg:w-64 lg:gap-8 md:m-0">
        <NextImage src={imageSrc} altText={imageAlt} fill sizes="30vw" title={imageTitle} />
      </div>
    </div>
  );
}
