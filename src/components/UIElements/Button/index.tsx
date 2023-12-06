import React, { ReactNode } from 'react';

export interface IButton {
  label: string;
  handleOnClick: () => void;
  tabIndex?: number;
  ariaLabel: string;
  icon?: ReactNode;
  cssClass?: string;
  toolTip?: boolean;
}

const Button = ({ ariaLabel, label, handleOnClick, tabIndex = 0, icon, cssClass, toolTip = false }: IButton) => {
  return toolTip ? (
    <button
      type="button"
      data-tooltip
      className={`${cssClass} relative p-[8px_12px] md:p-[10px_16px] border border-solid border-deep-yellow flex items-center text-xs font-medium not-italic leading-[normal] tracking-[normal] md:text-sm`}
      aria-label={label ?? ariaLabel}
      onClick={handleOnClick}
      tabIndex={tabIndex}
    >
      <p className="truncate">{label}</p>
      <div className="ml-[12px]">
        {icon ?? (
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
            <path d="M1.187 10 0 8.813l7.109-7.109H.786V0H10v9.214H8.296V2.891z" fill="#FFAF00" fillRule="nonzero" />
          </svg>
        )}
      </div>
    </button>
  ) : (
    <button
      type="button"
      className={`${cssClass} p-[8px_12px] md:p-[10px_16px] border border-solid border-deep-yellow flex items-center text-xs font-medium not-italic leading-[normal] tracking-[normal] md:text-sm`}
      aria-label={label ?? ariaLabel}
      onClick={handleOnClick}
      tabIndex={tabIndex}
    >
      {label}
      <div className="ml-[12px]">
        {icon ?? (
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
            <path d="M1.187 10 0 8.813l7.109-7.109H.786V0H10v9.214H8.296V2.891z" fill="#FFAF00" fillRule="nonzero" />
          </svg>
        )}
      </div>
    </button>
  );
};

export default Button;
