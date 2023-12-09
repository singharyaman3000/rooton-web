import React from 'react';

type PropsType = {
  buttonText: string;
  type: 'button' | 'submit';
  onClickHandler?: () => void;
  disable?: boolean;
};

export const FormButton: React.FC<PropsType> = ({ buttonText, onClickHandler, disable, type }) => {

  return (
    <button
      type={type === 'button' ? 'button' : 'submit'}
      className="bg-black text-white px-4 py-3.5 min-w-[100px] text-sm font-bold"
      onClick={onClickHandler}
      disabled={disable}
    >
      {buttonText}
    </button>
  );
};
