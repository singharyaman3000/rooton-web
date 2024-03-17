import React from 'react';

export const ProfileIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      rotate={140}
    >
      <g transform="rotate(320 12 12)">
        {/* Arrow shaft */}
        <path
          d="M5 12H19"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Arrowhead */}
        <path
          d="M13 6l6 6-6 6"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export const ProfileOrangeIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      rotate={140}
    >
      <g transform="rotate(320 12 12)">
        {/* Arrow shaft */}
        <path
          d="M5 12H19"
          stroke="orange"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Arrowhead */}
        <path
          d="M13 6l6 6-6 6"
          stroke="orange"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};