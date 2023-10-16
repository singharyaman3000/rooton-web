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
        { id: 1, logoSrc: '/images/examTile/Ielts.png', href: 'coaching/26' },
        { id: 2, logoSrc: '/images/examTile/TOEFL.png' },
        { id: 3, logoSrc: '/images/examTile/GRE.png' },
        { id: 4, logoSrc: '/images/examTile/DUOLINGO.png' },
        { id: 5, logoSrc: '/images/examTile/PTE.png' },
        { id: 6, logoSrc: '/images/examTile/FRENCH.png' },
    ];

    return (
        <div>
            <div className='section-title-container'>
            <h4 className="section-title">Coaching Services</h4>
            <style jsx>{`
                .section-title-container {
                    margin-left: 80px;
                    font-size: 3rem;
                    font-weight: 800;
                    color: #000;
                    margin-bottom: 25px;
                    margin-top: 50px;
                }

                @media screen and (max-width: 767px) {
                    .section-title-container {
                        align-items: center;
                        justify-content: center;
                        font-size: 1.75rem;
                    }
                }

            `}</style>
            </div>
            <div className="exam-tiles">
                <style jsx>{`
                    .exam-tiles {
                        display: grid;
                        grid-template-columns: 1fr 1fr 1fr;
                        gap: 30px; /* Adjust the gap between tiles */
                        justify-items: center; /* Center tiles horizontally */
                        align-items: center;
                        padding: 30px 150px;
                    }

                    .exam-tile-container {
                        display: flex;
                        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
                        transition: transform 0.2s ease-in-out;
                        width: 300px;
                        height: 130px;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                        border-radius: 10px;
                    }

                    .exam-tile {
                        padding: 20px;
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
