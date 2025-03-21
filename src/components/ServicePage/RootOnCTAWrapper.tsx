import { ReactElement } from 'react';
import RTONButtonBlack from '../RTONButtonBlack';
import NextImage from '../UIElements/NextImage';
import BookAppointmentGridRight from '../UIElements/BookAnAppointment/BookAppointmentGridRight';
import BookAppointmentGridLeft from '../UIElements/BookAnAppointment/BookAppointmentLeft';

type RootOnCTAWrapperProps = {
  buttonText: string;
  buttonIcon: ReactElement;
  buttonAriaLabel: string;
  onClick: () => void;
  imageSrc: string;
  imageAlt: string;
  imageTitle: string;
  heading: string | ReactElement;
  containerClass?:string;
  btnClass?: string;
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
  containerClass,
  btnClass,
}: RootOnCTAWrapperProps) {
  return (
    <div className={`${containerClass} bg-pale-sandal md:relative px-6 pt-6 md:pt-0`}>
      <div className="absolute z-[0] top-0 right-0 hidden lg:block">
        <BookAppointmentGridRight />
      </div>
      <div className="absolute z-[0] top-0 left-0 hidden lg:block">
        <BookAppointmentGridLeft />
      </div>
      <div className='z-[2] relative flex flex-col gap-6 md:flex-row-reverse  justify-center'>
        <div className="max-w-full m-auto md:m-0 flex flex-col gap-[20px] md:gap-[48px] md:justify-center">
          <h4 className=" text-[18px] md:text-[20px] text-black font-extrabold leading-primary-lg">{heading}</h4>
          <RTONButtonBlack
            icon={buttonIcon}
            text={buttonText}
            onClick={onClick}
            ariaLabel={buttonAriaLabel}
            className={`${btnClass} max-w-[400px]`}
          />
        </div>
        <div className=" max-w-[264px] m-auto relative h-60 w-full lg:w-64 lg:gap-8 md:m-0">
          <NextImage src={imageSrc} altText={imageAlt} fill sizes="30vw" title={imageTitle} />
        </div>
      </div>
    </div>
  );
}
