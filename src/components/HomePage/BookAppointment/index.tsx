'use client';

import SectionContainer from '@/components/Containers/SectionContainers';
import React, { useContext } from 'react';
import NextImage from '@/components/UIElements/NextImage';
import BookAppointmentGridRight from './BookAppointmentGridRight';
import BookAppointmentGridLeft from './BookAppointmentLeft';
import { ModalShowContextname } from '@/providers/coreServicesMOdalOpenContext';
import BookAnApptButton from './Button';
import { MobileModalShowContextname } from '@/providers/coreServicesModalMobileContext';

const BookAnAppointment = () => {
  const BookAnAppointmentContent = {
    title: 'Streamline Your Immigration Journey with Experts',
    btnLabel: 'Book an Appointment now',
  };

  const { toggleModalShown } = useContext(ModalShowContextname);
  const { toggleModalShown: toggleMobileModalShown } = useContext(MobileModalShowContextname);

  return (
    <SectionContainer cssClass="mb-20">
      <div className="md:w-full mx-auto relative h-fit bg-pale-sandal">
        <div className="mx-auto h-full z-[1]  md:w-[560px] relative z-1">
          <div className="mx-auto md:mx-0 py-5 px-6 md:px-0 md:py-10">
            <h1 className="md:w-[316px] text-black text-lg md:text-xl leading-[1.5] font-extrabold mb-5 md:mb-12">
              {BookAnAppointmentContent?.title}{' '}
            </h1>
            <BookAnApptButton
              cssClass="w-full md:w-fit"
              handleOnClick={() => {
                toggleModalShown();
                toggleMobileModalShown();
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
