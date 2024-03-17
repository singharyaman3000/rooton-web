/* eslint-disable no-unused-vars */
/* eslint-disable max-len */

'use client';

import style from '../UserAvatar.module.css';
import RTONLanguageDropDown from '../LanguageDropDown';
import ThemeToggleAndHamburger from '../ThemeToggle-Hamburger';
import { useContext, useState } from 'react';
import { ModalShowContextname } from '@/providers/coreServicesMOdalOpenContext';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ProfilePage from '@/components/ProfilePage';
import { useHeaderData } from '@/hooks/HeaderDataProvider';

type popupProps = {
  logo_name: string;
  user_email: string;
  onLogout: () => void;
  onClose: () => void;
  isLoggedIn: boolean;
  initials: string;
  setOpen: (open: boolean) => void;
};

const ProfilePopup = ({ logo_name, user_email, onLogout, isLoggedIn, initials, setOpen }: popupProps) => {
  const params = useParams();
  const { openCoreServiceList } = useContext(ModalShowContextname);

  const { updateProfileOverlayState } = useHeaderData();

  return (
    <div className={style.popup_container}>
      <div className={`${style.popup_content} bg-primary-white`}>
        {isLoggedIn ? (
          <>
            <div className={style.header}>
              <span className={`${style.title} text-primary-font-color`}>Account</span>
              <div className={style.account_section}>
                <div className="flex items-center">
                  <div
                    className="relative top-[3px] left-[5px] flex items-center justify-center w-10 h-10
                  rounded-full bg-toggle-dark-bg text-primary-white cursor-pointer"
                  >
                    <div
                      className="flex items-center justify-center w-10 h-10
                  rounded-full bg-toggle-dark-bg text-primary-white cursor-pointer"
                    >
                      {initials}
                    </div>
                  </div>
                  <div className={style.user_details}>
                    <div className={`${style.name} text-primary-font-color`}>{logo_name}</div>
                    <div className={`${style.email} text-primary-font-color`}>{user_email || 'email@example.com'}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={style.options}>
              <div className={style.option}>
                <RTONLanguageDropDown scrolledEnough />
              </div>
              <div className={style.option}>
                <ThemeToggleAndHamburger />
              </div>
              <div className={style.option}>
                <button
                  type="button"
                  className="font-bold text-md flex justify-start text-primary-font-color"
                  style={{ width: '-webkit-fill-available' }}
                  onClick={() => {
                    openCoreServiceList();
                    setOpen(false);
                  }}
                >
                  Talk to our Expert
                </button>
              </div>
              <button
                type="button"
                className={style.option}
                style={{ width: '-webkit-fill-available', display: 'flex', justifyContent: 'start' }}
                onClick={() => {
                  updateProfileOverlayState(true);
                }}
              >
                <div
                  className="text-primary-font-color"
                  style={{ width: '-webkit-fill-available', display: 'flex', justifyContent: 'start' }}
                >
                  Profile
                </div>
              </button>
              <button
                type="button"
                className={[style.option, style.logout].join(' ')}
                style={{ width: '-webkit-fill-available', display: 'flex', justifyContent: 'start' }}
                onClick={onLogout}
              >
                Log Out
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={style.option}>
              <RTONLanguageDropDown scrolledEnough />
            </div>
            <div className={style.option}>
              <ThemeToggleAndHamburger />
            </div>
            <div className={style.option}>
              <button
                type="button"
                className="font-bold text-md flex justify-start text-primary-font-color"
                style={{ width: '-webkit-fill-available' }}
                onClick={() => {
                  openCoreServiceList();
                  setOpen(false);
                }}
              >
                Talk to our Expert
              </button>
            </div>
            <div className={style.option}>
              <Link
                className="text-primary-font-color"
                style={{ width: '-webkit-fill-available', display: 'flex', justifyContent: 'start' }}
                href={params.lang ? `/${params.lang}/login` : '/login'}
                onClick={() => {return setOpen(false);}}
              >
                Sign in
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePopup;
