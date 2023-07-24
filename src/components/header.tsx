'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ThemeToggleAndHamburger from './theme-toggle-and-hamburger';

export default function Header() {
  const [scrolledEnough, setscrolledEnough] = useState(false);

  useEffect(() => {
    let lastKnownScrollPosition = 0;
    let ticking = false;

    function showOrHideHeader(scrollPos: number) {
      if (scrollPos > 80) {
        setscrolledEnough(true);
      } else {
        setscrolledEnough(false);
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

    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header className={`${scrolledEnough ? ' fixed w-full text-black bg-white' : ' relative text-white'}`}>
      <nav>
        <div
          className="
          flex
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
                src={'/r-oot-on-logo-black.svg'}
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
            className="
            gap-[62px]
            justify-end
            items-center
            text-base
            font-bold
            hidden
            lg:flex
          "
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
          <ThemeToggleAndHamburger scrolledEnough={scrolledEnough} />
        </div>
        <div
          className="
            border-b
            border-[#d8d8d8]
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
