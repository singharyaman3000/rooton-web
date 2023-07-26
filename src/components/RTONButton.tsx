import { ReactElement } from 'react';

type RTONButtonProps = {
  onClick: () => void;
  text: string;
  icon: ReactElement
}

export default function RTONButton({ onClick, text, icon }: RTONButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className=" pt-[17.8px] text-black pl-[22.5px] pr-[19px] pb-[19.2px] flex gap-[21.5px] bg-white lg:text-lg"
    >
      <p className=" font-bold text-[13px] lg:text-lg">{ text }</p>
      { icon }
    </button>
  );
}
