import React from "react";

import SubTitle from "@/components/home-contents/SubTitle";
import TitleWrapper from "@/components/home-contents/Title";

import PartnerShipContentJson from './partnerShipContent.json'
import Container from "@/components/UIElements/wrapper-container";
import ImageCard from "./imageCard";

const PartnerShip = () => {
    return (
      <>
        <Container>
          <div>
            <SubTitle subtitle={PartnerShipContentJson?.subtitle} />
            <TitleWrapper title={PartnerShipContentJson?.title} />
          </div>
        </Container>
        <Container cssBgClass="honestyGrid">
            <div className=" grid grid-cols-2 justify-items-center content-center items-center border-1 md:grid-cols-3 lg:grid-cols-4 gap-20">
              {PartnerShipContentJson?.imageCards?.map((card) => <ImageCard imageUrl={card?.url} title={card?.title}/>)}
            </div>
        </Container>
      </>
    );
}

export default PartnerShip