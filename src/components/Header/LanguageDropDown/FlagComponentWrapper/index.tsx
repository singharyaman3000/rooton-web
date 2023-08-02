import FranceFlagIcon from '@/components/Icons/FranceFlagIcon';
import GermanyFlagIcon from '@/components/Icons/GermanyFlagIcon';
import IndiaFlagIconSm from '@/components/Icons/IndiaFlagIconSm';
import ItalyFlagIcon from '@/components/Icons/ItalyFlagIcon';
import PortugalFlagIcon from '@/components/Icons/PortugalFlagIcon';
import SpainflagIcon from '@/components/Icons/SpainflagIcon';
import UKFlagIcon from '@/components/Icons/UKFlagIcon';
import React from 'react';

const FlagItems = [
  {
    component: <UKFlagIcon />,
    label: 'English',
  },
  {
    component: <FranceFlagIcon />,
    label: 'French',
  },
  {
    component: <SpainflagIcon />,
    label: 'Spanish',
  },
  {
    component: <GermanyFlagIcon />,
    label: 'German',
  },
  {
    component: <ItalyFlagIcon />,
    label: 'Italian',
  },
  {
    component: <IndiaFlagIconSm />,
    label: 'Punjabi',
  },
  {
    component: <IndiaFlagIconSm />,
    label: 'Hindi',
  },
  {
    component: <PortugalFlagIcon />,
    label: 'Portuguese',
  },
];

const FlagComponentWrapper = () => {
  return FlagItems?.map((item) => (
    <div className="hover:bg-hover-lang-dropdown" key={item?.label}>
      <span className="mx-[18px] flex gap-2 items-center p-2" key={item?.label}>
        {item?.component}
        <p className=" text-base font-medium">{item?.label}</p>
      </span>
    </div>
  ));
};
export default FlagComponentWrapper;
