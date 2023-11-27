'use client';

import CountUp from 'react-countup';
import ReactHtmlParser from 'react-html-parser';

interface StatShowcaseCardProps {
  statValue: number;
  plusSign?: boolean;
  statText: string;
}

const StatShowcaseCard = ({ statValue, statText, plusSign = true }: StatShowcaseCardProps) => {
  return (
    <>
      <strong className="mb-1 text-[58px] font-extrabold text-golden-honey">
        <CountUp
          suffix={plusSign ? '+' : ''}
          enableScrollSpy={false}
          useEasing={false}
          start={0}
          end={statValue}
          delay={0}
          duration={2}
        />
      </strong>
      <p className="mb-5 text-lg font-bold leading-primary-lg text-primary-font-color">{ReactHtmlParser(statText)}</p>
    </>
  );
};

export default StatShowcaseCard;
