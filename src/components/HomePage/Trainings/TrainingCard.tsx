import React from 'react';

interface ITrainingData {
  description: string;
  imageUrl?: string;
  otherData?: any; // Feel free to define other properties as required
}

interface TrainingCardProps {
  title: string;
  data: ITrainingData;
}

const TrainingCard: React.FC<TrainingCardProps> = ({ title, data }) => {
  return (
    <div className="card bg-secondary-grey relative my-10 ">
      <style jsx>{`
        .card {
          min-width: 400px; /* Set a minimum width for the card */
          max-width: 100%; /* Make the card responsive in width */
          padding: 50px;
          display: flex;
        }

        .card:not(:first-child) {
          margin-left: 40px; /* Adjust this value as needed */
      }      

        .card-text {
          font-size: 13px; /* Default text size */
          letter-spacing: 1px;
          min-height: 250px;
          max-height: 100%;

          
        }
        .title {
          
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
        {data.imageUrl && (
          <img src={data.imageUrl} alt={`${title} Image`} className="w-full h-48 object-cover" />
        )}
        <div className="text-xs md:text-sm text-black card-text">
        <p>{data.description}</p>
        
          
        </div>
        <div className="title flex  items-center z-[10] left-0 bottom-0 bg-white p-[10px] md:p-[16px] w-full">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">{title}</h2>
          </div>
      </div>
    </div>
  );
};

export default TrainingCard;
