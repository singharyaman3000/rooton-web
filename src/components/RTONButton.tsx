import { ReactElement } from 'react';

type RTONButtonProps = {
  onClick: () => void;
  text: string;
  icon: ReactElement;
  ariaLabel: string;
};

export default function RTONButton({ ariaLabel, onClick, text, icon }: RTONButtonProps) {
  return (
    <button
      data-tooltip
      aria-label={ariaLabel}
      type="button"
      onClick={onClick}
      id={text}
      className="
          relative
          pt-[17.8px]
          text-black
          pl-[22.5px]
          pr-[19px]
          pb-[19.2px]
          flex
          items-center
          gap-[21.5px]
          bg-white
          lg:text-lg
          w-full
          justify-center
          md:w-fit
          trackable-element
        "
    >
      <p className="trackable-element truncate font-bold text-[14px] lg:text-sm">{text}</p>
      {icon}
    </button>
  );
}
