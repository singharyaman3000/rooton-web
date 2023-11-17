'use client';

import SectionContainer from '@/components/Containers/SectionContainers';
import React from 'react';
import NextImage from '@/components/UIElements/NextImage';
import BookAppointmentGridRight from './BookAppointmentGridRight';
import BookAppointmentGridLeft from './BookAppointmentLeft';
import BookAnApptButton from './Button';

interface IBookAnAPpointment {
  onClick: () => void;
  appointmentBtnLabel?: string;
  containerClass?: string;
  btnClass?: string;
}

const BookAnAppointment = ({ appointmentBtnLabel, onClick, containerClass, btnClass }: IBookAnAPpointment) => {
  const BookAnAppointmentContent = {
    title: 'Streamline Your Immigration Journey with Experts',
    btnLabel: appointmentBtnLabel || 'Book an Appointment now',
  };

  return (
    <SectionContainer cssClass="">
      <div className="md:w-full mx-auto relative h-fit bg-pale-sandal overflow-hidden">
        <div className="mx-auto h-full z-[1] overflow-hidden md:w-[560px] relative z-1">
          <div className={`${containerClass} mx-auto md:mx-0 pt-[24px] pb-5 px-[24px] md:px-0 md:py-10`}>
            <h1 className="md:w-[316px] text-black text-[18px] md:text-[20px] leading-[1.5]
              font-extrabold mb-[20px] md:mb-[48px]">
              {BookAnAppointmentContent?.title}{' '}
            </h1>
            <BookAnApptButton
              btnLabel={BookAnAppointmentContent.btnLabel}
              cssClass={`${btnClass} w-full md:w-fit md:max-w-[294px]`}
              handleOnClick={() => {
                onClick();
              }}
            />
          </div>
          <div className="flex flex-col items-center md:hidden">
            <div className="relative w-[264px] h-[240px]">
              <NextImage
                sizes={'30vw'}
                src={'/images/homePage/bookanappointment-mobile.png'}
                title={'book an appointment'}
                fill
                style={{ objectFit: 'contain' }}
                altText={'book an appointment'}
              />
            </div>
          </div>
          <div className="md:absolute md:top-0 md:right-0 hidden md:block">
            <div className="relative w-[377px] h-[240px]">
              <NextImage
                sizes={'30vw'}
                src={'/images/homePage/bookanappointment.png'}
                title={'book an appointment'}
                fill
                style={{ objectFit: 'contain' }}
                altText={'book an appointment'}
              />
            </div>
          </div>
        </div>
        <div className="absolute z-[0] top-0 right-0 hidden lg:block">
          <BookAppointmentGridRight />
        </div>
        <div className="absolute z-[0] top-0 left-0 hidden lg:block">
          <BookAppointmentGridLeft />
        </div>
      </div>
    </SectionContainer>
  );
};

export default BookAnAppointment;
