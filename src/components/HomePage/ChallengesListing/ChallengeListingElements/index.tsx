import ReactHtmlParser from 'react-html-parser';

export const AccordionHeader = ({ value, index }: { value: string; index?: number }) => {
  return (
    <div
      className={`flex-shrink-0 max-w-[80%] text-left text-sm md:text-lg font-bold not-italic leading-[normal] tracking-[normal] text-primary-font-color line-clamp-3 pt-[11px] pb-[11px] ${
        index !== undefined && index === 0 ? 'md:pt-0' : 'md:pt-[12px]'
      } md:pb-[12px]`}
    >
      {ReactHtmlParser(value)}
    </div>
  );
};

export const AccordionBody = ({ value, containerWidth, fontSizeMd }: { value: string, containerWidth?: string, fontSizeMd?: string }) => (
  <div className={`pb-[10px] ${containerWidth || 'max-w-[80%]'}   text-left  md:pb-[12px] ${fontSizeMd || 'md:text-base' } text-xs font-normal not-italic leading-[1.67] tracking-[normal]`}>
    {ReactHtmlParser(value)}
  </div>
);
<<<<<<< HEAD
=======

export const AccordionBody = ({ value }: { value: string }) => (
  <div className="pb-[10px] max-w-[80%]  text-left  md:pb-[12px] text-xs md:text-lg font-normal not-italic leading-[1.67] tracking-[normal]">{ReactHtmlParser(value)}</div>
);
>>>>>>> f3ded367e4e89ef42b6177c73a1bbc623f7f8faf
