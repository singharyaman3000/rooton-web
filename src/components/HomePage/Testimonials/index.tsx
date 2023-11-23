'use client';

import { IPageMeta, MediaUrl } from '@/app/services/apiService/interfaces';
import { ITestimonialPageData, getTestimonials } from '@/app/services/testimonialAPI';
import MobilePagination from '@/components/BlogsListPage/MobilePagination';
import SectionContainer from '@/components/Containers/SectionContainers';
import TestimonialCard, {
  ITestimonialAttributes, ITestimonialData,
} from '@/components/UIElements/Cards/TestimonialCard';

import TestimonialFooter from '@/components/UIElements/Cards/TestimonialCard/TestimonialFooter';
import TestimonialPreLoader from '@/components/UIElements/Cards/TestimonialCard/TestimonialPreLoader';
import PopUp from '@/components/UIElements/PopUp';
import usePopUp from '@/components/UIElements/PopUp/hooks/usePopUp';
import SectionHeadings from '@/components/UIElements/SectionHeadings';
import Slider from '@/components/UIElements/Slider';
import useSliderData from '@/components/UIElements/Slider/hooks/useSliderData';
import SliderNav from '@/components/UIElements/Slider/sliderNav';
import VideoElement from '@/components/UIElements/VideoElement';
import { appendAssetUrl } from '@/utils';
import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

export interface ITestimonials {
  testimonials: ITestimonialData[];
  title: string;
  subTitle: string;
}

export interface ITestimonialsListResponse {
  data: ITestimonialData[];
  meta: IPageMeta;
}

type TestimonialProps = { title: string; subTitle: string, apiUrl: string };

