'use client';

import RTONBanner from '../RTONBanner';
import BookAnAppointmentButton from '../ServicePage/BookAnAppointmentButton';
import BookAnAppointment from '../UIElements/BookAnAppointment';
import MapSection from './MapSection';
import SocialSection from './SocialSection';
import { BREAD_BRUMB_PATHS } from './constants';

const des =
  'Personalized immigration guidance from a licensed professional. Discover the best pathway for your Canadian dream.';

const ContactUs = () => {
  return (
    <>
      <RTONBanner
        breadCrumbData={BREAD_BRUMB_PATHS}
        heroText={'Contact Us' ?? ''}
        description={des}
        backgroundImageUrl={''}
        addGradient
        heightStyle="h-[640px] lg:h-[500px]"
        subDescription="Book 1:1 Paid Consultation with RCIC!"
        button={<BookAnAppointmentButton text="Book an Appoinment now" onClick={() => {}} />}
      />
      <div className='lg:p-20'>
        <SocialSection />
        <MapSection />
        <BookAnAppointment onClick={() => {}} />
      </div>
    </>
  );
};

export default ContactUs;
