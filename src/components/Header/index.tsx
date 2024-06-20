/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';

import { scrollIntoView } from '@/utils';
import SliderOverlay from './SliderOverlay';
import { HOMEPAGE_PATH } from '@/constants/navigation';
import NewsAlertRibbon from '../UIElements/NewsAlertRibbon';
import WhatsAppButton from '@/components/WhatsApp-Integration';
import { getHeaderFooterData, IWhatsApp, IWhatsAppAttributes } from '../../app/services/apiService/headerFooterAPI';
import { COACHING_SERVICES_ROUTES, TOOLS_SERVICES_ROUTES } from '../SiteMapPage/constants';
import style from './UserAvatar.module.css';
import ProfilePopup from './ProfilePopup';
import { useHeaderData } from '@/hooks/HeaderDataProvider';
import ProfileSliderOverlay from '../ProfilePage';

const headerLangException = ['ml', 'bho'];
const itemsToSetActive = ['service', 'contact-us', 'about-us', 'immigration-insights', 'coaching', 'home', 'tools'];

function useOutsideClick(ref: any, callback: any) {
  useEffect(() => {
    function handleClickOutside(event: { target: any }) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}

export default function Header() {
  const [scrolledEnough, setscrolledEnough] = useState(false);
  const params = useParams();
  const path = usePathname();
  const headerRef = useRef<HTMLHeadElement>(null);
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<string>('');
  const [shouldRenderWhatsAppButton, setshouldRenderWhatsAppButton] = useState<IWhatsAppAttributes | undefined>(
    undefined,
  );
  const [whatsAppData, setwhatsAppData] = useState<IWhatsApp>({});
  const [showPopup, setShowPopup] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => {
    return setShowPopup(false);
  });

  const { initials, logo_name, email, isProfileOverlay, updateProfileOverlayState } = useHeaderData();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const [displayAlertRibbon, setDisplayAlertRibbon] = useState(false);
  useEffect(() => {
    if (HOMEPAGE_PATH.includes(path.replace(params.lang, ''))) {
      setDisplayAlertRibbon(true);
    } else {
      setDisplayAlertRibbon(false);
    }
  }, [params.lang, path]);

  useEffect(() => {
    const fetchData = async () => {
      const apiRes = await getHeaderFooterData();
      setwhatsAppData(apiRes[0]?.attributes?.whats_app);
      const whatsAppData1 = apiRes[0]?.attributes?.whats_app;
      setshouldRenderWhatsAppButton(whatsAppData1?.data?.attributes);
    };
    fetchData();
  }, []);
  const isFixed =
    !!params?.blogId ||
    path.includes('sitemap') ||
    path.includes('login') ||
    path.includes('signup') ||
    path.includes('verification-email') ||
    path.includes('googleauth') ||
    path.includes('forgot-password') ||
    path.includes('reset-password') ||
    path.includes('checkout');

  const scrollToServiceListing = () => {
    if (path === '/' || (path.split('/').length < 3 && params.lang)) {
      scrollIntoView('servicesHomePage');
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
      window.location.href = params.lang ? `/${params.lang}/` : '/';
    }
  };

  const setActiveTabFromUrl = () => {
    const pathArray = path.substring(1).split('/');

    let currentTab = 'service';
    if (HOMEPAGE_PATH.includes(path.replace(params.lang, ''))) {
      currentTab = 'home';
    } else if (
      pathArray.includes('sitemap') ||
      path.includes('login') ||
      path.includes('signup') ||
      path.includes('verification-email') ||
      path.includes('googleauth') ||
      path.includes('forgot-password') ||
      path.includes('reset-password') ||
      path.includes('profile') ||
      pathArray.includes('privacy-policy') ||
      pathArray.includes('disclaimer') ||
      pathArray.includes('terms-and-conditions')
    ) {
      currentTab = '';
    } else if (
      COACHING_SERVICES_ROUTES.find((obj) => {
        return obj.link === path?.replace(params.lang, '')?.replaceAll('/', '');
      })
    ) {
      currentTab = 'coaching';
    } else if (
      TOOLS_SERVICES_ROUTES.find((obj) => {
        return obj.link === path?.replace(params.lang, '')?.replaceAll('/', '');
      })
    ) {
      currentTab = 'tools';
    } else {
      const foundItem = pathArray.find((item) => {
        return itemsToSetActive.includes(item);
      });
      if (foundItem) {
        currentTab = foundItem;
      }
    }

    setActiveTab(currentTab);
  };

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

  function animateHeader() {
    const easeDown = [{ top: '-5rem' }, { top: '0' }];

    const easeDownTiming = {
      duration: 300,
      iterations: 1,
    };

    headerRef.current!.animate(easeDown, easeDownTiming);
  }

  const toggleSlideOverlay = () => {
    setOpen((o) => {
      return !o;
    });
  };

  const getHeaderTextColor = () => {
    if (isFixed) return 'text-header-font-color';
    return scrolledEnough ? 'text-header-font-color' : 'text-white';
  };

  const getIconStyle = () => {
    if (isFixed) {
      const logo = theme === 'dark' ? '/root-on-logo-svg.svg' : '/root-on-logo-black.svg';
      return logo;
    }
    return '/root-on-logo-svg.svg';
  };

  const isLangException = headerLangException.includes(params.lang);

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
          lg:gap-[16px]
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
            <div className="h-fit xl:flex-shrink-0">
              <Link href={params.lang ? `/${params.lang}/` : '/'}>
                <Image
                  className=" lg:w-[173px] lg:h-[52px]"
                  width={120}
                  height={36}
                  alt="Root On logo"
                  src={theme === 'light' ? '/root-on-logo-black.svg' : '/root-on-logo-svg.svg'}
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </Link>
            </div>
          ) : (
            <div className={`${params.lang ? 'xl:flex-shrink-0' : 'flex-shrink-0'}`}>
              <Link href={params.lang ? `/${params.lang}/` : '/'}>
                <Image
                  className=" lg:w-[173px] lg:h-[52px]"
                  width={120}
                  height={36}
                  alt="Root On logo"
                  src={getIconStyle()}
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </Link>
            </div>
          )}
          <div
            className={`
            w-[calc(100%-593px)]
            justify-around
            grow
            items-center
            text-base
            font-medium
            hidden
            xl:flex
            flex-shrink-0
            ${getHeaderTextColor()}
          `}
          >
            <span
              className={`h-[100%] flex items-center relative ${activeTab === 'home' ? 'font-extrabold' : 'font-bold'}`}
            >
              <Link
                href={params.lang ? `/${params.lang}/` : '/'}
                title="Home"
                className={`truncate lg:max-w-[90px] xl:max-w-[100px] hd:max-w-[200px] 2k:!max-w-none ${
                  isLangException ? 'hd:!max-w-[130px]' : ''
                }`}
              >
                {' '}
                Home{' '}
              </Link>
              {activeTab === 'home' && (
                <span className="w-[100%] h-[2px] border-b-[4px] border-b-[#e3a430] absolute bottom-[-29px]" />
              )}
            </span>
            <span
              className={`h-[100%] flex items-center relative
              ${activeTab === 'about-us' ? 'font-extrabold' : 'font-bold'}`}
            >
              <Link
                href={params.lang ? `/${params.lang}/about-us` : '/about-us'}
                title="About Us"
                className={`truncate lg:max-w-[90px] xl:max-w-[100px] hd:max-w-[200px] 2k:!max-w-none ${
                  isLangException ? 'hd:!max-w-[130px]' : ''
                }`}
              >
                {' '}
                About Us
              </Link>
              {activeTab === 'about-us' && (
                <span className="w-[100%] h-[2px] border-b-[4px] border-b-[#e3a430] absolute bottom-[-29px]" />
              )}
            </span>
            <span
              className={`cursor-pointer h-[100%] flex items-center relative
              ${activeTab === 'service' ? 'font-extrabold' : 'font-bold'}`}
            >
              {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
              {path === '/' || (path.split('/').length < 3 && params.lang) ? (
                // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                <span
                  title="Services"
                  className={`truncate lg:max-w-[90px] xl:max-w-[100px] hd:max-w-[200px] 2k:!max-w-none ${
                    isLangException ? 'hd:!max-w-[130px]' : ''
                  }`}
                  onClick={scrollToServiceListing}
                >
                  Services
                </span>
              ) : (
                <Link
                  href={{
                    pathname: params.lang ? `/${params.lang}/` : '/',
                    query: { section: 'services' },
                  }}
                  className={`truncate lg:max-w-[90px] xl:max-w-[100px] hd:max-w-[200px] 2k:!max-w-none ${
                    isLangException ? 'hd:!max-w-[130px]' : ''
                  }`}
                  title="Services"
                >
                  Services
                </Link>
              )}
              {activeTab === 'service' && (
                <span className="w-[100%] h-[2px] border-b-[4px] border-b-[#e3a430] absolute bottom-[-29px]" />
              )}
            </span>
            <span
              className={`h-[100%] flex items-center relative ${
                activeTab === 'coaching' ? 'font-extrabold' : 'font-bold'
              }`}
            >
              <Link
                href={params.lang ? `/${params.lang}/coaching` : '/coaching'}
                title="Coaching"
                className={`truncate lg:max-w-[90px] xl:max-w-[100px] hd:max-w-[200px] 2k:!max-w-none ${
                  isLangException ? 'hd:!max-w-[130px]' : ''
                }`}
              >
                {' '}
                Coaching{' '}
              </Link>
              {activeTab === 'coaching' && (
                <span className="w-[100%] h-[2px] border-b-[4px] border-b-[#e3a430] absolute bottom-[-29px]" />
              )}
            </span>
            <span
              className={`h-[100%] flex items-center relative
               ${activeTab === 'immigration-insights' ? 'font-extrabold' : 'font-bold'}`}
            >
              <Link
                href={params.lang ? `/${params.lang}/immigration-insights` : '/immigration-insights'}
                title="Blogs"
                className={`truncate lg:max-w-[90px] xl:max-w-[100px] hd:max-w-[200px] 2k:!max-w-none ${
                  isLangException ? 'hd:!max-w-[130px]' : ''
                }`}
              >
                {' '}
                Blogs{' '}
              </Link>
              {activeTab === 'immigration-insights' && (
                <span className="w-[100%] h-[2px] border-b-[4px] border-b-[#e3a430] absolute bottom-[-29px]" />
              )}
            </span>
            <span
              className={`h-[100%] flex items-center relative
               ${activeTab === 'tools' ? 'font-extrabold' : 'font-bold'}`}
            >
              <Link
                href={params.lang ? `/${params.lang}/tools` : '/tools'}
                title="Tools"
                className={`truncate lg:max-w-[90px] xl:max-w-[100px] hd:max-w-[200px] 2k:!max-w-none ${
                  isLangException ? 'hd:!max-w-[130px]' : ''
                }`}
              >
                {' '}
                Tools{' '}
              </Link>
              {activeTab === 'tools' && (
                <span className="w-[100%] h-[2px] border-b-[4px] border-b-[#e3a430] absolute bottom-[-29px]" />
              )}
            </span>
            <span
              className={`h-[100%] flex items-center relative 
              ${activeTab === 'contact-us' ? 'font-extrabold' : 'font-bold'}`}
            >
              <Link
                href={params.lang ? `/${params.lang}/contact-us` : '/contact-us'}
                title="Contact Us"
                className={`truncate lg:max-w-[90px] xl:max-w-[100px] hd:max-w-[200px] 2k:!max-w-none ${
                  isLangException ? 'hd:!max-w-[130px]' : ''
                }`}
              >
                {' '}
                Contact Us{' '}
              </Link>
              {activeTab === 'contact-us' && (
                <span className="w-[100%] h-[2px] border-b-[4px] border-b-[#e3a430] absolute bottom-[-29px]" />
              )}
            </span>
            {isLoggedIn ? (
              <span className="h-[100%] flex items-center relative">
                <div className="relative">
                  <button
                    type="button"
                    className="flex items-center justify-center w-10 h-10
                    rounded-full bg-toggle-dark-bg text-primary-white cursor-pointer"
                    onClick={() => {
                      return setShowPopup(true);
                    }}
                  >
                    <div
                      className="flex items-center justify-center w-10 h-10
                    rounded-full bg-toggle-dark-bg text-primary-white cursor-pointer"
                    >
                      {initials || <span>?</span>}
                    </div>
                  </button>
                </div>
                {showPopup ? (
                  <div ref={wrapperRef}>
                    <ProfilePopup
                      logo_name={logo_name}
                      user_email={email}
                      onLogout={handleLogout}
                      onClose={() => {
                        return setShowPopup(false);
                      }}
                      isLoggedIn
                      initials={initials}
                      setOpen={setShowPopup}
                    />
                  </div>
                ) : null}
              </span>
            ) : (
              <span className="h-[100%] flex items-center relative">
                <div className="relative">
                  <button
                    type="button"
                    className={`${style.avatar_button} bg-toggle-dark-bg border-[1px] border-toggle-dark-bg`}
                    onClick={() => {
                      return setShowPopup(true);
                    }}
                  >
                    <div className={style.avatar}>
                      <div className={`${style.head} bg-primary-white`}>{''}</div>
                      <div className={`${style.body} bg-primary-white`}>{''}</div>
                    </div>
                  </button>
                </div>
                {showPopup && (
                  <div ref={wrapperRef}>
                    <ProfilePopup
                      logo_name={isLoggedIn ? logo_name : ''}
                      user_email={isLoggedIn ? email : ''}
                      onLogout={handleLogout}
                      onClose={() => {
                        return setShowPopup(false);
                      }}
                      isLoggedIn={false}
                      initials={isLoggedIn ? initials : ''}
                      setOpen={setShowPopup}
                    />
                  </div>
                )}
              </span>
            )}
          </div>
          {isLoggedIn ? (
            <span className="h-[100%] flex items-center relative xl:hidden">
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center justify-center w-10 h-10
                    rounded-full bg-toggle-dark-bg text-primary-white cursor-pointer"
                  onClick={toggleSlideOverlay}
                >
                  <div
                    className="flex items-center justify-center w-10 h-10
                    rounded-full bg-toggle-dark-bg text-primary-white cursor-pointer"
                  >
                    {initials || <span>?</span>}
                  </div>
                </button>
              </div>
            </span>
          ) : (
            <span className="h-[100%] flex items-center relative xl:hidden">
              <div className="relative">
                <button
                  type="button"
                  className={`${style.avatar_button} bg-toggle-dark-bg border-[1px] border-toggle-dark-bg`}
                  onClick={toggleSlideOverlay}
                >
                  <div className={style.avatar}>
                    <div className={`${style.head} bg-primary-white`}>{''}</div>
                    <div className={`${style.body} bg-primary-white`}>{''}</div>
                  </div>
                </button>
              </div>
            </span>
          )}
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
        {displayAlertRibbon ? <NewsAlertRibbon displayRibbonHandler={setDisplayAlertRibbon} /> : null}
        <div>
          {shouldRenderWhatsAppButton && !isProfileOverlay && (
            <WhatsAppButton whatsapp={whatsAppData!.data!.attributes} theme={theme || 'light'} />
          )}
        </div>
        <ProfileSliderOverlay open={isProfileOverlay} setOpen={updateProfileOverlayState} />
      </nav>
    </header>
  );
}
