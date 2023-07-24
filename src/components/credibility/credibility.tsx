import React from "react";
import SubTitle from "../home-contents/SubTitle";
import TitleWrapper from "../home-contents/Title";
import Description from "../home-contents/Description";

const Credibility = ({description}:{description: string}) => {

    return (
      <div className={`mt-10`}>
        <div>
          <SubTitle subtitle="Credibility" />
          <TitleWrapper title={`We are <span class='gradient-text'> Liscenced,</span> </br> we are CICC members!`} />
          <Description
            cssClass="mt-6"
            description={`It is good to seek guidance from an immigration consultant while planning for Canada. Still, it is exceptional to hire a licensed consultant who is a member of The College of Immigration and Citizenship Consultants (CICC) ensuring an unparalleled level of trust and credibility.<br></br> With more than a decade of extensive experience, CICC members have gained enough experience to handle your immigration needs, making them the most reliable choice for a seamless and successful process.`}
          />
        </div>
        <div>
            
        </div>
      </div>
    );

}

export default Credibility;

