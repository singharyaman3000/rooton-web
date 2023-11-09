import React from 'react';
import { ITraining } from '@/app/services/apiService/coachingContentsAPI';
import { appendAssetUrl } from '@/utils';
import styles from './training.module.css'; // Import the module CSS

type TrainingCardProps = {
  training: ITraining;
  isFirst?: boolean;
  index?: number;
};

const TrainingCard: React.FC<TrainingCardProps> = ({ training, isFirst, index }) => {
  return (
    <div
      className={`${styles.card} training-cards flex flex-row bg-secondary-grey relative my-5 ${
        isFirst ? styles.firstCard : ''
      } ${index === 1 ? 'second-card' : ''}`}
    >
      {isFirst ? (
        <div className={` ${styles.firstCard}`}>{/* ... */}</div>
      ) : (
        <div className="second-card flex flex-row">
          <div className={`${styles.title} training-toggle w-full`}>
            <img className={styles.image} src={appendAssetUrl(training.image)} alt="boy" />
            <h2 className={`${styles.heading} training-title text-ali text-lg sm:text-xl md:text-2xl font-bold mb-2`}>
              {training.title}
            </h2>
          </div>
          <div className={`${styles.cardText1}`}>
            <p>{training.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingCard;
