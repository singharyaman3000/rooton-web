import React from "react";
import SubTitle from "../home-contents/SubTitle";
import TitleWrapper from "../home-contents/Title";
import Description from "../home-contents/Description";
import ImageCard from "../UIElements/image-card";
import CredibilityContentsJson from './credibilityContents.json'
import Container from "../UIElements/wrapper-container";

const Credibility = () => {

  interface ICredibilitycontent  {
    subtitle:string,
    title:string,
    description:string,
    licenseImages:{imageUrl:string, altText:string, title:string, iconClass: string} []
  }

  const CredibilityContent:ICredibilitycontent = CredibilityContentsJson;

    return (
      <Container>
        <div className="mt-10 md:flex md:justify-between md:w-full xl:max-h-[534px]">
          <div className="w-full md:w-[50vw] xl:w-[40vw] max-w-[576px]">
            <SubTitle subtitle={CredibilityContent?.subtitle} />
            <TitleWrapper title={CredibilityContent?.title} />
            <Description cssClass="mt-6" description={CredibilityContent?.description} />
          </div>
          <div className="flex flex-col gap-6 lg:gap-[52px] mt-8 lg:mt-0 items-center md:w-[27.7vw] max-w-[399px] xl:mr-[120px] lg:h-full">
            {CredibilityContent?.licenseImages?.map((lisenseImage) => (
              <ImageCard
                cssClass="h-[50.7px] sm:w-[80%] md:w-full"
                imageUrl={lisenseImage?.imageUrl}
                sizes={'30vw'}
                title={lisenseImage?.title}
                altText={lisenseImage?.altText}
                iconClass={lisenseImage?.iconClass}
              />
            ))}
          </div>
        </div>
      </Container>
    );

}

export default Credibility;

