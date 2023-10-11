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
    <div className="bg-white shadow-md rounded-md p-4 m-2">
      {data.imageUrl && (
        <img src={data.imageUrl} alt={`${title} Image`} className="w-full h-48 object-cover rounded-t-md" />
      )}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-700">{data.description}</p>
        {/* You can add other data fields here as needed */}
      </div>
    </div>
  );
};

export default TrainingCard;
