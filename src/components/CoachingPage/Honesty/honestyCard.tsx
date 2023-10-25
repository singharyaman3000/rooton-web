import NextImage from '@/components/UIElements/NextImage';
import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';

export interface IWhyRootON {
  cardKey: string;  // changed from key to cardKey
  id: string;
  title: string;
  value: string;
  position: number;
  icon: string;
}


const HonestyCard = ({ id, title, icon, value }: IWhyRootON) => {  

  return (
    <>
    <style jsx>{`
      .cards {
        align-items: center;
        cursor: pointer; // Make it look clickable
      }
    `}</style>
     <Link href={`/coaching/${id}`} passHref>
    <div className="cards honestyCard flex flex-col justify-center p-4 lg:px-[50px] lg:py-[41px] bg-primary">
      <div className="relative w-[250px] h-[120px]">
        <NextImage sizes={'30vw'} src={icon} title={title} fill style={{ objectFit: 'contain' }} altText={title} />
      </div>
    </div>
    </Link>
    </>
  );
};

export default HonestyCard;
