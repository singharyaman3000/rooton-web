import React, { FC } from 'react';
import NextImage from '@/components/UIElements/NextImage';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export interface IWhyRootON {
  key: string;
  unique_identifier_name?: string;
  title?: string;
  value: string;
  position: number;
  icon?: string;
  iconComponent?: FC;
  containerClass?: string;
}

const HonestyCard = ({ title, icon, value, unique_identifier_name, containerClass, iconComponent: IconComponent }: IWhyRootON) => {
  const params = useParams();

  return (
    <div
      className={`${containerClass} honestyCard flex flex-col justify-start p-4 bg-primary`}
    >
      <style jsx>{`
        .cards {
          align-items: center;
          cursor: pointer; // Make it look clickable
        }
      `}</style>
      <Link href={params.lang ? `/${params.lang}/${unique_identifier_name}` : `/${unique_identifier_name}`} passHref>
        <div className="cards honestyCard flex flex-col justify-center p-4 bg-primary">
          <div className="relative w-[250px] h-[120px]">
            {icon ? (
              <NextImage
                sizes={'30vw'}
                src={`${process.env.NEXT_ASSETS_BASEURL}${icon}`}
                title={title || 'icon image'}
                fill
                style={{ objectFit: 'contain' }}
                altText={title || 'icon image'}
              />
            ) : null}
            {IconComponent ? <IconComponent /> : null}
          </div>
        </div>
      </Link>
      <h3 className="text-primary-font-color line-clamp-3 w-[80%] mb-4 text-xl md:text-[22px] leading-[1.5] md:leading-[1.36] font-bold leading-6 tracking-normal">
        {title}{' '}
      </h3>
      <p className="text-sm md:text-base font-[500] leading-[1.71] md:leading-[1.63] md:opacity-[0.68] text-primary-font-color">
        {value}
      </p>
    </div>
  );
};

export default HonestyCard;
