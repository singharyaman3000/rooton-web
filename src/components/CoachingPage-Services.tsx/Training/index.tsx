import React from 'react';
import { ITraining } from '@/app/services/apiService/coaching_contentsAPI';

type TrainingCardProps = {
  training: ITraining;
  isFirst?: boolean;
  index: number;
};

const TrainingCard: React.FC<TrainingCardProps> = ({ training, isFirst, index }) => {
  return (
    <div
      className={`card flex flex-row bg-secondary-grey relative my-5 ${isFirst ? 'first-card' : ''} ${
        index === 1 ? 'second-card' : ''
      }`}
    >
      <style jsx>{`
        .card {
          min-width: 350px;
          width: 100%;
          padding: 40px;
          border-top: 60px solid rgb(255,246,231);
          margin-right: 30px;
          margin-top: 0px;
          background-color:  rgb(255,246,231);
          box-shadow: 0px 13px 15px 0px rgba(0, 0, 0, 0.10);
        }

        .card::-webkit-scrollbar {
          display: none;
        }
        .card {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .card:not(:last-child) {
        }

        .first-card {
          /* Styles specific to the first card */
          border-top: none;
          background-color: #fff;
          padding: 0px;
          box-shadow: none;
        }

        .title {
          display: flex; 
          margin: auto; 
          justify-content: center; 
             
        }
        .image {
          height: 45px;
          position: relative;
          top: -4px;
          left: -13px;
        }

        .card-text {
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 1px;
          min-height: 250px;
          max-height: 100%;
          text-align: justify;
          
        }
        

        .subtitle {
          font-size: 20px;
          font-weight: 400;
          margin-top: 12px;
        }
        .subtitle1 {
          font-size: 23px;
          font-weight: 600;
          width: 100%;
        }
        .description_container {
          display: flex;
          flex-direction: column;
        }

        .heading {
          text-align: center;
          font-size: 1.3rem;
          font-weight: 600;
          color: #000;
          letter-spacing: 1.5px;
        }

        @media (max-width: 768px) {
          .card-text {
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .card-text {
            font-size: 12px;
          }
          .card {
            min-width: 300px;
            max-width: 100%;
            padding: 40px;
          }
        }
      `}</style>

      {isFirst ? (
        <div className="description_container first-card">
          {/* <h1 className="subtitle1 mb-2">{training.title}: </h1> */}
          {/* <h2 className="subtitle">{training.description}</h2> */}
        </div>
      ) : (
        <div className=" second-card flex flex-row">
          <div className="title absolute items-center z-[10] left-0 top-[-30px] w-full">
            <img className='image' src="/images/icons/headphones.png" alt="boy" />
            <h2 className="heading text-ali text-lg sm:text-xl md:text-2xl font-bold mb-2">{training.title}</h2>
          </div>
          <div className=" text-black card-text">
            <p>{training.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingCard;
