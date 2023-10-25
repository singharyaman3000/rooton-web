'use client';

import React, { Dispatch, RefObject, SetStateAction, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import useSelectedTabPosition from '../hooks/useGetTabPosition';

export type TabType = { key: number; label: string; id: string };

type TextTabsPropType = {
  onChange: (tab: TabType) => void;
  tabs: TabType[];
};

const TextTabs: React.FC<TextTabsPropType> = ({ onChange, tabs }) => {
  const refs = useMemo(() => {
    return tabs.map(() => React.createRef<HTMLDivElement>());
  }, [tabs]);

  const [selectedTab, setSelectedTab] = useState<{
    tab: TabType;
    currentRef: RefObject<HTMLDivElement>;
  }>({ tab: tabs[0], currentRef: refs[0] });

  const { fromLeft } = useSelectedTabPosition(selectedTab.currentRef);

  return (
    <div className="relative w-full flex items-cente py-[18px]">
      {tabs.map((data, index) => (
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
          className="px-4 md:px-6 whitespace-nowrap text-[16px] cursor-pointer last:pr-0"
          onClick={() => {
            setSelectedTab({ tab: data, currentRef: refs[index] });
            onChange(data);
          }}
        >
          {data.label}
        </motion.div>
      ))}
      <div
        className="absolute h-[2.8px] w-[25px] bg-amber-400 bottom-0 transition-all  duration-1700"
        style={{ left: fromLeft }}
      ></div>
    </div>
  );
};

export default TextTabs;
