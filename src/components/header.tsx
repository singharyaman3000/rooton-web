'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import ThemeToggleAndHamburger from './theme-toggle-and-hamburger';
import SliderOverlay from './slider-overlay';

export default function Header() {
  const [scrolledEnough, setscrolledEnough] = useState(false);

  const headerRef = useRef<HTMLHeadElement>(null);
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    let lastKnownScrollPosition = 0;
    let ticking = false;

    function showOrHideHeader(scrollPos: number) {
      if (scrollPos > 80) {
        setscrolledEnough((scrolled) => {
          if (!scrolled) animateHeader();
          return true;
        });
      } else {
        setscrolledEnough((scrolled) => {
          if (scrolled) animateHeader();
          return false;
        });
      }
    }

    function onScroll() {
      lastKnownScrollPosition = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          showOrHideHeader(lastKnownScrollPosition);
          ticking = false;
        });

        ticking = true;
      }
    }

    document.addEventListener('scroll', onScroll);

    animateHeader();

    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, []);

  function animateHeader() {
    const easeDown = [{ top: '-5rem' }, { top: '0' }];

    const easeDownTiming = {
      duration: 300,
      iterations: 1,
    };

    headerRef.current!.animate(easeDown, easeDownTiming);
  }

  const toggleSlideOverlay = () => {
    setOpen((o) => !o);
  };

  return (
    <header
      ref={headerRef}
      className={`${
        scrolledEnough
          ? ' fixed shadow-lg top-0 w-full text-header-font-color-scrolled-enough bg-primary'
          : ' absolute top-0 w-full'
      }`}
    >
      <SliderOverlay open={open} setOpen={setOpen} />
      <nav>
        <div
          className="
          flex
          gap-5
          justify-between
          px-6
          py-3
          relative
          xl:px-20
          xl:pt-3
          xl:pb-4
        "
        >
          {scrolledEnough ? (
            <div>
              <Image
                className=" lg:w-[173px] lg:h-[52px]"
                width={120}
                height={36}
                alt="Root On logo"
                src={theme === 'light' ? '/root-on-logo-black.svg' : '/root-on-logo-svg.svg' }
              />
            </div>
          ) : (
            <div>
              <Image
                className=" lg:w-[173px] lg:h-[52px]"
                width={120}
                height={36}
                alt="Root On logo"
                src={'/r-oot-on-logo-svg.svg'}
              />
            </div>
          )}
          <div
            className={`
            xl:ml-[116px]
            lg:ml-[50px]
            xl:gap-[62px]
            lg:gap-12
            justify-end
            items-center
            text-base
            font-bold
            hidden
            lg:flex
            flex-shrink-0
            ${scrolledEnough ? 'text-header-font-color': ' text-white'}
          `}
          >
            <span>
              <Link href={'/'}> About Us </Link>
            </span>
            <span>
              <Link href={'/'}> Services </Link>
            </span>
            <span>
              <Link href={'/'}> Coaching </Link>
            </span>
            <span>
              <Link href={'/'}> Blogs </Link>
            </span>
            <span>
              <Link href={'/'}> Contact Us </Link>
            </span>
            <span>
              <Link href={'/'}> Tools </Link>
            </span>
          </div>
          <ThemeToggleAndHamburger toggleSlideOverlay={toggleSlideOverlay} scrolledEnough={scrolledEnough} />
        </div>
        <div
          className="
            border-b
            border-primary-border
            h-0
            mx-6
            opacity-50
            xl:mx-20
          "
        />
      </nav>
    </header>
  );
}
