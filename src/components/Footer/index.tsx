'use client';

import Link from 'next/link';
import FooterLogo from './FooterLogo';
import { useHeaderFooterContext } from '@/providers/headerFooterDataProvider';
import NextImage from '../UIElements/NextImage';
import { appendAssetUrl } from '@/utils';
import HtmlParser from 'react-html-parser';
import FooterGrid from './FooterGrid';
import SocialMediaLinks from '../ContactUsPage/SocialMediaLinks';

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
    lg:pt-[49px]
    lg:pb-[94px]
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
      lg:flex-shrink-0
    "
      >
        <div className=" lg:flex lg:flex-col mt-[10px] justify-between">
          <FooterLogo />
          <div className=" flex flex-col gap-8 mb-7 lg:mb-0">
            <p className=" m-auto lg:m-0 text-sm">Follow us on</p>
            <div className=" flex gap-12 justify-center">
              <SocialMediaLinks
                socialData={
                  headerFooterData?.length ? headerFooterData[0]?.attributes?.json_content?.socialMediaIcons : []
                }
              />
            </div>
          </div>
        </div>
        <div className=" hidden w-[1px] h-full bg-secondary-border lg:block ml-[128px] mr-20" />
        <div
          className="
            mt-[10px]
            flex
            lg:flex-col
            xs:gap-3
            sm:gap-10
            lg:gap-[18px]
            flex-wrap
            justify-between
            text-sm
            font-semibold
            lg:w-full
          "
        >
          <div className=" flex flex-col gap-3 lg:gap-[18px]">
            <Link href={'/'}>Careers</Link>
            <Link href={'/'}>Privacy Policy</Link>
            <Link href={'/'}>Terms & Condition</Link>
            <Link href={'/'}>QnA Forum</Link>
          </div>
          <div className=" flex flex-col gap-3 lg:gap-[18px]">
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
        mt-[10px]
        py-5
        px-6
        xl:pt-0
        xl:pb-0
        flex
        flex-col
        justify-center
        lg:justify-between
        lg:gap-0
    "
      >
        {headerFooterData?.[0]?.attributes.addresses.data?.map((address) => {
          return (
            <div key={address.id} className="odd:mb-[31px]">
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
              <p className=" text-sm mb-[4px] whitespace-pre-line  whitespace-font-pre-line">
                {HtmlParser(address?.attributes?.location)}
              </p>
              <p className=" text-sm mb-[4px] lg:mb-0 font-bold mt-2">Phone {address?.attributes?.phone_number}</p>
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
