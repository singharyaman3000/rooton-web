import { ReactElement } from 'react';

type RTONButtonBlackProps = {
  onClick: () => void;
  text: string;
  icon: ReactElement;
  ariaLabel: string;
  className?: string;
};

export default function RTONButtonBlack({ className, ariaLabel, onClick, text, icon }: RTONButtonBlackProps) {
  return (
    <button
      aria-label={ariaLabel}
      type="button"
      onClick={onClick}
      className={`
          ${className}
          py-4
          text-white
          px-6
          flex
          items-center
          justify-center
          gap-[15px]
          bg-black
          font-semibold
      `}
    >
      <p className=" font-semibold text-[14px]">{text}</p>
      {icon}
    </button>
  );
}
