import FacebookIcon from '@/icons/facebook.icon';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import TwitterIcon from '@/icons/twitter.icon';
import LinkedInIcon from '@/icons/linkedin.icon';
import YoutubeIcon from '@/icons/youtube.icon';
import ThemeToggleAndHamburger from '@/components/theme-toggle-and-hamburger';

const inter = Inter({ subsets: [ 'latin' ] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <nav>
            <div
              className="
                flex
                justify-between
                px-6
                py-3
                relative
                lg:px-20
                lg:pt-3
                lg:pb-4
              "
            >
              <div>
                <Image width={173} height={53} alt="Root On logo" src={'/r-oot-on-logo-svg.svg'} />
              </div>
              <div
                className="
                  gap-[62px]
                  justify-end
                  items-center
                  text-white
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
              <ThemeToggleAndHamburger />
            </div>
            <div
              className="
                  border-b
                  border-[#d8d8d8]
                  h-0
                  mx-6
                  opacity-50
                  lg:mx-20
                "
            />
          </nav>
        </header>
        {children}
        <footer
          className="
            mb-[76px]
            lg:flex
            lg:border-t
            lg:border-b
            border-[#d2d2d2]
            lg:px-[120px]
            lg:pt-[60px]
            lg:pb-[150px]
            lg:gap-[153px]
          "
        >
          <div
            className="
              border-t
              border-b
              lg:border-0
              border-[#d2d2d2]
              py-5
              px-6
              flex
              flex-col
              lg:flex-row
              lg:justify-around
              justify-center
            "
          >
            <div className=" lg:flex lg:flex-col justify-between">
              <Image width={180} height={54} alt="logo" src={'/r-oot-on-logo-black.svg'} className=" mb-6 mx-auto" />
              <div className=" flex flex-col gap-8 mb-7">
                <p className=" m-auto text-sm">Follow us on</p>
                <div className=" flex gap-12 justify-center">
                  <span>
                    <FacebookIcon />
                  </span>
                  <span>
                    <TwitterIcon />
                  </span>
                  <span>
                    <LinkedInIcon />
                  </span>
                  <span>
                    <YoutubeIcon />
                  </span>
                </div>
              </div>
            </div>
            <div className=' hidden w-[1px] h-[312px] bg-[#d8d8d8] lg:block ml-[128px] mr-20' />
            <div
              className="
                flex
                lg:flex-col
                gap-10
                lg:gap-4
                flex-wrap
                justify-between
                text-sm
                font-semibold lg:w-[145px]
              "
            >
              <div className=" flex flex-col gap-3">
                <p>Careers</p>
                <p>Privacy Policy</p>
                <p>Terms & Condition</p>
                <p>FAQs</p>
                <p>QnA Forum</p>
              </div>
              <div className=" flex flex-col gap-3">
                <p>Book a Meeting RCIC</p>
                <p>Disclaimer</p>
                <p>GCKey vs APR </p>
                <p>Affiliate Program</p>
                <p>Sitemap</p>
              </div>
            </div>
          </div>
          <div
            className="
              border-b
              border-[#d2d2d2]
              lg:border-0
              py-5
              px-6
              flex
              flex-col
              justify-center
            "
          >
            <div className=" mb-[6px]">flag</div>
            <p className=" text-sm mb-[4px] font-bold">Canada Headquarters</p>
            <p className=" text-sm mb-[4px]">706-1800, Blvd, Rene-Levesque Ouest,</p>
            <p className=" text-sm">Montreal Quebec, H3H 2H2.</p>
            <div className=" mt-8">flag</div>
            <p className=" text-sm font-bold mb-[4px]">Indian Headquarters</p>
            <p className=" text-sm mb-[4px]">
              202-203, Velocity Business Hub, LP Savani Rd, nr. Madhuvan Circle, TGB, Adajan,
            </p>
            <p className=" text-sm">Surat, Gujarat 395009</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
