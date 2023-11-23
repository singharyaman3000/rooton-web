'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Fragment, useContext } from 'react';

import CloseIcon from '@/components/Icons/CloseIcon';
import RTONLanguageDropDown from './LanguageDropDown';
import { Dialog, Transition } from '@headlessui/react';
import { ModalShowContextname } from '@/providers/coreServicesMOdalOpenContext';

interface SliderOverlayProps {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (open: boolean) => void;
}

export default function SliderOverlay({ open, setOpen }: SliderOverlayProps) {
  const { openCoreServiceList } = useContext(ModalShowContextname);
  const params = useParams();

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[1000]" onClose={() => { }}>
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
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        <CloseIcon />
                      </button>
                    </div>
                    <div className="relative flex-1 px-[28px] py-[40px] sm:px-6">
                      <Link href={params.lang ? `/${params.lang}/` : '/'}>
                        <div
                          onClick={() => {
                            setOpen(false);
                          }}
                          role="button"
                          tabIndex={0}
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
                          Home
                        </div>
                      </Link>
                      <Link href={params.lang ? `/${params.lang}/about-us` : '/about-us'}>
                        <div
                          onClick={() => {
                            setOpen(false);
                          }}
                          role="button"
                          tabIndex={0}
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
                      </Link>
                      <Link href={{
                        pathname: params.lang ? `/${params.lang}` : '/',
                        query: { 'section': 'services' },
                      }}>
                        <div
                          onClick={() => {
                            setOpen(false);
                          }}
                          role="button"
                          tabIndex={0}
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
                      </Link>
                      <Link href={params.lang ? `/${params.lang}/coaching` : '/coaching'}>
                        <div
                          onClick={() => {
                            setOpen(false);
                          }}
                          role="button"
                          tabIndex={0}
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
                      </Link>
                      <Link href={params.lang ? `/${params.lang}/blogs` : '/blogs'}>
                        <div
                          onClick={() => {
                            setOpen(false);
                          }}
                          role="button"
                          tabIndex={0}
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
                          Blogs
                        </div>
                      </Link>
                      <Link href={params.lang ? `/${params.lang}/contact-us` : '/contact-us'}>
                        <div
                          onClick={() => {
                            setOpen(false);
                          }}
                          role="button"
                          tabIndex={0}
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
                      </Link>
                      {/* <Link href={params.lang ? `/${params.lang}/` : '/'}>
                        <div
                          onClick={() => {
                            setOpen(false);
                          }}
                          role="button"
                          tabIndex={0}
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
                      </Link> */}
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
                          setOpen(false);
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
