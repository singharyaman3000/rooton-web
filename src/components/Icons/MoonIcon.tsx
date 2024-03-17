import React from 'react';

export const HalfMoonIcon: React.FC<React.SVGProps<SVGSVGElement>> = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className="feather feather-moon"
      style={{
        position: 'relative',
        right: '-3px',
        top: '-3px',
        width: '26px',
        height: '31px',
        transform: 'rotate(130deg)',
      }}
    >
      <path
        d="M 12 2
           A 10 10 0 0 1 12 22
           A 10 13 0 0 0 12 2"
        fill="orange" />
    </svg>
  );
};
