import React from 'react';

type PropsType = {
  onclick: () => void;
};

export const FormCloseButton = (props: PropsType) => {
  const { onclick } = props;
  return (
    <button type="button" className="absolute top-0 right-0 bg-[black] px-4 py-2 text-white" onClick={onclick}>
      X
    </button>
  );
};
