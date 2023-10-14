import React, { useState, useRef } from 'react';
import TrainingCard from '@/components/HomePage/Trainings/TrainingCard';
import SliderNav from '@/components/UIElements/Slider/sliderNav';

const trainingDetails = {
    "General Training": {
      description: "For those migrating to an English-speaking country for work, training programs, or secondary education.",
      Listening: "You will listen to four recordings of native English speakers and then respond to a series of questions in writing. Assessors will be looking for evidence of your ability to grasp the major concepts and detailed factual information, the viewpoints and attitudes of speakers, the goal of an utterance, and the evolution of ideas.",
      Reading: "This part is intended to assess a wide variety of reading abilities. It contains excerpts from books, periodicals, and newspapers, as well as announcements, advertising, and business handbooks and standards. These are the kinds of resources you're likely to come across on a regular basis in an English-speaking setting.",
      Speaking: "This section is divided into three parts. The examiner will ask broad questions about you and a variety of common themes such home, family, employment, studies, and interests. In the next section, you will be handed a card with a question on it. The examiner will next ask a series of questions on the same subject.",
      Writing: "There are two tasks. First, you will be presented with a situation and asked to write a letter requesting information, or explaining the situation. The letter may be personal, semi-formal or formal in style. Then, you will be asked to write an essay in response to a point of view, argument or problem. The essay can be fairly personal in style."
    },
    "Academic Training": {
      description: "For those planning to study at undergraduate or postgraduate levels or seeking professional registration in an English-speaking country.",
      Listening: "Details not available.",
      Reading: "Details not available.",
      Speaking: "Details not available.",
      Writing: "Details not available."
    }
  };

type TrainingDetailsProps = {
  type: "General Training" | "Academic Training";
}

const TrainingDetailsComponent = ({ type }: TrainingDetailsProps) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const cardContainerRef = useRef(null);
    const currentDetails = trainingDetails[type];

    const nextSlide = () => {
      const nextIndex = activeSlide + 1;
      setActiveSlide(nextIndex < Object.keys(currentDetails).length - 1 ? nextIndex : Object.keys(currentDetails).length - 2);
      if (cardContainerRef.current) {
          cardContainerRef.current.scrollLeft = nextIndex * 300; // 300 is the assumed width of each card
      }
  };
  
  const prevSlide = () => {
      const prevIndex = activeSlide - 1;
      setActiveSlide(prevIndex >= 0 ? prevIndex : 0);
      if (cardContainerRef.current) {
          cardContainerRef.current.scrollLeft = prevIndex * 300; // 300 is the assumed width of each card
      }
  };
  
    return (
      <>
      <style jsx>{`
        .card-container::-webkit-scrollbar {
          display: none; 
        }
        .card-container{
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>
      <div className="wrapper">
    {/* <SliderNav
        handleOnClick={prevSlide} // Use the prevSlide function
        cssClass="mr-[16px] bg-[#f3f3f3] disabled:bg-[#f3f3f3]"
        disable={activeSlide === Object.keys(currentDetails).length - 2}
        leftNav
    />

    <SliderNav
        handleOnClick={nextSlide} // Use the nextSlide function
        cssClass="bg-[#f3f3f3] disabled:bg-[#f3f3f3]"
        disable={activeSlide === Object.keys(trainingDetails).length - 1}
    /> */}
      <div className="card-container flex overflow-x-scroll" ref={cardContainerRef}> {/* Changed space-x-4 to space-x-6 */}
          <TrainingCard title="Listening" data={{ description: currentDetails.Listening }} />
          <TrainingCard title="Reading" data={{ description: currentDetails.Reading }} />
          <TrainingCard title="Writing" data={{ description: currentDetails.Writing }} />
          <TrainingCard title="Speaking" data={{ description: currentDetails.Speaking }} />
        </div>
        </div>
        </>
      );
};

export default TrainingDetailsComponent;
