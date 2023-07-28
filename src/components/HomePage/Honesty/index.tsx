import React from 'react';

import Container from '@/components/UIElements/wrapper-container';
import SubTitle from '@/components/home-contents/SubTitle';
import TitleWrapper from '@/components/home-contents/Title';
import Description from '@/components/home-contents/Description';
import HonestyCard from './honestyCard';

import HonestContentJSON from './honestyContent.json';

const Honesty = () => (
  <>
    <Container cssBgClass="honestyGrid">
      <div className="lg:flex lg:flex-row justify-between mb-11 lg:mb-14">
        <div className="mb-2.5 lg:w-[24.58vw]">
          <SubTitle subtitle={HonestContentJSON?.subtitle} />
          <TitleWrapper title={HonestContentJSON?.title} />
        </div>
        <div className="lg:w-[56.875vw] ">
          <Description cssClass="mt-6" description={HonestContentJSON?.description} />
        </div>
      </div>
    </Container>
    <Container>
      <div className="container mx-auto">
        <div className=" grid grid-cols-1 divide-y border-1 border-white lg:divide-x md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HonestContentJSON?.cards?.map((card) => (
            <HonestyCard key={card?.title} iconUrl={card?.iconUrl} cardDescription={card?.description} cardTitle={card?.title} />
          ))}
        </div>
      </div>
    </Container>
  </>
);

export default Honesty;
