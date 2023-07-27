'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import CloseIcon from '@/icons/close.icon';
import RTONLanguageDropDown from './RTONLanguageDropDown';

type SliderOverlayProps = {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (open: boolean) => void;
};

export default function SliderOverlay({ open, setOpen }: SliderOverlayProps) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[1000]" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed inset-y-0 right-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className=" relative w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-primary  py-7 shadow-xl">
                    <div className="flex justify-end px-7">
                      <button
                        type="button"
                        className="
                            cursor-pointer
                        "
                        onClick={() => setOpen(false)}
                      >
                        <CloseIcon />
                      </button>
                    </div>
                    <div className="relative flex-1 px-[28px] py-[40px] sm:px-6">
                      <div
                        className="
                          text-primary-font-color
                          pb-5
                          text-xl
                          font-bold
                          border-b
                          border-primary-border
                          mb-5
                        "
                      >
                        About Us
                      </div>
                      <div
                        className="
                          text-primary-font-color
                          pb-5
                          text-xl
                          font-bold
                          border-b
                          border-primary-border
                          mb-5
                        "
                      >
                        Services
                      </div>
                      <div
                        className="
                          text-primary-font-color
                          pb-5
                          text-xl
                          font-bold
                          border-b
                          border-primary-border
                          mb-5
                        "
                      >
                        Coaching
                      </div>
                      <div
                        className="
                          text-primary-font-color
                          pb-5
                          text-xl
                          font-bold
                          border-b
                          border-primary-border
                          mb-5
                        "
                      >
                        Blogs
                      </div>
                      <div
                        className="
                          text-primary-font-color
                          pb-5
                          text-xl
                          font-bold
                          border-b
                          border-primary-border
                          mb-5
                        "
                      >
                        Contact Us
                      </div>
                      <div
                        className="
                          text-primary-font-color
                          pb-5
                          text-xl
                          font-bold
                          border-b
                          border-primary-border
                          mb-5
                        "
                      >
                        Tools
                      </div>
                      <div
                        className="
                          text-primary-font-color
                          pb-5
                          text-xl
                          font-bold
                          border-b
                          border-primary-border
                          mb-5
                        "
                      >
                        <RTONLanguageDropDown scrolledEnough />
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
