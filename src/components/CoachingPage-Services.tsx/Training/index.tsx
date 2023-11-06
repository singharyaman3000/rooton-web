import React from 'react';
import { ITraining } from '@/app/services/apiService/coaching_contentsAPI';
import { appendAssetUrl } from '@/utils';
import styles from './training.module.css'; // Ensure the path is correct

type TrainingCardProps = {
  training: ITraining;
  isFirst?: boolean;
  index: number;
};

const TrainingCard: React.FC<TrainingCardProps> = ({ training, isFirst, index }) => {
  return (
    <div
      className={`card ${styles.trainingCards} flex flex-row bg-secondary-grey relative my-5 ${isFirst ? styles.firstCard : ''} ${
        index === 1 ? styles.secondCard : ''
      }`}
    >
      
      {isFirst ? (
        <div className={styles.descriptionContainer}>
          {/* <h1 className={styles.subtitle1}> */}
          {/* {training.title}: </h1> */}
          {/* <h2 className={styles.subtitle}> */}
          {/* {training.description}</h2> */}
        </div>
      ) : (
        <div className={`second-card flex flex-row`}>
          <div className={`title ${styles.xyz} ${styles.xyyz} w-full`}>
            <img className={styles.image} src={appendAssetUrl(training.image)} alt="boy" />
            <h2 className={`heading ${styles.qqq} text-ali text-lg sm:text-xl md:text-2xl font-bold mb-2`}>{training.title}</h2>
          </div>
          <div className={`card-text1 ${styles.cardText}`}>
            <p>{training.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingCard;
