import React from 'react';

export const EyeOnIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <path
        d="M1 12S4 7 12 7s11 5 11 5-3 5-11 5-11-5-11-5z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
