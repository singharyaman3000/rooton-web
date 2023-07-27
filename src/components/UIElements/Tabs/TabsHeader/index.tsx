import React from 'react';
import NextImage from '../../NextImage';

export interface ITabData {
  service: string;
  icon: string;
  services: string[];
}
export interface ITabHeader {
  headerData: ITabData[];
  handleOnClick: (tabData: ITabData) => void; // eslint-disable-line no-unused-vars
  selectedTab: ITabData;
}

const TabHeader = ({ headerData, handleOnClick, selectedTab }: ITabHeader) => {
  return (
    <div className="flex items-center">
      {headerData.map(({ icon, service, services }) => {
        return (
          <button
            type="button"
            onClick={() => handleOnClick({ icon, service, services })}
            className={`p-[15px] text-primary-text  w-[180px] flex items-center flex-col ${
              service === selectedTab.service ? 'bg-primary-black text-primary-white' : ''
            }`}
            key={service}
            aria-label={service}
          >
            <div className="relative square-[30px] mb-[8px]">
              <NextImage
                sizes="100vw"
                altText={`${service}-icon`}
                title={`${service}-icon`}
                src={icon}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="text-lg not-italic leading-[normal] tracking-[normal] text-center">{service}</div>
          </button>
        );
      })}
    </div>
  );
};

export default TabHeader;
