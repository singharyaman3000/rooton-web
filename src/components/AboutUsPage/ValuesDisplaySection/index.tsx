import { FC } from 'react';

import Description from '@/components/UIElements/Description';
import HonestyCard from '@/components/HomePage/Honesty/honestyCard';
import ReactHtmlParser from 'react-html-parser';

interface ValuesDisplaySectionProps {
  heading: string;
  description: string;
  valuesList: {
    key: string;
    iconComponent: FC;
    value: string;
    position: number;
  }[];
}

const ValuesDisplaySection = ({ heading, description, valuesList }: ValuesDisplaySectionProps) => {
  return (
    <section className="my-20 m-auto max-w-screen-2k px-6 md:px-10 lg:px-20">
      <h2
        className={
          'max-w-[340px] md:max-w-none md:text-5xl gradient-text text-primary-text font-extrabold not-italic !leading-[1.42] tracking-[normal] text-[1.75rem] mb-5 md:mb-9'
        }
      >
        {ReactHtmlParser(heading)}
      </h2>
      <Description cssClass="!text-primary-font-color mb-3" description={description} />
      <div className="mb-6  lg:mb-[69px]">
        <div className="honestyBackground honestycard grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px]">
          {valuesList.map(({ key, value, iconComponent, position }) => {
            return (
              <HonestyCard
                key={key}
                title={key}
                value={value}
                iconComponent={iconComponent}
                position={position}
                containerClass="lg:!py-[31px]"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValuesDisplaySection;
