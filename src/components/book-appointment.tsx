'use client';

import { InlineWidget } from 'react-calendly';

type BookAppointmentProps = {
  url: string;
};

export default function BookAppointment({ url }: BookAppointmentProps) {

  return (
    <div className=" w-full">
      <InlineWidget
        url={url}
        styles={{
          padding: '8px',
          height: '710px',
          width: '100%',
        }}
        pageSettings={{
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: '32a852',
          textColor: '4d5055',
        }}
      />
    </div>
  );
}
