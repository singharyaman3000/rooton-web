import { ReactElement } from 'react';

type RTONButtonBlackThemedProps = {
  onClick: () => void;
  text: string;
  icon: ReactElement;
  ariaLabel: string;
  className?: string;
};

export default function RTONButtonBlackThemed({
  className,
  ariaLabel,
  onClick,
  text,
  icon,
}: RTONButtonBlackThemedProps) {
  return (
    <button
      aria-label={ariaLabel}
      type="button"
      onClick={onClick}
      className={`
          ${className}
          py-4
          text-primary
          px-2
          flex
          items-center
          justify-center
          gap-[16px]
          bg-toggle-dark-bg
          font-semibold
      `}
    >
      <p className=" font-bold text-[14px]">{text}</p>
      {icon}
    </button>
  );
}
