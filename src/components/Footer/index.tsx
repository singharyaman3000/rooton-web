'use client';

import FacebookIcon from '@/components/Icons/FaceBookIcon';
import LinkedInIcon from '@/components/Icons/LinkedInIcon';
import TwitterIcon from '@/components/Icons/TwitterIcon';
import YoutubeIcon from '@/components/Icons/YouTubeIcon';
import Link from 'next/link';
import FooterLogo from './FooterLogo';
import { useHeaderFooterContext } from '@/providers/headerFooterDataProvider';
import NextImage from '../UIElements/NextImage';
import { appendAssetUrl } from '@/utils';
import HtmlParser from 'react-html-parser';
import FooterGrid from './FooterGrid';

export default function Footer() {
  const { headerFooterData } = useHeaderFooterContext();

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
    lg:pt-[38px]
    lg:pb-[141px]
    lg:gap-[80px]
    xl:gap-[153px]
    relative
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
        <div className=" hidden w-[1px] h-[312px] bg-secondary-border lg:block ml-[128px] mr-20" />
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
      xl:pt-0
      xl:pb-0
      flex
      flex-col
      justify-center
      lg:justify-between
      lg:gap-[6px]
    "
      >
        {headerFooterData?.[0]?.attributes.addresses.data?.map((address) => {
          return (
            <div key={address.id}>
              <div className=" mb-[6px]">
                <div className="w-[32px] h-[16px] relative">
                  <NextImage
                    src={appendAssetUrl(address?.attributes?.media_url?.data?.attributes?.url)}
                    altText={address?.attributes?.media_url?.data?.attributes?.alternativeText}
                    title=""
                    sizes="100vw"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
              <p className=" text-sm mb-[4px] whitespace-pre font-bold">{address?.attributes.name}</p>
              <p className=" text-sm mb-[4px] whitespace-pre">{HtmlParser(address?.attributes?.location)}</p>
              <p className=" text-sm mb-[4px] font-bold mt-2">Phone {address?.attributes?.phone_number}</p>
            </div>
          );
        })}
      </div>
      <div className="absolute top-0 left-0 hidden w-full overflow-hidden xl:block">
        <FooterGrid />
      </div>
    </footer>
  );
}
