'use client';

import DropDownCaret from '@/components/Icons/DropDownCaret';
import { AnimatePresence, motion } from 'framer-motion';
import React, { ReactNode } from 'react';

interface IAccordion {
  header: React.ReactNode;
  accordionBody: React.ReactNode;
  accordionBodyCss?: string;
  openAccordion: boolean;
  // eslint-disable-next-line no-unused-vars
  handleOnClick: (accordionId: string) => void;
  accordionId: string;
  cssClass?: string;
  customSpacer?: ReactNode;
  customToggle?: ReactNode;
}

const Accordion = ({
  header,
  accordionBody,
  cssClass,
  handleOnClick,
  accordionBodyCss,
  openAccordion,
  accordionId,
  customSpacer,
  customToggle,
}: IAccordion) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { key } = event;
    if (key === 'Enter' || key === ' ') {
      handleOnClick(accordionId);
    }
  };

  return (
    <div className={cssClass}>
      <div
        className={`p-[21px] accordion-header pb-0 ${
          openAccordion ? 'bg-primary-black text-primary-white  ' : 'bg-transparent'
        }`}
      >
        {/* eslint-disable jsx-a11y/no-static-element-interactions */}
        {/* eslint-disable  jsx-a11y/no-noninteractive-tabindex */}
        <div
          className="w-full flex items-center justify-between pb-[21px] header-btn"
          onClick={() => handleOnClick(accordionId)}
          tabIndex={0}
          onKeyDown={handleKeyPress}
        >
          <div className="w-full text-base font-bold not-italic leading-[normal] tracking-[normal]">{header}</div>
          {customToggle ?? (
            <div
              className={`${
                openAccordion ? 'rotate-180' : 'rotate-0'
              } line-clamp-2 flex-shrink-0 ml-[10px]  transition-all delay-75`}
            >
              <DropDownCaret />
            </div>
          )}
        </div>
        {!openAccordion && (customSpacer ?? <div className="w-full h-[1px] accordion-spacer  opacity-[0.27]"></div>)}
      </div>
      <AnimatePresence initial={false}>
        {openAccordion && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            // transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
            className={`p-[20px] overflow-hidden ${accordionBodyCss} `}
          >
            {accordionBody}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
