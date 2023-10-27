import React from 'react';
import { ITraining } from '@/app/services/apiService/coaching_contentsAPI';
import SectionHeadings from '@/components/UIElements/SectionHeadings';

type TrainingCardProps = {
  training: ITraining;
  isFirst?: boolean;
  index: number; 
};

const TrainingCard: React.FC<TrainingCardProps> = ({ training, isFirst, index}) => {
  return (
    <div className={`card flex flex-row bg-secondary-grey relative my-5 ${isFirst ? 'first-card' : ''} ${index === 1 ? 'second-card' : ''}`}>
      <style jsx>{`
        .card {
          min-width: 350px;
          max-width: 100%;
          padding: 40px;
          border-top: 60px solid rgb(0 0 0 / 3%);
         margin-right: 30px;
         margin-top: 0px;
        }

        .card::-webkit-scrollbar {
          display: none; 
        }
        .card{
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
          
        }

        .second-card {
          margin-left: 80px;
        }

        .card-text {
          font-size: 14px;
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
          font-size: 1.2rem;
          font-weight: 600;
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
        <div className='description_container'>
        {/* <h1 className="subtitle1 mb-2">{training.title}: </h1> */}
        <h2 className="subtitle">{training.description}</h2>
        </div>
      ) : (

        <div className='flex flex-row'>
          <div className="title absolute items-center z-[10] left-0 top-[-45px] w-full">
            <h2 className="heading text-ali text-lg sm:text-xl md:text-2xl font-bold mb-2">{training.title}</h2>
          </div>
          <div className="text-xs md:text-sm text-black card-text">
            <p>{training.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingCard;
