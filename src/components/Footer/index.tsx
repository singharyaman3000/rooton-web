/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';

import FooterLogo from './FooterLogo';
import { useHeaderFooterContext } from '@/providers/headerFooterDataProvider';
import NextImage from '../UIElements/NextImage';
import { appendAssetUrl } from '@/utils';
import HtmlParser from 'react-html-parser';
import FooterGrid from './FooterGrid';
import SocialMediaLinks from '../ContactUsPage/SocialMediaLinks';
import { getDomainIndex } from '../ContactUsPage/MapSection';

export default function Footer() {
  const params = useParams();
  const pathname = usePathname();
  const { headerFooterData } = useHeaderFooterContext();
  const currentYear = new Date().getFullYear();
  const router = useRouter();

  function getCompanyName() {
    return getDomainIndex() === 0
      ? 'Root On Immigration Consultants, Inc. or its affiliates.'
      : 'Root On Immigration Consultants Private Limited';
  }

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
    relative
    md:justify-between
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
      z-10
    "
      >
        <div className=" lg:flex lg:flex-col mt-[10px] justify-between">
          <FooterLogo />
          <div className=" flex flex-col gap-8 mb-7 lg:mb-0">
            <div className=" m-auto lg:m-0">
              <p className=" text-center lg:text-left text-sm mb-2">
                Copyright © {currentYear} {getCompanyName()}
              </p>
              <p className=" text-center lg:text-left text-sm">All Rights Reserved.</p>
            </div>
            <p className=" m-auto lg:m-0 text-sm">Follow us on</p>
            <div className=" flex gap-12 justify-center w-full z-10">
              <SocialMediaLinks
                wrapperClass="justify-around w-full md:justify-between !gap-0 lg:!gap-7 !pr-0"
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
            md:w-full
            z-10
          "
        >
          <div className=" flex flex-row flex-wrap lg:flex-nowrap lg:flex-col gap-3 lg:gap-[18px] w-full">
            {/* <Link href={'/'}>Careers</Link> */}
            <Link
              className="basis-[47%] order-1"
              href={params.lang ? `/${params.lang}/privacy-policy` : '/privacy-policy'}
            >
              Privacy Policy
            </Link>
            <Link
              className="basis-[47%] order-3 md:order-2"
              href={params.lang ? `/${params.lang}/terms-and-conditions` : '/terms-and-conditions'}
            >
              Terms & Conditions
            </Link>
            {/* <Link href={'/'}>QnA Forum</Link> */}
            {/* </div>
          <div className=" flex flex-col gap-3 lg:gap-[18px]"> */}
            <Link
              className="basis-[47%] order-2 md:order-3"
              href={params.lang ? `/${params.lang}/contact-us` : '/contact-us'}
            >
              Book a Meeting RCIC
            </Link>
            <Link className="basis-[47%] order-1" href={params.lang ? `/${params.lang}/disclaimer` : '/disclaimer'}>
              Disclaimer
            </Link>
            <Link
              className="basis-[47%] order-4"
              target="_blank"
              href={'https://merchant.razorpay.com/policy/N4MfufxTo5bg1L/refund'}
            >
              Cancellation & Refund Policy
            </Link>
            <Link
              className="basis-[47%] order-4"
              href={params.lang ? `/${params.lang}/shipping-policy` : '/shipping-policy'}
            >
              Shipping Policy
            </Link>
            {/* <Link href={'/'}>GCKey vs APR </Link> */}
            {/* <Link href={'/'}>Affiliate Program</Link> */}
            <Link className="basis-[47%] order-5" href={params.lang ? `/${params.lang}/sitemap` : '/sitemap'}>
              Sitemap
            </Link>
            <div
              className="basis-[47%] order-5 cursor-pointer"
              onClick={() => {
                if (pathname === '/checkout') {
                  window.location.href = `${params.lang ? `/${params.lang}/checkout` : '/checkout'}`;
                  return;
                }
                router.push(`${params.lang ? `/${params.lang}/checkout` : '/checkout'}`);
              }}
            >
              Pay Now
            </div>
          </div>
        </div>
      </div>
      <div
        className={`
        mt-[10px]
        py-5
        px-6
        xl:pt-0
        xl:pb-0
        xl:px-0
        mg:flex-grow-1
        flex
        flex-col
        justify-center
        lg:justify-between
        lg:gap-0
        z-10
        ${
    getDomainIndex() === 0 ? '' : 'flex-col-reverse'
    }
    `}
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
              <p className=" text-sm mb-[4px] whitespace-pre md:whitespace-normal font-bold">
                {address?.attributes.name}
              </p>
              <p className=" text-sm mb-[4px] whitespace-normal">{HtmlParser(address?.attributes?.location)}</p>
              <p className=" text-sm mb-[4px] lg:mb-0 font-bold mt-2 text-blue-600 underline">
                Ph:{' '}
                <a className="cursor-pointer" href={`tel:${address?.attributes?.phone_number}`}>
                  {address?.attributes?.phone_number}{' '}
                </a>
              </p>
            </div>
          );
        })}
      </div>
      <div className="absolute h-[380px] top-0 left-0 hidden w-full overflow-hidden xl:block z-1">
        <FooterGrid />
      </div>
    </footer>
  );
}
