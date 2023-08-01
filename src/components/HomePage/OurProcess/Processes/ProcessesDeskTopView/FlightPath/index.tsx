import NextImage from '@/components/UIElements/NextImage';
import React from 'react';
import flightPath from '../../../../../../../public/images/overlay/flightPath.png';

const FlightPath = () => {
  return (
    <div className="w-[1px] h-full absolute top-0 left-[calc(35%_-_-39px)]">
      <NextImage src={flightPath} fill altText="" title="" sizes="100vw" />
    </div>
  );
};

export default FlightPath;
