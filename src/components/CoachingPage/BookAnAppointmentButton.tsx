'use client';

import CalenderIcon from '@/components/Icons/CalenderIcon';
import RTONButton from '../RTONButton';

type BookAnAppointmentButtonProps = {
  onClick: () => void;
  text: string;
}

export default function BookAnAppointmentButton({ onClick, text }: BookAnAppointmentButtonProps) {
  return <RTONButton
    ariaLabel={text}
    onClick={onClick}
    text={text}
    icon={<CalenderIcon />}
  />;
}
