
import CalenderIconYellow from '@/components/Icons/CalendarIconYellow';
import React, { ReactNode } from 'react';

export interface IButton {
  handleOnClick: () => void;
  cssClass?: string;
}

const BookAnApptButton = ({ handleOnClick, cssClass }: IButton) => {
  return (
    <button
      type="button"
      className={`${cssClass} p-[8px_12px] md:p-[10px_16px] border border-solid border-deep-yellow flex items-center text-xs font-medium not-italic leading-[normal] tracking-[normal] md:text-sm`}
      aria-label={'Book an appointment'}
      onClick={handleOnClick}
    >
      {'Book an appointment'}
      <div className="ml-[12px]">
      <CalenderIconYellow />
      </div>
    </button>
  );
};

export default BookAnApptButton;
