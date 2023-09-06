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

export interface ITestimonials {
  testimonials: ITestimonialData[];
  title: string;
  subTitle: string;
}

type TestimonialProps = { title: string; subTitle: string };

const Testimonials = ({ title, subTitle }: TestimonialProps) => {
  const { data, loading } = useClientAPI({ apiFn: getTestimonials });
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

  return (
    <section className="w-full bg-primary-white overflow-x-hidden">
      <SectionContainer cssClass="!pr-[0px] pt-10 md:pt-[80px]">
        <div className="flex items-end justify-between md:pr-[48px] lg:pr-[80px]">
          <div className="md:max-w-[70%] lg:max-w-none">
            <SectionHeadings title={title} subTitle={subTitle} />
          </div>
          <div className="items-center hidden md:flex md:mb-[8px]">
            <div>
              <SliderNav handleOnClick={decrementPage} cssClass="mr-[16px] bg-[#f3f3f3] disabled:bg-[#f3f3f3]" disable={pageNum === 0} leftNav />
              <SliderNav handleOnClick={incrementPage} cssClass='bg-[#f3f3f3] disabled:bg-[#f3f3f3] ' disable={pageNum === totalPages - 1} />
            </div>
          </div>
        </div>
        {/* eslint-disable react/jsx-props-no-spreading */}
        <div className="pt-[40px] md:pt-[48px]" {...handlers}>
          <Slider
            scrollPercent={`${-scrollAmt}px`}
            id="testimonial-listing"
            pageNum={pageNum}
            slideParentClass="!justify-start"
            loading={loading}
            loadingUI={<TestimonialPreLoader />}
            slideClass="!w-[73.4%] px-[8px] md:px-[15px] !min-w-[264px] md:!w-[29.6%] w-full md:!min-w-[380px] md:!max-w-[430px]"
          >
            {(data ?? []).map(({ attributes, id }) => {
              return (
                <TestimonialCard
                  handleOnClick={showVideoPopUP}
                  id={id}
                  attributes={attributes}
                  key={id}
                  type={attributes.media_url.data?.[0]?.attributes.ext === '.mp4' ? 'video' : 'text'}
                />
              );
            })}
          </Slider>
        </div>
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
  );
};

export default Testimonials;
