import CalenderIconYellow from '@/components/Icons/CalendarIconYellow';
import React from 'react';

export interface IButton {
  btnLabel: string;
  handleOnClick: () => void;
  cssClass?: string;
}

const BookAnApptButton = ({ btnLabel, handleOnClick, cssClass }: IButton) => {
  return (
    <button
      type="button"
      className={`${cssClass} gap-4 items-center py-[15.9px] px-[18px] text-white bg-black flex justify-center text-sm font-medium not-italic leading-[normal] tracking-[normal] md:text-sm`}
      aria-label={'Book an appointment'}
      onClick={handleOnClick}
    >
      {btnLabel}
      <div>
        <CalenderIconYellow />
      </div>
    </button>
  );
};

export default BookAnApptButton;
