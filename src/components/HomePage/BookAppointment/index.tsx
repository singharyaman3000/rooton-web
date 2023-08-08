
import SectionContainer from '@/components/Containers/SectionContainers';
import React from 'react';
import Button from '@/components/UIElements/Button';
import CalenderIconYellow from '@/components/Icons/CalendarIconYellow';
import NextImage from '@/components/UIElements/NextImage';
import { getAssetUrl } from '@/utils';
import BookAppointmentGridRight from './BookAppointmentGridRight';
import BookAppointmentGridLeft from './BookAppointmentLeft';

const BookAnAppointment = () => {

  const BookAnAppointmentContent = {
    title: 'Streamline Your Immigration Journey with Experts',
    btnLabel: 'Book an Appointment now',
  };
  

  const src = ' /images/homepage/bookanappointment.png';
  console.log(typeof '' === 'string' ? getAssetUrl(src) : src || '');

  return (
    <SectionContainer cssClass="md:mb-20">
      <div className="md:w-full mx-auto relative h-[240px] bg-pale-sandal">
        <div className="mx-auto h-full z-[1]  md:w-[560px] relative z-1">
          <div className="py-10">
            <h1 className="md:w-[316px] text-black text-xl leading-[1.5] font-extrabold mb-12">
              {BookAnAppointmentContent?.title}{' '}
            </h1>
            <Button
              label={BookAnAppointmentContent?.btnLabel}
              ariaLabel={BookAnAppointmentContent?.btnLabel}
              cssClass="text-white bg-black border-0 !py-[17px] gap-[16px]"
              handleOnClick={() => null}
              tabIndex={0}
              icon={<CalenderIconYellow />}
            />
          </div>
          <div className="absolute top-0 right-0">
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
