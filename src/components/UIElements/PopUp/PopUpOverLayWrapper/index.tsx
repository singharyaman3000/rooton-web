'use client';

import React, { useEffect, useRef } from 'react';

const PopUpOverlayWrapper = ({
  children,
  onClose,
  showPopUp,
}: {
  children: React.ReactNode;
  onClose: () => void;
  showPopUp: boolean;
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (showPopUp) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
          onClose();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef, showPopUp]);

  useEffect(() => {
    if (showPopUp) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showPopUp]);

  return (
    showPopUp && (
      <div className="fixed square-[100%] top-0 left-0 z-[1000]  flex  justify-center items-center">
        <div className="bg-[rgba(0,_0,_0,_0.5)] w-full h-full absolute"></div>
        <div ref={wrapperRef} className="z-10">
          {children}
        </div>
      </div>
    )
  );
};

export default PopUpOverlayWrapper;
