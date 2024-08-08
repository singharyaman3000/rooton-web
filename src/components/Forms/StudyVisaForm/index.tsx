/* eslint-disable max-len */

'use client';

import { RefObject, useEffect, useState } from 'react';
import FormBody from './FormBody';

type StudyVisaFormParamsType = {
  title: string;
  leadFormRef: RefObject<HTMLDivElement>;
  formId: string;
  meetingLink: Record<string, string>;
  scrollToTop: () => void;
  isBookAppointment: boolean;
  initScroll?: () => void;
};

const StudyVisaForm = ({
  title,
  leadFormRef,
  formId,
  meetingLink,
  scrollToTop,
  isBookAppointment,
  initScroll,
}: StudyVisaFormParamsType) => {
  useEffect(() => {
    if (isBookAppointment) {
      if (initScroll) initScroll();
    }
  }, [isBookAppointment, initScroll]);

  const [formStepperProgress, setFormStepperProgress] = useState(10);

  return (
    <>
      <div className="h-1 bg-golden-yellow" style={{ width: `${formStepperProgress}%` }} />
      <div ref={leadFormRef} className="block m-auto max-w-screen-2k">
        <div className=" p-4 lg:px-[60px] w-full pt-12 pb-[100px] sm:pb-[100px] lg:pb-[118px] sm:p-12 shadow-hubspot-form-shadow border border-golden-yellow overflow-hidden bg-pale-sandal ">
          <span className="block font-extrabold text-[28px] leading-heading lg:text-2xl xl:text-5xl lg:leading-heading-lg xl:leading-heading-lg text-left mb-[3rem] ">
            {title}
          </span>
          <FormBody
            formId={formId}
            meetingLink={meetingLink}
            scrollToTop={scrollToTop}
            onProgress={(progress) => {
              setFormStepperProgress(progress);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default StudyVisaForm;
