'use client';

import { TESTIMONIAL_TITLE } from '@/app/constants/textConstants';
import { getTestimonials } from '@/app/services/testimonialAPI';
import SectionContainer from '@/components/Containers/SectionContainers';
import TestimonialCard, {
  ITestimonialAttributes,
  ITestimonialData,
} from '@/components/UIElements/Cards/TestimonialCard';
import TestimonialFooter from '@/components/UIElements/Cards/TestimonialCard/TestimonialFooter';
import PopUp from '@/components/UIElements/PopUp';
import usePopUp from '@/components/UIElements/PopUp/hooks/usePopUp';
import SectionHeadings from '@/components/UIElements/SectionHeadings';
import Slider from '@/components/UIElements/Slider';
import useClientAPI from '@/components/UIElements/Slider/hooks/useClientAPI';
import useSliderData from '@/components/UIElements/Slider/hooks/useSliderData';
import SliderNav from '@/components/UIElements/Slider/sliderNav';
import VideoElement from '@/components/UIElements/VideoElement';
import { appendAssetUrl } from '@/utils';
import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

export interface ITestimonials {
  testimonials: ITestimonialData[];
}

const Testimonials = () => {
  const { data } = useClientAPI({ apiFn: getTestimonials });
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

  const hideVideoPoUp = ()=>hidePopUp()

  return (
    <section className="w-full bg-primary-white ">
      <SectionContainer cssClass="!pr-[0px]">
        <div className="flex items-center justify-between md:pr-[80px]">
          <div>
            <SectionHeadings title={TESTIMONIAL_TITLE.title} subTitle={TESTIMONIAL_TITLE.subTitle} />
          </div>
          <div className="items-center hidden md:flex">
            <div>
              <SliderNav handleOnClick={decrementPage} cssClass="mr-[16px]" disable={pageNum === 0} leftNav />
              <SliderNav handleOnClick={incrementPage} disable={pageNum === totalPages - 1} />
            </div>
          </div>
        </div>
        {/* eslint-disable react/jsx-props-no-spreading */}
        <div className="pt-[24px] md:pt-[80px]" {...handlers}>
          <Slider
            scrollPercent={`${-scrollAmt}px`}
            id="testimonial-listing"
            pageNum={pageNum}
            slideClass="!w-[73.4%] !min-w-[264px] md:!w-[29.2%] w-full md:!min-w-[404px] !md:max-w-[400px]"
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
