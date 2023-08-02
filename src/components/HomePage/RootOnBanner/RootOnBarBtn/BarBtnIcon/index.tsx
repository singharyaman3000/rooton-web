import React from 'react';

const BarBtnIcon = () => {
  return (
    <svg
      className="top-[-13px] right-[-13px] absolute transition-all"
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
    >
      <defs>
        <linearGradient x1="24.116%" y1="28.459%" x2="82.878%" y2="85.633%" id="xy6bnl2g1a">
          <stop stopColor="#FFDA00" offset="0%" />
          <stop stopColor="#E3A430" offset="100%" />
        </linearGradient>
      </defs>
      <path
        d="M432 0v1.666h-28.333L403.666 30H402V0h30z"
        transform="matrix(-1 0 0 1 432 0)"
        fill="url(#xy6bnl2g1a)"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default BarBtnIcon;
