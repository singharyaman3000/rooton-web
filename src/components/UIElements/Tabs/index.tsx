'use client';
import React from 'react';
import TabHeader, { ITabData, ITabHeader } from './TabsHeader';
import NextImage from '../NextImage';
import TabOverlay from '../../../../public/images/overlay/services-tab-overlay.png';

export type ITabs = Pick<ITabHeader, 'headerData'> & {
  cssClass?:string;
  tabBody :React.ReactNode[];
  selectedTab : ITabData;
  onTabChange : (selectedTabData:ITabData)=>void
};

const Tabs = ({ headerData  , cssClass , tabBody  , onTabChange , selectedTab}: ITabs) => {

  return (
    <div className={cssClass}>
      <TabHeader
        selectedTab={selectedTab as ITabData}
        handleOnClick={(selectedTab) => onTabChange(selectedTab)}
        headerData={headerData}
      />
      <div className="min-h-[28.125rem] mt-[15px] bg-pale-yellow relative">
        <div className="w-[67%] p-[24px] flex items-center flex-wrap justify-between">
           {tabBody.map((body)=>{
             return <div>{body}</div>
           })}
        </div>
        <div className="absolute top-0 w-[20.875rem] h-full right-0">
          <NextImage src={TabOverlay} fill={true} altText="" title="" sizes="100vw" style={{ objectFit: 'contain' }} />
        </div>
      </div>
    </div>
  );
};

export default Tabs;
