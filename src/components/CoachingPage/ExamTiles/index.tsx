'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type ExamTileProps = {
    logoSrc: string;
    href: string; // New prop for link destination
};

const ExamTile: React.FC<ExamTileProps> = ({ logoSrc, href  }) => {
    return (
        <Link href={href}>
            <div className="exam-tile">
                <Image src={logoSrc} alt="Exam Logo" width={250} height={100} />
            </div>
        </Link>
    );
};

const ExamTiles: React.FC = () => {
    const tiles = [
        { id: 1, logoSrc: '/images/examTile/Ielts.png', href: 'coaching/24' },
        { id: 2, logoSrc: '/images/examTile/TOEFL.png' },
        { id: 3, logoSrc: '/images/examTile/GRE.png' },
        { id: 4, logoSrc: '/images/examTile/DUOLINGO.png' },
        { id: 5, logoSrc: '/images/examTile/PTE.png', href: 'coaching/25' },
        { id: 6, logoSrc: '/images/examTile/FRENCH.png' },
    ];

    return (
        <div>
            <div className="mt-9 px-[24px] md:px-[48px] lg:px-[80px] !py-0 pt-10 md:pt-[100px] fgx">
            <h4 className="max-w-[340px] md:max-w-none mb-3.5 md:text-5xl gradient-text text-primary-text font-extrabold not-italic !leading-[1.42] tracking-[normal] text-[1.75rem] undefined">
                Coaching Services</h4></div>
       
            <div className="exam-tiles">
                <style jsx>{`
                    .exam-tiles {
                        display: grid;
                        grid-template-columns: 1fr 1fr 1fr;
                        gap: 40px; /* Adjust the gap between tiles */
                        justify-items: center; /* Center tiles horizontally */
                        align-items: center;
                        padding: 30px 100px;
                    }

                    .exam-tile-container {
                        display: flex;
                        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
                        transition: transform 0.2s ease-in-out;
                        width: 300px;
                        height: 150px;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                        border-radius: 10px;
                    }

                    .exam-tile {
                        padding: 30px;
                        text-align: center;
                        cursor: pointer;
                    }

                    .exam-tile-container:hover {
                        transform: scale(1.05);
                    }

                    /* Media queries for responsiveness */
                    @media screen and (max-width: 1100px) {
                        .exam-tiles {
                            grid-template-columns: repeat(2, 1fr); /* 2 columns for medium screens */
                            padding: 30px 50px;
                        }
                    }

                    @media screen and (max-width: 767px) {
                        .exam-tiles {
                            grid-template-columns: repeat(1, 1fr); /* 1 column for small screens */
                            padding: 30px 20px;
                        }
                    }
                `}</style>
                {tiles.map((tile) => (
                    <div className="exam-tile-container" key={tile.id}>
                         <ExamTile logoSrc={tile.logoSrc} href={tile.href || '#'} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExamTiles;
