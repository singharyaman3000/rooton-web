'use client';

import CalenderIcon from '@/components/Icons/CalenderIcon';
import RTONButton from '../RTONButton';

export default function BookAnAppointmentButton() {
  return <RTONButton
    ariaLabel='Book an appointment'
    onClick={() => {}}
    text="Book an appointment"
    icon={<CalenderIcon />}
  />;
}
