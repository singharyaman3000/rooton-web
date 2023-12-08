'use client';

import ServiceListingOnAdvice from '@/components/HomePage/CoreServiceListing/ServiceListingOnAdvice';
import React, { useEffect, useRef, useState } from 'react';

const TalkToOurExpert = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (isOpen) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
          if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
            setIsOpen(false);
          } else {
            setIsOpen(true);
          }
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef, buttonRef, isOpen]);

  return (
    <div className="relative hidden xl:block">
      <button
        type='button'
        ref={buttonRef}
        onClick={() => {
          setIsOpen((prevState) => !prevState);
        }}
        className="text-sm talk-to-expert-btn font-bold min-h-[52px] text-white bg-black lg:min-w-[157px] px-5 py-4"
      >
        Talk to our Expert
      </button>

      {isOpen && (
        <div ref={wrapperRef} className="absolute right-0 top-[61px]">
          <ServiceListingOnAdvice />
        </div>
      )}
    </div>
  );
};

export default TalkToOurExpert;
