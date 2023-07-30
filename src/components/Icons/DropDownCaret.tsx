import React from 'react';
import { IIcon } from './Interfaces/interface';

const DropDownCaret = ({ cssClas }: IIcon) => {
  return (
    <svg
      className={cssClas}
      xmlns="http://www.w3.org/2000/svg"
      width="13.775"
      height="8.194"
      viewBox="0 0 13.775 8.194"
    >
      <path
        d="m12.581 0 1.194 1.194-7 7L0 1.419 1.267.153l5.548 5.55L12.52 0h.062z"
        fill="#FFAF00"
        fillRule="nonzero"
      />
    </svg>
  );
};

export default DropDownCaret;
