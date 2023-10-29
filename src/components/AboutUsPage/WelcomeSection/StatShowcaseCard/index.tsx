import ReactHtmlParser from 'react-html-parser';

interface StatShowcaseCardProps {
  statValue: number | string;
  plusSign?: boolean;
  statText: string;
}

const StatShowcaseCard = ({ statValue, statText, plusSign = true }: StatShowcaseCardProps) => {

  return (
    <>
      <strong className='mb-1 text-[58px] font-extrabold text-golden-honey'>{statValue}{plusSign && '+'}</strong>
      <p className='mb-5 text-lg font-bold leading-primary-lg text-black'>{ReactHtmlParser(statText)}</p>
      <div className="w-full h-px bg-smoky-steel" />
    </>
  );
};

export default StatShowcaseCard;
