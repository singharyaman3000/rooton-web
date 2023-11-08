import { FC } from 'react';

import Description from '@/components/UIElements/Description';
import HonestyCard from '@/components/HomePage/Honesty/honestyCard';
import SubSectionTitle from '@/components/UIElements/SectionHeadings/SubSectiontitle';

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
      <SubSectionTitle cssClass="mb-5 md:mb-9" title={heading} />
      <Description cssClass="!text-black mb-3" description={description} />
      <div className="mb-6  lg:mb-[69px]">
        <div className="honestyBackground honestycard grid grid-cols-1 border-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px]">
          {valuesList.map(({ key, value, iconComponent, position }) => {
            return (
              <HonestyCard key={key} title={key} value={value} iconComponent={iconComponent} position={position} />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValuesDisplaySection;
