'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import ThemeToggleAndHamburger from './ThemeToggle-Hamburger';
import SliderOverlay from './SliderOverlay';
import TalkToOurExpert from '../UIElements/TalkToOurExpert';
import { scrollIntoView } from '@/utils';
import { useParams } from 'next/navigation';
import WhatsAppButton from '@/components/WhatsApp-Integration';
import { getHeaderFooterData, IWhatsApp, IWhatsAppAttributes } from '../../app/services/apiService/headerFooterAPI';

const itemsToSetActive = ['service', 'contact-us', 'about-us', 'blogs', 'coaching', 'contact-us'];

export default function Header() {
  const [scrolledEnough, setscrolledEnough] = useState(false);
  const params = useParams();
  const headerRef = useRef<HTMLHeadElement>(null);
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const [activeTab,setActiveTab] = useState<string>('');
  const [shouldRenderWhatsAppButton, setshouldRenderWhatsAppButton]
   = useState<IWhatsAppAttributes | undefined>(undefined);
  const [whatsAppData, setwhatsAppData] = useState<IWhatsApp>({});
  useEffect(() => {
    const fetchData = async () => {
      const apiRes = await getHeaderFooterData();
      setwhatsAppData(apiRes[0]?.attributes?.whats_app);
      const whatsAppData1 = apiRes[0]?.attributes?.whats_app;
      setshouldRenderWhatsAppButton(whatsAppData1?.data?.attributes);
    };
    fetchData();
  }, []);
  const isFixed = !!params?.blogId;

  useEffect(() => {
    let lastKnownScrollPosition = 0;
    let ticking = false;

    setActiveTabFromUrl();
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
  });

  function setActiveTabFromUrl() {
    const pathArray: string[] = window.location.pathname.split('/');

    const notHomePage = itemsToSetActive.some((elem) => {
      return pathArray?.includes(elem);
    });

    if (notHomePage) {
      itemsToSetActive?.forEach((item) => {
        if (pathArray?.includes(item)) {
          setActiveTab(item);
        }
      });
    } else {
      setActiveTab('');
    }
  }

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

  const getHeaderTextColor = () => {
    if (isFixed) return 'text-header-font-color';
    return scrolledEnough ? 'text-header-font-color' : ' text-white';
  };

  const getIconStyle = () => {
    if(isFixed){
      const logo = theme === 'dark' ? '/root-on-logo-svg.svg' : '/root-on-logo-black.svg';
      return logo;
    }
    return '/root-on-logo-svg.svg';
  };

  return (
    <header
      ref={headerRef}
      className={`z-[999] ${
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
          lg:gap-[1.33vw]
          xl:gap-[3.33vw]
          justify-between
          px-6
          py-3
          relative
          xl:px-20
          xl:pt-3
          xl:pb-4
          break-words
          items-center
        "
        >
          {scrolledEnough ? (
            <div className="h-fit">
              <Link href={params.lang ? `/${params.lang}/` : '/'}>
                <Image
                  className=" lg:w-[173px] lg:h-[52px]"
                  width={120}
                  height={36}
                  alt="Root On logo"
                  src={theme === 'light' ? '/root-on-logo-black.svg' : '/root-on-logo-svg.svg'}
                />
              </Link>
            </div>
          ) : (
            <div>
              <Link href={params.lang ? `/${params.lang}/` : '/'}>
                <Image
                  className=" lg:w-[173px] lg:h-[52px]"
                  width={120}
                  height={36}
                  alt="Root On logo"
                  src={getIconStyle()}
                />
              </Link>
            </div>
          )}
          <div
            className={`
            lg:gap-[1.33vw]
            xl:gap-[3.33vw]
            justify-end
            items-center
            text-base
            font-medium
            hidden
            lg:flex
            flex-shrink-0
            ${getHeaderTextColor()}
          `}
          >
            <span
              className={`h-[100%] flex items-center relative ${
                activeTab === 'about-us' ? 'font-extrabold' : 'font-bold'
              }`}
            >
              <Link href={'/about-us'}> About Us</Link>
              {activeTab === 'about-us' && (
                <span className="w-[100%] h-[2px] border-b-[4px] border-b-[#e3a430] absolute bottom-[-29px]" />
              )}
            </span>
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <span
              onClick={() => {
                scrollIntoView('servicesHomePage');
              }}
              className={`cursor-pointer h-[100%] flex items-center relative ${
                activeTab === 'service' ? 'font-extrabold' : 'font-bold'
              }`}
            >
              Services
              {activeTab === 'service' && (
                <span className="w-[100%] h-[2px] border-b-[4px] border-b-[#e3a430] absolute bottom-[-29px]" />
              )}
            </span>
            <span
              className={`h-[100%] flex items-center relative ${
                activeTab === 'coaching' ? 'font-extrabold' : 'font-bold'
              }`}
            >
              <Link href={params.lang ? `/${params.lang}/coaching` : '/coaching'}> Coaching </Link>
              {activeTab === 'coaching' && (
                <span className="w-[100%] h-[2px] border-b-[4px] border-b-[#e3a430] absolute bottom-[-29px]" />
              )}
            </span>
            <span
              className={`h-[100%] flex items-center relative ${
                activeTab === 'blogs' ? 'font-extrabold' : 'font-bold'
              }`}
            >
              <Link href={'/blogs'}> Blogs </Link>
              {activeTab === 'blogs' && (
                <span className="w-[100%] h-[2px] border-b-[4px] border-b-[#e3a430] absolute bottom-[-29px]" />
              )}
            </span>
            <span
              className={`h-[100%] flex items-center relative ${
                activeTab === 'contact-us' ? 'font-extrabold' : 'font-bold'
              }`}
            >
              <Link href={'/contact-us'}> Contact Us </Link>
              {activeTab === 'contact-us' && (
                <span className="w-[100%] h-[2px] border-b-[4px] border-b-[#e3a430] absolute bottom-[-29px]" />
              )}
            </span>
            <span
              className={`h-[100%] flex items-center relative ${
                activeTab === 'tools' ? 'font-extrabold' : 'font-bold'
              }`}
            >
              <Link href={'/'}> Tools </Link>
              {activeTab === 'tools' && (
                <span className="w-[100%] h-[2px] border-b-[4px] border-b-[#e3a430] absolute bottom-[-29px]" />
              )}
            </span>
          </div>
          <ThemeToggleAndHamburger
            toggleSlideOverlay={toggleSlideOverlay}
            scrolledEnough={scrolledEnough}
            isFixed={isFixed}
          />
          {scrolledEnough && <TalkToOurExpert />}
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
        <div>
          {shouldRenderWhatsAppButton && (
            <WhatsAppButton whatsapp={ whatsAppData!.data!.attributes } theme={theme || 'light'} />
          )}</div>
      </nav>
    </header>
  );
}
