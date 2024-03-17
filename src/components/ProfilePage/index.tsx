/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */

'use client';

import { Fragment } from 'react';
import CloseIcon from '@/components/Icons/CloseIcon';
import { Dialog, Transition } from '@headlessui/react';
import ProfilePageComponent from './ProfileSliderOverlay';

interface SliderOverlayProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ProfileSliderOverlay({ open, setOpen }: SliderOverlayProps) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[10000]" onClose={() => {}}>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute bg-[#000000ba] inset-0 overflow-hidden">
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
                <Dialog.Panel className="relative w-screen lg:max-w-[75vw] max-w-[100vw]">
                  <div className="flex h-full flex-col overflow-y-scroll bg-[#FFF6E7] shadow-xl">
                    <div className="flex justify-end px-7">
                      <button
                        aria-label="Slider dialog close"
                        type="button"
                        className="cursor-pointer flex relative top-[10px] z-[999]"
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        <CloseIcon />
                      </button>
                    </div>
                    <div className="mt-3">
                      <ProfilePageComponent />
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
