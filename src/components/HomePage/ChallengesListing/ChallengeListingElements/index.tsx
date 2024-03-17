import ReactHtmlParser from 'react-html-parser';

export const AccordionHeader = ({ value, index }: { value: string; index?: number }) => {
  return (
    <div
      className={`flex-shrink-0 max-w-[calc(100%_-_5px)] cursor-pointer text-left text-sm
      md:text-lg font-bold not-italic leading-[normal] tracking-[normal] text-primary-font-color
      pt-[11px] pb-[11px] ${index !== undefined && index === 0 ? 'md:pt-0' : 'md:pt-[12px]'}
      md:pb-[12px]`}
    >
      {ReactHtmlParser(value)}
    </div>
  );
};

export const AccordionBody = ({ value, containerWidth, fontSizeMd }: { value: string, containerWidth?: string, fontSizeMd?: string }) => {return (
  <div className={`pb-[10px] ${containerWidth || 'max-w-[80%]'}   text-left  md:pb-[12px] pr-[28px] md:pr-[34px] ${fontSizeMd || 'md:text-base' } text-xs font-normal not-italic leading-[1.67] tracking-[normal]`}>
    {ReactHtmlParser(value)}
  </div>
);};
