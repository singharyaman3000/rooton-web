'use client';

import CalenderIcon from '@/icons/CalenderIcon';
import RTONButton from '../RTONButton';

export default function BookAnAppointmentButton() {
  return <RTONButton
    ariaLabel='Book an appointment'
    onClick={() => {}}
    text="Book an appointment"
    icon={<CalenderIcon />}
  />;
}
