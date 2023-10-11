import React from 'react';
import Image from 'next/image';

type ExamTileProps = {
    logoSrc: string;
    onClick: () => void;
};

const ExamTile: React.FC<ExamTileProps> = ({ logoSrc, onClick }) => {
    return (
        <div className="exam-tile" onClick={onClick}>
            <Image src={logoSrc} alt="Exam Logo" width={250} height={100} />
        </div>
    );
};

const ExamTiles: React.FC = () => {
    const tiles = [
        { id: 1, logoSrc: '/images/examTile/Ielts.png'},
        { id: 2, logoSrc: '/images/examTile/TOEFL.png' },
        { id: 3, logoSrc: '/images/examTile/GRE.png' },
        { id: 4, logoSrc: '/images/examTile/DUOLINGO.png' },
        { id: 5, logoSrc: '/images/examTile/PTE.png' },
        { id: 6, logoSrc: '/images/examTile/FRENCH.png' },
    ];

    return (
        <div>
            <h4 className="section-title" style={
                {
                    textAlign: 'center',
                    fontSize: '3rem',
                    fontWeight: 800,
                    color: '#000',
                    marginBottom: '50px',
                    marginTop: '50px'
                }
            }>Coaching Services</h4>
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
                        <ExamTile logoSrc={tile.logoSrc} onClick={() => console.log(`Tile ${tile.id} clicked`)} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExamTiles;
