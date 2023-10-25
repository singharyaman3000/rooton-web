import React from 'react';
import Image from 'next/image';
import autoprefixer from 'autoprefixer';

interface ITrainingData {
  description: string;
  duration: string;
  questions: string;
  score: string;
}

interface TrainingCardProps {
  title: string;
  data: ITrainingData;
}

const TrainingCard: React.FC<TrainingCardProps> = ({ title, data }) => {
  return (
    <div className="card bg-secondary-grey relative my-5 ">
      <style jsx>{`
        .card {
          min-width: 400px; /* Set a minimum width for the card */
          max-width: 100%; /* Make the card responsive in width */
          padding: 30px;
          display: flex;
          border-top: 100px solid rgb(0 0 0 / 3%);
        }

        .card:not(:first-child) {
          margin-left: 40px; /* Adjust this value as needed */
      }      

        .card-text {
          font-size: 15px; /* Default text size */
          letter-spacing: 1px;
          min-height: 200px;
          max-height: 100%;
          text-align: justify;

          
        }
        .title {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sub {
          font-size: 13px;
          font-weight: 500;
          text-align: center;
        }

        .sub1 {
          font-size: 13px;
          font-weight: 800;
          text-align: center;
        }

        .heading {
          letter-spacing: 1.5px;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          /* Adjust styles for smaller screens (e.g., tablets) */
          

          .card-text {
            font-size: 13px; /* Decrease text size on smaller screens */
          }
        }

        @media (max-width: 480px) {
          /* Further adjust styles for mobile devices */
          .card-text {
            font-size: 12px; /* Decrease text size on mobile screens */
          }
        }
      `}</style>
      <div className="">

        <div className="title absolute items-center z-[10] left-0 top-[-80px] md:p-[16px] w-full">
        <h2 className="heading text-lg sm:text-xl md:text-2xl font-bold mb-4">{title}</h2>
        </div>

        <div className='flex justify-between pb-3.5 font-semibold text-sm mb-8'>
          <div className='flex items-center justify-center flex-col'><Image src='/images/IELTS_training/question.png' alt="Question" width={40} height={50} /><p className='sub pt-3 mb-1'>Questions</p><p className='sub1'>{data.questions}</p></div>
          <div className='flex items-center justify-center flex-col'><Image src='/images/IELTS_training/time.png' alt="Duration" width={40} height={50} /><p className='sub pt-3 mb-1'>Duration</p><p className='sub1'>{data.duration}</p></div>
          <div className='flex items-center justify-center flex-col'><Image src='/images/IELTS_training/score.png' alt="Score" width={40} height={50} /><p className='sub pt-3 mb-1'>Score</p><p className='sub1'>{data.score}</p></div>
        </div>

        <div className="text-xs md:text-sm text-black card-text">
        <p>{data.description}</p>
        </div>
        
      </div>
    </div>
  );
};

export default TrainingCard;
