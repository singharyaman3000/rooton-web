'use client';

import { getTestimonials } from '@/app/services/testimonialAPI';
import SectionContainer from '@/components/Containers/SectionContainers';
import TestimonialCard, {
  ITestimonialAttributes,
  ITestimonialData,
} from '@/components/UIElements/Cards/TestimonialCard';
import TestimonialFooter from '@/components/UIElements/Cards/TestimonialCard/TestimonialFooter';
import TestimonialPreLoader from '@/components/UIElements/Cards/TestimonialCard/TestimonialPreLoader';
import PopUp from '@/components/UIElements/PopUp';
import usePopUp from '@/components/UIElements/PopUp/hooks/usePopUp';
import SectionHeadings from '@/components/UIElements/SectionHeadings';
import Slider from '@/components/UIElements/Slider';
import useClientAPI from '@/components/UIElements/Slider/hooks/useClientAPI';
import useSliderData from '@/components/UIElements/Slider/hooks/useSliderData';
import SliderNav from '@/components/UIElements/Slider/sliderNav';
import VideoElement from '@/components/UIElements/VideoElement';
import { appendAssetUrl } from '@/utils';
import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import TrainingDetailsComponent from '@/components/HomePage/Trainings/TrainingDetailsComponent';

export interface ITestimonials {
  testimonials: ITestimonialData[];
  title: string;
  subTitle: string;
}

type TestimonialProps = { title: string; subTitle: string; apiUrl: string };

const Training = ({ title, subTitle, apiUrl }: TestimonialProps) => {
  const { data, loading } = useClientAPI({ apiFn: () => getTestimonials(apiUrl) });
  // State to handle toggle
  const [activeToggle, setActiveToggle] = useState('General Training'); // you can name it something meaningful
  const [activeTab, setActiveTab] = useState('General Training');
  // Fetch testimonials based on active toggle
  const fetchTestimonials = () => {
    if (!data) {
      return [];
    }

    if (activeToggle === 'General Training') {
      return data.filter((testimonial) => testimonial.attributes.type === 'General Training');
    } else {
      return data.filter((testimonial) => testimonial.attributes.type === 'Academic Training');
    }
  };

  const filteredTestimonials = fetchTestimonials();
  const { showPopUp, hidePopUp, poupState } = usePopUp();
  const { totalPages, incrementPage, decrementPage, pageNum, scrollAmt } = useSliderData({
    slideId: 'testimonial-listing',
    sliderData: data,
  });
  const [popUpData, setPopUpData] = useState<ITestimonialAttributes>();
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      incrementPage();
    },
    onSwipedRight: () => {
      decrementPage();
    },
  });

  const showVideoPopUP = (videoData: ITestimonialAttributes) => {
    setPopUpData(videoData);
    showPopUp();
  };

  const TabButton = ({ label }: { label: string }) => {
    const isActive = activeToggle === label;

    return (
      <>
        <style jsx>{`
          .buttons-container {
            display: flex;
            border: 1px solid lightgray; // Light black border for the container
            align-items: center;
          }

          .tab-button {
            flex: 1;
            transition: all 0.3s ease;
            position: relative;
            border: none; // Removing border from individual buttons
            border-right: 1px solid lightgray; // Adding vertical line between buttons
            border-radius: 0; // No border-radius
          }

          .tab-button:last-child {
            border-right: none; // Remove border for the last button
          }

          .tab-button.active {
            background-color: black;
            color: white;
          }

          .tab-button:not(.active) {
            background-color: white;
            color: black;
            &:hover {
              background-color: #f3f3f3;
            }
          }
        `}</style>
        <button
          className={`px-4 py-2 mr-2 border rounded-t-lg transition duration-300 ease-in-out tab-button ${
            isActive
              ? 'active bg-black text-white border-black hover:bg-gray-800'
              : 'bg-gray-100 border-transparent hover:bg-gray-200'
          }`}
          onClick={() => setActiveToggle(label)}
        >
          {label}
        </button>
      </>
    );
  };

  return (
    <>
      <style jsx>{`
        .buttons-container {
          margin-top: 10px;
        }
        .wrapper {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
      <section className="w-full bg-primary-white overflow-x-hidden">
        <SectionContainer cssClass="!pr-[0px] pt-10 md:pt-[80px]">
       
          <div className="md:max-w-[70%] lg:max-w-none">
            {/* Testimonials Heading */}
            <SectionHeadings title={title} subTitle={'Trainings'} />
          </div>
          <div className='wrapper'>
          {/* Add Toggle Buttons */}
          <div className="buttons-container">
            <TabButton label="General Training" />
            <TabButton label="Academic Training" />
          </div>
          
          <div className="items-center hidden md:flex md:mb-[8px]">
            {/* <div>
              <SliderNav
                handleOnClick={decrementPage}
                cssClass="mr-[16px] bg-[#f3f3f3] disabled:bg-[#f3f3f3]"
                disable={pageNum === 0}
                leftNav
              />
              <SliderNav
                handleOnClick={incrementPage}
                cssClass="bg-[#f3f3f3] disabled:bg-[#f3f3f3] "
                disable={pageNum === totalPages - 1}
              />
            </div> */}
          </div>
          </div>
          {/* Using the TrainingDetailsComponent */}
          <TrainingDetailsComponent type={activeToggle} />
          <PopUp
            onClose={hidePopUp}
            showPopuUp={poupState}
            body={
              <VideoElement
                cssClass={'object-cover absolute h-full top-0'}
                poster=""
                src={appendAssetUrl(popUpData?.media_url.data[0].attributes.url ?? '')}
              />
            }
            header={
              <TestimonialFooter
                college_photo={appendAssetUrl(popUpData?.icon.data[0].attributes.url ?? '')}
                name={popUpData?.name ?? ''}
                college={popUpData?.college ?? ''}
                caption={popUpData?.profile_picture.data.attributes.caption ?? ''}
                url={popUpData?.profile_picture.data.attributes.url ?? ''}
                alternativeText={popUpData?.profile_picture.data.attributes.alternativeText ?? ''}
              />
            }
          />
        </SectionContainer>
      </section>
    </>
  );
};

export default Training;
