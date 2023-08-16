'use client';

import CalenderIcon from '@/components/Icons/CalenderIcon';
import RTONButton from '../RTONButton';

type BookAnAppointmentButtonProps = {
  onClick: () => void;
}

export default function BookAnAppointmentButton({ onClick }: BookAnAppointmentButtonProps) {
  return <RTONButton
    ariaLabel='Book an appointment'
    onClick={onClick}
    text="Book an appointment"
    icon={<CalenderIcon />}
  />;
}
