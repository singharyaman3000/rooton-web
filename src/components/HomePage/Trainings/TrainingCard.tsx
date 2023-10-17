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
          padding: 25px;
          display: flex;
        }

        .card:not(:first-child) {
          margin-left: 40px; /* Adjust this value as needed */
      }      

        .card-text {
          font-size: 16px; /* Default text size */
          letter-spacing: 1px;
          min-height: 250px;
          max-height: 100%;
          text-align: justify;

          
        }
        .title {
          display: flex;
          align-items: center;
          justify-content: center;
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

        <div className="title flex items-center z-[10] left-0 bottom-0 md:p-[16px] w-full">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">{title}</h2>
        </div>

        <div className='flex justify-between pb-3.5 font-medium text-sm'>
          <div className='flex items-center justify-center flex-col'><Image src='/images/IELTS_training/question.png' alt="Question" width={40} height={50} /><p>Questions</p><p>{data.questions}</p></div>
          <div className='flex items-center justify-center flex-col'><Image src='/images/IELTS_training/time.png' alt="Duration" width={40} height={50} /><p>Duration</p><p>{data.duration}</p></div>
          <div className='flex items-center justify-center flex-col'><Image src='/images/IELTS_training/score.png' alt="Score" width={40} height={50} /><p>Score</p><p>{data.score}</p></div>
        </div>

        <div className="text-xs md:text-sm text-black card-text">
        <p>{data.description}</p>
        </div>
        
      </div>
    </div>
  );
};

export default TrainingCard;
