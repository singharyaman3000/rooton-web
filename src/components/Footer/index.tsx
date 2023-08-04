import { LAYOUT } from '@/app/constants/textConstants';
import FacebookIcon from '@/components/Icons/FaceBookIcon';
import FlagCanadaIcon from '@/components/Icons/FlagCanadaIcon';
import FlagIndiaIcon from '@/components/Icons/FlagIndiaIcon';
import LinkedInIcon from '@/components/Icons/LinkedInIcon';
import TwitterIcon from '@/components/Icons/TwitterIcon';
import YoutubeIcon from '@/components/Icons/YouTubeIcon';
import Link from 'next/link';
import FooterLogo from './FooterLogo';

export default function Footer() {
  return (
    <footer
      className="
    bg-primary
    pb-[40px]
    md:pb-[225px]
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
      xl:pl-0
      xl:py-0
      flex
      flex-col
      lg:flex-row
      lg:justify-around
      justify-center
    "
      >
        <div className=" lg:flex lg:flex-col justify-between">
          <FooterLogo />
          <div className=" flex flex-col gap-8 mb-7 xl:mb-0">
            <p className=" m-auto lg:m-0 text-sm">Follow us on</p>
            <div className=" flex gap-12 justify-center">
              <Link href={'/'}>
                <FacebookIcon />
              </Link>
              <Link href={'/'}>
                <TwitterIcon />
              </Link>
              <Link href={'/'}>
                <LinkedInIcon />
              </Link>
              <Link href={'/'}>
                <YoutubeIcon />
              </Link>
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
            <Link href={'/'}>Careers</Link>
            <Link href={'/'}>Privacy Policy</Link>
            <Link href={'/'}>Terms & Condition</Link>
            <Link href={'/'}>QnA Forum</Link>
          </div>
          <div className=" flex flex-col gap-3">
            <Link href={'/'}>Book a Meeting RCIC</Link>
            <Link href={'/'}>Disclaimer</Link>
            <Link href={'/'}>GCKey vs APR </Link>
            <Link href={'/'}>Affiliate Program</Link>
            <Link href={'/'}>Sitemap</Link>
          </div>
        </div>
      </div>
      <div
        className="
      py-5
      px-6
      xl:pb-0
      flex
      flex-col
      justify-center
      lg:justify-between
      lg:gap-[6px]
    "
      >
        <div>
          <div className=" mb-[6px]">
            <FlagIndiaIcon />
          </div>
          <p className=" text-sm mb-[4px] font-bold">{LAYOUT.addressCanada.title}</p>
          <p className=" text-sm mb-[4px]">{LAYOUT.addressCanada.line1}</p>
          <p className=" text-sm">{LAYOUT.addressCanada.line2}</p>
          <p className=" text-sm mb-[4px] font-bold mt-2">Phone {LAYOUT.addressCanada.phone}</p>
        </div>
        <div>
          <div className=" mt-8 mb-[6px]">
            <FlagCanadaIcon />
          </div>
          <p className=" text-sm font-bold mb-[4px]">{LAYOUT.addressIndia.title}</p>
          <p className=" text-sm mb-[4px]">{LAYOUT.addressIndia.line1}</p>
          <p className=" text-sm">{LAYOUT.addressIndia.line2}</p>
          <p className=" text-sm mb-[4px] font-bold mt-2">Phone {LAYOUT.addressIndia.phone}</p>
        </div>
      </div>
    </footer>
  );
}
