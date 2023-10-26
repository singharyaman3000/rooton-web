import { useSwipeable } from 'react-swipeable';

import ProfileCard from '../ProfileCard';
import Slider from '@/components/UIElements/Slider';
import SliderNav from '@/components/UIElements/Slider/sliderNav';
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

const convertToHtmlId = (input: string) => {
  let id = input.toLowerCase();
  id = id.replace(/\s+/g, '-'); // replace spaces with hyphens
  id = id.replace(/[^a-z0-9-]/g, ''); // remove special characters except hyphen
  return id;
};

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

  return (
    <section className="hidden md:block w-full team-slider-section overflow-x-hidden">
      <SectionContainer cssClass="!pr-[0px] m-auto max-w-screen-2k py-10 md:py-[80px]">
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
            slideParentClass="!justify-start"
            pageNum={pageNum}
            slideClass="!w-[73.4%] md:px-[15px] !min-w-[264px] md:!w-[29.6%] max-w-[380px] w-full md:!min-w-[380px] md:!max-w-[430px]"
          >
            {teamData.map(({ employeeName, employeeRole, employeeDescription, imageUrl }, index) => {
              return (
                <ProfileCard
                  key={`${employeeName}-${imageUrl}`}
                  name={employeeName}
                  title={employeeRole}
                  description={employeeDescription}
                  imageSrc={imageUrl}
                />
              );
            })}
          </Slider>
        </div>
      </SectionContainer>
    </section>
  );
};

export default TeamProfileSlider;
