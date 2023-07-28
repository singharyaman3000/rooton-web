import { LAYOUT } from '@/app/constants/textConstants';
import FacebookIcon from '@/icons/facebook.icon';
import FlagCanadaIcon from '@/icons/flag-canada.icon';
import FlagIndiaIcon from '@/icons/flag-india.icon';
import LinkedInIcon from '@/icons/linkedin.icon';
import TwitterIcon from '@/icons/twitter.icon';
import YoutubeIcon from '@/icons/youtube.icon';
import Link from 'next/link';
import FooterLogo from './footer-logo';

export default function Footer() {
  return (
    <footer
      className="
    bg-primary
    pb-[225px]
    lg:flex
    lg:border-t
    border-secondary-border
    xl:px-[120px]
    lg:pt-[60px]
    lg:pb-[141px]
    lg:gap-[80px]
    xl:gap-[153px]
  "
    >
      <div
        className="
      border-t
      border-b
      lg:border-0
      border-secondary-border
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
          <FooterLogo />
          <div className=" flex flex-col gap-8 mb-7">
            <p className=" m-auto lg:m-0 text-sm">Follow us on</p>
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
        <div className=" hidden w-[1px] h-[312px] bg-primary-border lg:block ml-[128px] mr-20" />
        <div
          className="
        flex
        lg:flex-col
        gap-10
        lg:gap-4
        flex-wrap
        justify-between
        text-sm
        font-semibold
        lg:w-[145px]
        lg:justify-start
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
      py-5
      px-6
      flex
      flex-col
      justify-center
      lg:justify-between
      lg:gap-[6px]
    "
      >
        <div>
          <div className=" mb-[6px]">
            <FlagCanadaIcon />
          </div>
          <Link href={'/'} className=" text-sm mb-[4px] font-bold">
            {LAYOUT.addressCanada.title}
          </Link>
          <Link href={'/'} className=" text-sm mb-[4px]">
            {LAYOUT.addressCanada.line1}
          </Link>
          <Link href={'/'} className=" text-sm">
            {LAYOUT.addressCanada.line2}
          </Link>
          <Link href={'/'} className=" text-sm mb-[4px] font-bold mt-2">
            Phone {LAYOUT.addressCanada.phone}
          </Link>
        </div>
        <div>
          <div className=" mt-8 mb-[6px]">
            <FlagIndiaIcon />
          </div>
          <Link href={'/'} className=" text-sm font-bold mb-[4px]">
            {LAYOUT.addressIndia.title}
          </Link>
          <Link href={'/'} className=" text-sm mb-[4px]">
            {LAYOUT.addressIndia.line1}
          </Link>
          <Link href={'/'} className=" text-sm">
            {LAYOUT.addressIndia.line2}
          </Link>
          <Link href={'/'} className=" text-sm mb-[4px] font-bold mt-2">
            Phone {LAYOUT.addressIndia.phone}
          </Link>
        </div>
      </div>
    </footer>
  );
}
