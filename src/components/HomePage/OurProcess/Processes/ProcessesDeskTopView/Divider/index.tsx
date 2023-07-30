import React from 'react';

const Divider = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 1" height="1" preserveAspectRatio="none" width="100%">
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopOpacity="0" stopColor="rgba(255, 243, 224, 0)" />
        <stop offset="11%" stopColor="#fddaa1" />
        <stop offset="91%" stopColor="#fddaa1" />
        <stop offset="100%" stopOpacity="0" stopColor="rgba(254, 244, 228, 0)" />
      </linearGradient>

      <rect x="0" y="0" width="100" height="1" fill="url(#gradient)" />
    </svg>
  );
};

export default Divider;