const Testimonials = ({ title, subTitle, apiUrl }: TestimonialProps) => {
  const [loading, setLoading] = useState(false);
  const [testimonialsListData, setTestimonialsListData] = useState<ITestimonialPageData>({} as ITestimonialPageData);
  const [allArticlesList, setAllArticlesList] = useState<ITestimonialData[]>([] as ITestimonialData[]);
  const { showPopUp, hidePopUp, poupState } = usePopUp();
  const [dotsToDisplay, setDotsToDisplay] = useState<number[]>([]);
  const { totalPages, incrementPage, decrementPage, pageNum, scrollAmt } = useSliderData({
    slideId: 'testimonial-listing',
    sliderData: allArticlesList,
    cardSpacing: window.innerWidth >= 1280 ? 30 : 20,
  });
  const [popUpData, setPopUpData] = useState<ITestimonialAttributes>();

  const initialApiCall = async () => {
    setLoading(true);
    const res = await getTestimonials(apiUrl.replace('<pageNo>', '1')
      .replace('<pageSize>', '8'));
    if (res.status) {
      setTestimonialsListData(res?.res as ITestimonialPageData);
      setAllArticlesList(res?.res?.data ?? []);
      const initalDots = res?.res?.data?.map((_: unknown, index: number) => {
        return index;
      });
      setDotsToDisplay(initalDots || []);
      setLoading(false);
    }
  };

  useEffect(() => {
    initialApiCall();
  }, []);

  const getTestimonialData = async () => {
    const currentPage = testimonialsListData?.meta?.pagination?.page || 0;
    const res = await getTestimonials(apiUrl.replace('<pageNo>', (currentPage + 1).toString())
      .replace('<pageSize>', '8'));
    if (res?.status) {
      setTestimonialsListData(res?.res as ITestimonialPageData);
      setAllArticlesList((prev: ITestimonialData[]) => {
        return [...prev, ...res?.res?.data ?? []];
      });
    }
  };

  const handleIncrementPage = () => {
    incrementPage();
    if (allArticlesList?.length !== testimonialsListData?.meta?.pagination?.total) getTestimonialData();
  };

  const dotsArray: number[] = allArticlesList?.map((_: unknown, index: number) => {
    return index;
  });

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      incrementPage();
      const currentPage = pageNum + 1;
      if (allArticlesList?.length > 0) {
        if (
          currentPage + 1 === allArticlesList.length - 2 &&
          allArticlesList?.length !== testimonialsListData?.meta?.pagination?.total
        )
          getTestimonialData();
      }

      if (pageNum % 7 === 0 && pageNum <= allArticlesList?.length) {
        const slicedArray = dotsArray.slice(pageNum, pageNum + 8);
        setDotsToDisplay(slicedArray);
      }
    },
    onSwipedRight: () => {
      decrementPage();
      if (pageNum % 8 === 0 && pageNum > 0) {
        const slicedArray = dotsArray.slice(pageNum - 8, pageNum);
        setDotsToDisplay(slicedArray);
      }
    },
  });

  const showVideoPopUP = (videoData: ITestimonialAttributes) => {
    setPopUpData(videoData);
    showPopUp();
  };

  const getVideoUrl = (media_url: MediaUrl | undefined) => {
    const mediaObj = media_url?.data?.find((item) => { return item.attributes.ext === '.mp4'; });
    return appendAssetUrl(mediaObj?.attributes?.url ?? '');
  };

  const getContentType = (attributes: ITestimonialAttributes) => {
    const mediaObj = getVideoUrl(attributes?.media_url);
    return mediaObj ? 'video' : 'text';
  };

  return (
    allArticlesList?.length ?
      <section className="w-full bg-primary-white overflow-x-hidden">
        <SectionContainer cssClass="!px-[0px] pt-10 md:pt-[80px]">
          <div className="flex items-end justify-between md:pr-[48px] lg:pr-[80px]">
            <div className="md:max-w-[70%] xl:max-w-none px-[24px] md:px-[48px] lg:px-[80px]">
              <SectionHeadings title={title} subTitle={subTitle} />
            </div>
            <div className="items-center hidden md:flex md:mb-[8px] flex-shrink-0">
              <div>
                <SliderNav handleOnClick={decrementPage} cssClass="mr-[16px] bg-[#f3f3f3] disabled:bg-[#f3f3f3]"
                  disable={pageNum === 0} leftNav />
                <SliderNav handleOnClick={handleIncrementPage} cssClass='bg-[#f3f3f3] disabled:bg-[#f3f3f3] '
                  disable={(pageNum === totalPages - 1)} />
              </div>
            </div>
          </div>
          {/* eslint-disable react/jsx-props-no-spreading */}
          <div className="pt-[40px] md:pt-[48px] md:pl-[48px] lg:pl-[80px]" {...handlers}>
            <Slider
              scrollPercent={`${-scrollAmt}px`}
              id="testimonial-listing"
              pageNum={pageNum}
              slideParentClass="!justify-start md:gap-[20px] xl:gap-[30px]"
              loading={loading}
              loadingUI={<TestimonialPreLoader />}
              slideClass="!w-[100%] !px-[0px] md:px-[15px] !min-w-[100%]
                w-full md:!min-w-[380px] md:!max-w-[380px]"
            >
              {(allArticlesList ?? []).map(({ attributes, id }) => {
                return (
                  <TestimonialCard
                    handleOnClick={showVideoPopUP}
                    id={id}
                    attributes={attributes}
                    key={id}
                    type={getContentType(attributes)}
                  />
                );
              })}
            </Slider>
            <MobilePagination
              className='bg-white-fixed'
              dotsToDisplay={dotsToDisplay}
              pageNum={pageNum}
              pageMeta={testimonialsListData?.meta && testimonialsListData?.meta}
            />
          </div>
          <PopUp
            onClose={hidePopUp}
            showPopuUp={poupState}
            body={
              <VideoElement
                cssClass={'object-cover absolute h-full top-0'}
                poster=""
                src={getVideoUrl(popUpData?.media_url)}
              />
            }
            header={
              <TestimonialFooter
                college_photo={appendAssetUrl(popUpData?.icon?.data?.[0]?.attributes?.url ?? '')}
                name={popUpData?.name ?? ''}
                college={popUpData?.college ?? ''}
                caption={popUpData?.profile_picture?.data?.attributes?.caption ?? ''}
                url={popUpData?.profile_picture?.data?.attributes?.url ?? ''}
                alternativeText={popUpData?.profile_picture?.data?.attributes?.alternativeText ?? ''}
              />
            }
          />
        </SectionContainer>
      </section>
      : ''
  );
};

export default Testimonials;
