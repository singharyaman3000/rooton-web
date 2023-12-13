'use client';

import { RefObject } from 'react';
import FormBody from './FormBody';

type PNPFormParamsType = {
  title: string,
  leadFormRef: RefObject<HTMLDivElement>;
  formId: string;
  meetingLink: Record<string, string>,
  scrollToTop: () => void
};

const PNPForm = ({ leadFormRef, formId, meetingLink, title, scrollToTop }: PNPFormParamsType) => {
  return (
    <div ref={leadFormRef} className="block m-auto max-w-screen-2k">
      <div className=" p-4 lg:px-[60px] w-full pt-12 pb-[100px] sm:pb-[100px] lg:pb-[118px] sm:p-12 shadow-hubspot-form-shadow border border-golden-yellow overflow-hidden bg-pale-sandal ">
        <span className="block font-extrabold text-[28px] leading-heading lg:text-2xl xl:text-5xl lg:leading-heading-lg xl:leading-heading-lg text-left mb-[3rem] ">
          {title}
        </span>
        <FormBody formId={formId} meetingLink={meetingLink} scrollToTop={scrollToTop} />
      </div>
    </div>
  );
};

export default PNPForm;
