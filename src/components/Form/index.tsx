'use client';

import FormBody from './FormBody';

const Form = () => {
  return (
    <div className="block p-5 m-auto max-w-screen-2k ">
      <div className=" p-4 lg:px-[60px] w-full pt-12 pb-[100px] sm:pb-[100px] lg:pb-[118px] sm:p-12 shadow-hubspot-form-shadow border border-golden-yellow overflow-hidden bg-pale-sandal ">
        <h5 className=" font-extrabold text-[28px] leading-heading lg:text-2xl xl:text-5xl lg:leading-heading-lg xl:leading-heading-lg text-center ">
          Tell us more about yourself
        </h5>
        <FormBody />
      </div>
    </div>
  );
};

export default Form;
