'use client';

import ServiceListingOnAdvice from '@/components/HomePage/ServiceListingOnAdvice';
import React, { useEffect, useRef, useState } from 'react';

const TalkToOurExpert = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (isOpen) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
          if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
            setIsOpen(false);
          }
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => {
          setIsOpen((isOpen) => !isOpen);
        }}
        className="hidden text-sm font-bold h-[52px] text-white lg:block bg-black lg:w-[157px] px-5 py-4"
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
