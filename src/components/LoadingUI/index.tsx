import React from 'react';
import RootOnLogoWhite from '../Icons/RootOnLogoWhite';

const LoadingUI = () => {
  return (
    <div className="z-[10000] flex items-center bg-[#121212] justify-center fixed square-[100%] top-0 left-0">
      <div className=" animate-pulse">
        <RootOnLogoWhite />
      </div>
    </div>
  );
};

export default LoadingUI;
