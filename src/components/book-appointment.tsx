'use client';

import { InlineWidget } from 'react-calendly';

export default function BookAppointment() {
  return (
    <div className=" w-full">
      <InlineWidget
        url="https://calendly.com/root-on-immigration-consultants/migrate-to-canada-with-us"
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
