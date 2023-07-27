import React from 'react';
import { IIcon } from './Interfaces/interface';

const ArrowIcon = ({ cssClas }: IIcon) => {
  return (
    <svg className={cssClas} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
      <path d="M1.78 15 0 13.22 10.663 2.555H1.179V0H15v13.821h-2.556V4.337z" fill-rule="nonzero" />
    </svg>
  );
};

export default ArrowIcon;
