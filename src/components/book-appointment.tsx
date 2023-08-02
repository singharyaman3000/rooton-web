'use client';

import { InlineWidget, useCalendlyEventListener } from 'react-calendly';

type BookAppointmentProps = {
  url: string;
  onEventTypeViewed: () => void;
};

export default function BookAppointment({ url, onEventTypeViewed }: BookAppointmentProps) {

  useCalendlyEventListener({
    onEventTypeViewed,
  });

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
