import { useRef } from 'react';
import BookAppointmentForm from '@/components/AboutUsPage/BookAppointmentForm';
import { BOOK_APPOINTMENT_FORM_META } from '../constants';

const SocialSection = () => {
  const bookRef = useRef<HTMLElement>(null);
  const p1 =
    'In recent years, social media has enhanced the work of our real estate agents, that are now able to showcase the properties they represent on multiple channels.';
  const p2 =
    'Be the first to find out about the most recent estates we are renting and/or selling and follow is on social media!.';

  return (
    <section className="flex flex-col lg:flex-row">
      <div className="text-sm px-6 lg:w-[50%] lg:text-base pb-[51px] pt-[68px] lg:pb-0 lg:pt-0 flex flex-col justify-center">
        <h2 className="text-[28px] lg:text-[40px] mb-10 font-extrabold">{"Let's be social"}</h2>
        <div></div>
        <p className="max-w-[469px]">{p1 + p2}</p>
      </div>
      {/* Form section */}
      <div className="contact-us-form-container px-6 lg:px-0">
        <BookAppointmentForm
          sectionRef={bookRef}
          displayBookAppointment
          formData={BOOK_APPOINTMENT_FORM_META.formData}
          formHeading={BOOK_APPOINTMENT_FORM_META.formHeading}
          imageUrl={BOOK_APPOINTMENT_FORM_META.imageUrl}
        />
      </div>
    </section>
  );
};

export default SocialSection;
