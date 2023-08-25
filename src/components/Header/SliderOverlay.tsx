'use client';

import { Fragment, useContext } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import CloseIcon from '@/components/Icons/CloseIcon';
import RTONLanguageDropDown from './LanguageDropDown';
// import { MobileModalShowContextname } from '@/providers/coreServicesModalMobileContext';
import { scrollIntoView } from '@/utils';
import { ModalShowContextname } from '@/providers/coreServicesMOdalOpenContext';

interface SliderOverlayProps {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (open: boolean) => void;
}

export default function SliderOverlay({ open, setOpen }: SliderOverlayProps) {
  const { openCoreServiceList } = useContext(ModalShowContextname);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[1000]" onClose={() => {}}>
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
                        aria-label="Slider dialog close"
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
                      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                      <div
                        onClick={() => {
                          scrollIntoView('servicesHomePage');
                          setOpen(false);
                        }}
                        className="
                          text-primary-font-color
                          pb-5
                          text-xl
                          font-bold
                          border-b
                          border-primary-border
                          mb-5
                          cursor-pointer
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
                      <button
                        type="button"
                        className="
                      text-primary-font-color
                      pb-5
                      text-xl
                      font-bold
                      border-b
                      border-primary-border
                      mb-5
                    "
                        onClick={() => {
                          openCoreServiceList();
                        }}
                      >
                        Talk to our Expert
                      </button>
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
