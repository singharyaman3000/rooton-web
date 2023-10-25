import React, { useState, useRef } from 'react';
import TrainingCard from '@/components/HomePage/Trainings/TrainingCard';
import SliderNav from '@/components/UIElements/Slider/sliderNav';

const trainingDetails = {
    "General Training": {
      questions: "40",
      
      description: "For those migrating to an English-speaking country for work, training programs, or secondary education.",
      Listening: "You will listen to four recordings of native English speakers and then respond to a series of questions in writing. Assessors will be looking for evidence of your ability to grasp the major concepts and detailed factual information, the viewpoints and attitudes of speakers, the goal of an utterance, and the evolution of ideas.",
      Reading: "This part is intended to assess a wide variety of reading abilities. It contains excerpts from books, periodicals, and newspapers, as well as announcements, advertising, and business handbooks and standards. These are the kinds of resources you're likely to come across on a regular basis in an English-speaking setting.",
      Speaking: "This section is divided into three parts. The examiner will ask broad questions about you and a variety of common themes such home, family, employment, studies, and interests. In the next section, you will be handed a card with a question on it. The examiner will next ask a series of questions on the same subject.",
      Writing: "There are two tasks. First, you will be presented with a situation and asked to write a letter requesting information, or explaining the situation. The letter may be personal, semi-formal or formal in style. Then, you will be asked to write an essay in response to a point of view, argument or problem. The essay can be fairly personal in style."
    },
    "Academic Training": {
      description: "For those planning to study at undergraduate or postgraduate levels or seeking professional registration in an English-speaking country.",
      Listening: "In this module, test-takers listen to a range of recordings and answer questions to evaluate their ability to understand spoken English in various accents and contexts. It assesses listening comprehension skills necessary for academic environments.",
      Reading: "The reading module comprises three academic texts, testing candidates' ability to comprehend, analyze, and infer information from complex passages. It assesses reading skills required for academic research and study.",
      Speaking: " In the speaking module, candidates engage in a face-to-face interview with an examiner. They discuss familiar topics, present a short speech, and engage in a discussion. This evaluates their spoken English proficiency and communication abilities for academic purposes.",
      Writing: "Test-takers complete two writing tasks. Task 1 involves describing visual data, while Task 2 requires them to present an argument or provide an opinion. This module evaluates academic writing proficiency."
    }
  };

type TrainingDetailsProps = {
  type: "General Training" | "Academic Training";
}

const TrainingDetailsComponent = ({ type }: TrainingDetailsProps) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const currentDetails = trainingDetails[type];

  const nextSlide = () => {
    const nextIndex = activeSlide + 1;
    setActiveSlide(nextIndex < Object.keys(currentDetails).length - 1 ? nextIndex : Object.keys(currentDetails).length - 2);
    if (cardContainerRef.current !== null) {
      (cardContainerRef.current as HTMLDivElement).scrollLeft = nextIndex * 300; // 300 is the assumed width of each card
    }
  };
  
  const prevSlide = () => {
    const prevIndex = activeSlide - 1;
    setActiveSlide(prevIndex >= 0 ? prevIndex : 0);
    if (cardContainerRef.current !== null) {
      (cardContainerRef.current as HTMLDivElement).scrollLeft = prevIndex * 300; // 300 is the assumed width of each card
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
          <TrainingCard title="Listening" data={{ description: currentDetails.Listening, duration: "30 minutes", score:"0-9", questions:"40"}} />
          <TrainingCard title="Reading" data={{ description: currentDetails.Reading, duration: "60 minutes", score:"0-9", questions:"40" }} />
          <TrainingCard title="Writing" data={{ description: currentDetails.Writing, duration: "60 minutes", score:"0-9", questions:"2" }} />
          <TrainingCard title="Speaking" data={{ description: currentDetails.Speaking, duration: "12-15 minutes", score:"0-9", questions:"12-15" }} />
        </div>
      </div>
    </>
  );
};

export default TrainingDetailsComponent;
  

