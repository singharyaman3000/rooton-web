import React from 'react';

export interface ISliderNav {
  cssClass?: string;
  leftNav?: boolean;
  disable?: boolean;
  handleOnClick: () => void;
}

const SliderNav = ({ cssClass, disable, leftNav, handleOnClick }: ISliderNav) => {
  return (
    <button
      type="button"
      disabled={disable}
      onClick={() => {return handleOnClick();}}
      aria-label={`${leftNav ? 'Previous' : 'Next'}`}
      className={`w-11 h-11 disabled:bg-white  px-[17px] slider-nav py-[13px] bg-white ${cssClass} ${
        leftNav ? 'rotate-180  right-[24px]   md:right-[-9px]' : 'left-[24px] md:left-[-9px]'
      } ${disable && 'cursor-not-allowed'}`}
    >
      <svg
        className={`${disable && 'opacity-[0.2] cursor-not-allowed'} fill-toggle-dark-bg`}
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="18"
        viewBox="0 0 10 18"
      >
        <path d="M1.257 18 10 9.008 1.257 0 0 1.293l7.485 7.715L0 16.707z" fillRule="nonzero" />
      </svg>
    </button>
  );
};

export default SliderNav;
