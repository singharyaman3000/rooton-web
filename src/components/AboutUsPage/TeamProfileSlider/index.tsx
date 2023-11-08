'use client';

import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import ProfileCard from '../ProfileCard';
import { convertToHtmlId } from '@/utils';
import Slider from '@/components/UIElements/Slider';
import ModalProfileCard from '../ProfileCard/ModalProfileCard';
import SliderNav from '@/components/UIElements/Slider/sliderNav';
import usePopUp from '@/components/UIElements/PopUp/hooks/usePopUp';
import SectionContainer from '@/components/Containers/SectionContainers';
import useSliderData from '@/components/UIElements/Slider/hooks/useSliderData';
import SubSectionTitle from '@/components/UIElements/SectionHeadings/SubSectiontitle';

interface Employee {
  imageUrl: string;
  employeeName: string;
  employeeRole: string;
  employeeDescription: string;
}

interface TeamProfileSliderProps {
  contentHeading: string;
  teamData: Employee[];
}

const TeamProfileSlider = ({ contentHeading, teamData }: TeamProfileSliderProps) => {
  const { totalPages, incrementPage, decrementPage, pageNum, scrollAmt } = useSliderData({
    slideId: convertToHtmlId(contentHeading),
    sliderData: teamData,
  });
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      incrementPage();
    },
    onSwipedRight: () => {
      decrementPage();
    },
  });

  const { showPopUp, hidePopUp, poupState } = usePopUp();
  const [profileDataForModal, setProfileDataForModal] = useState({
    name: '',
    title: '',
    imageSrc: '',
    description: '',
  });

  return (
    <section className="hidden md:block w-full team-slider-section overflow-x-hidden mt-[58px] mb-20">
      <SectionContainer cssClass="!pr-[0px] 2k:!pr-20 m-auto max-w-screen-2k py-10 md:pt-[80px] md:pb-20">
        <div className="flex gap-2 flex-wrap items-end justify-between md:pr-[48px] lg:pr-[80px]">
          <div className="md:max-w-[70%] lg:max-w-none">
            <SubSectionTitle title={contentHeading} />
          </div>
          <div className="items-center hidden md:flex md:mb-[8px]">
            <div>
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
            </div>
          </div>
        </div>
        {/* eslint-disable react/jsx-props-no-spreading */}
        <div className="pt-[24px] md:pt-[48px]" {...handlers}>
          <Slider
            scrollPercent={`${-scrollAmt}px`}
            id={convertToHtmlId(contentHeading)}
            slideParentClass="!justify-start gap-10"
            pageNum={pageNum}
            slideClass="md:!w-[320px] !px-0"
          >
            {teamData.map(({ employeeName, employeeRole, employeeDescription, imageUrl }) => {
              return (
                <ProfileCard
                  key={`${employeeName}-${imageUrl}`}
                  popUpDisplayFns={{ setProfileDataForModal, showPopUp }}
                  profileData={{
                    name: employeeName,
                    title: employeeRole,
                    imageSrc: imageUrl,
                    description: employeeDescription,
                  }}
                />
              );
            })}
          </Slider>
        </div>
        <ModalProfileCard closePopUpFn={hidePopUp} showPopUp={poupState} profileData={profileDataForModal} />
      </SectionContainer>
    </section>
  );
};

export default TeamProfileSlider;
