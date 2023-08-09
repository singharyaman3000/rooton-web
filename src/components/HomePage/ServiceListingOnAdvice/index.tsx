import React from "react";
import ListWrapper from "./ListWrapper";

export interface IserviceList {
    serviceType: string,
    services:string[]
}

const ServiceListingOnAdvice = () => {
    const serviceListObjectStructure = [
      {
        serviceType: 'Temporary residence',
        services: [
          'Study Visa',
          'Closed Work Permit (LMIA Based)',
          ' Open Work Permit (LMIA Based)',
          'Visitor Visa',
          'Super Visa',
          'Study Permit Extension',
          'Post-graduation Work Permit',
          'Post-graduation Work Permit',
          'CAQ Extension',
          'Bridging Open Work Permit',
          'TRV for Inside Canada Permit',
          'Co-op Work Permit',
        ],
      },
      {
        serviceType: 'Permanent Residence',
        services: ['Express Entry - FSW', 'Express Entry CEC', 'Express Entry - FSTP', 'PNP', 'QSWP'],
      },
      {
        serviceType: 'Family Sponsorship',
        services: ['Parents & grandparents', 'Spousal Sponsorship'],
      },
      {
        serviceType: 'Business Immigration',
        services: ['Start-up Visa', 'Self - Employed', 'Investors', 'Entrepreneurs', 'Provincial Nomination Program'],
      },
      {
        serviceType: 'Business Immigration',
        services: ['Start-up Visa', 'Self - Employed', 'Investors', 'Entrepreneurs', 'Provincial Nomination Program'],
      },
      {
        serviceType: 'Business Immigration',
        services: ['Start-up Visa', 'Self - Employed', 'Investors', 'Entrepreneurs', 'Provincial Nomination Program'],
      },
      {
        serviceType: 'Business Immigration',
        services: ['Start-up Visa', 'Self - Employed', 'Investors', 'Entrepreneurs', 'Provincial Nomination Program'],
      },
    ];
      const getServiceListing = ():any => {
        const serviceListright:IserviceList[] = []
        const serviceListLeft: IserviceList[] = []
        serviceListObjectStructure.map((listItem, index)=>{
            if(index % 2 === 0) serviceListLeft.push(listItem);
            else serviceListright.push(listItem);
        }) 
        const serviceList = [[...serviceListLeft],[...serviceListright]]
        console.log(serviceList)
        return serviceList.map(serviceListIem => {
            return <ListWrapper listContent={serviceListIem}/>
        })
      }
    return (
      <div className="w-[703px] h-[741px] shadow-lg bg-white pl-9 pt-[41px] pb-[36px]">
          <h1 className="mb-10 text-[22px] tracking-normal font-bold text-black ">Select a service for which you need advice on.</h1>
          <div className="servicesListingOnAdvice flex flex-row gap-[6.8vw] overflow-y-scroll h-[590px]">
           {getServiceListing()}
          </div>
      </div>
    );
}

export default ServiceListingOnAdvice