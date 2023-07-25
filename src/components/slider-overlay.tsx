'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import CloseIcon from '@/icons/close.icon';

type SliderOverlayProps = {
    open: boolean;
    // eslint-disable-next-line no-unused-vars
    setOpen: (open: boolean) => void
};

export default function SliderOverlay({ open, setOpen }: SliderOverlayProps) {

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
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
                  <div className="absolute z-10 right-0 top-0 flex p-[28px]">
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
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="relative flex-1 px-[28px] py-[40px] sm:px-6">{/* Your content */}</div>
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
