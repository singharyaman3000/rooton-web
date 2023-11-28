import React from 'react';

type PropsType = {
  displayCondition: boolean;
  buttonText: string;
  onClickHandler: () => void;
  disabled?: boolean;
};

export const FormButton: React.FC<PropsType> = ({ displayCondition, buttonText, onClickHandler, disabled }) => {
  return (
    <button
      type="button"
      style={{ display: displayCondition ? 'block' : 'none' }}
      className="bg-black text-white px-4 py-3.5 min-w-[100px] text-sm font-bold"
      onClick={onClickHandler}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
};
