import CalenderIconYellow from '@/components/Icons/CalendarIconYellow';
import React from 'react';

export interface IButton {
  handleOnClick: () => void;
  cssClass?: string;
}

const BookAnApptButton = ({ handleOnClick, cssClass }: IButton) => {
  return (
    <button
      type="button"
      className={`${cssClass} py-[15.9px] px-[18px] text-white bg-black flex justify-center text-sm font-medium not-italic leading-[normal] tracking-[normal] md:text-sm`}
      aria-label={'Book an appointment'}
      onClick={handleOnClick}
    >
      {'Book an Appointment now'}
      <div className="ml-[16px]">
        <CalenderIconYellow />
      </div>
    </button>
  );
};

export default BookAnApptButton;
