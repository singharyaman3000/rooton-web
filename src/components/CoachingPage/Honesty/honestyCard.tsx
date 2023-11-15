import NextImage from '@/components/UIElements/NextImage';
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export interface IWhyRootON {
  cardKey: string;
  id: string;
  title: string;
  value: string;
  position: number;
  icon: string;
}

const HonestyCard = ({ id, title, icon }: IWhyRootON) => {const params = useParams();

  return (
    <>
      <style jsx>{`
        .cards {
          align-items: center;
          cursor: pointer; // Make it look clickable
        }
      `}</style>
      <Link href={params.lang ? `/${params.lang}/coaching/${id}` : `/coaching/${id}`} passHref>
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
