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
  return (
    <div className={cssClass}>
      <div className={`p-[21px] pb-0 ${openAccordion ? 'bg-primary-black text-primary-white ' : 'bg-transparent'}`}>
        <button
          type="button"
          className="w-full flex items-center justify-between pb-[21px]"
          onClick={() => handleOnClick(accordionId)}
        >
          <div className="text-base font-bold not-italic leading-[normal] tracking-[normal]">{header}</div>
          {customToggle ?? (
            <div className={`${openAccordion ? 'rotate-180' : 'rotate-0'}  transition-all delay-75`}>
              <DropDownCaret />
            </div>
          )}
        </button>
        {customSpacer ?? <div className="w-full h-[1px] bg-[#b17900] opacity-20"></div>}
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
            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
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
