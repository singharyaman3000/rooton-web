'use client';

import React, { RefObject, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import useSelectedTabPosition from '../hooks/useGetTabPosition';

export type TabType = { key: number; label: string; id: string };

type TextTabsPropType = {
  // eslint-disable-next-line no-unused-vars
  onChange: (tab: TabType) => void;
  tabs: TabType[];
};

const TextTabs: React.FC<TextTabsPropType> = ({ onChange, tabs }) => {
  const refs = useMemo(() => {
    return tabs.map(() => {
      return React.createRef<HTMLDivElement>();
    });
  }, [tabs]);

  const [selectedTab, setSelectedTab] = useState<{
    tab: TabType;
    currentRef: RefObject<HTMLDivElement>;
  }>({ tab: tabs[0], currentRef: refs[0] });

  const { fromLeft } = useSelectedTabPosition(selectedTab.currentRef);

  return (
    <div className="relative max-w-[360px] md:max-w-none hideScrollBar overflow-x-auto lg:w-full px-6 xl:pl-20 flex items-cente gap-[27px] md:gap-6 lg:gap-[60px] py-[17px] lg:py-[26px]">
      {tabs.map((data, index) => {
        return (
          <motion.div
            ref={refs[index]}
            key={data.key}
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.3,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className={`whitespace-nowrap font-bold md:text-2xl cursor-pointer ${
              selectedTab.tab.id === data.id ? 'font-bold' : 'font-normal'
            }`}
            onClick={() => {
              setSelectedTab({ tab: data, currentRef: refs[index] });
              onChange(data);
            }}
            title={data.label}
          >
            {data.label}
          </motion.div>
        );
      })}
      <div
        className="absolute h-[2.8px] w-[25px] bg-golden-yellow bottom-0 transition-all  duration-1700"
        style={{ left: fromLeft }}
      ></div>
    </div>
  );
};

export default TextTabs;
