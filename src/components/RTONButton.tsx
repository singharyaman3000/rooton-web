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
      className=" pt-[17.8px] pl-[22.5px] pr-[19px] pb-[19.2px] flex gap-[21.5px] bg-white"
    >
      <p className=" font-bold text-primary-font-color text-[13px]">{ text }</p>
      { icon }
    </button>
  );
}
