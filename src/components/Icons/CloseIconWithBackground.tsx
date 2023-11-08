'use client';

import { IIcon } from './Interfaces/interface';

interface CloseIconWithBackgroundProps extends IIcon {
  onClick?: () => void;
}

const CloseIconWithBackground = ({ cssClas, onClick }: CloseIconWithBackgroundProps) => {
  return (
    <svg onClick={onClick} className={cssClas} width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 0v32h32V0H0zm21 19.59L19.59 21 16 17.41 12.41 21 11 19.59 14.59 16 11 12.41 12.41 11 16 14.59 19.59 11 21 12.41 17.41 16 21 19.59z"
        fill="#000"
        fill-rule="nonzero"
      />
    </svg>
  );
};

export default CloseIconWithBackground;
