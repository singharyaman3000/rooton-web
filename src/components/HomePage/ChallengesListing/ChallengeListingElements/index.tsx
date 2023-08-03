import ReactHtmlParser from 'react-html-parser';

export const AccordionHeader = ({ value }: { value: string }) => (
  <div className="flex-shrink-0 line-clamp-3 pt-[11px] pb-[11px] md:pt-[12px] md:pb-[12px]">
    {ReactHtmlParser(value)}
  </div>
);

export const AccordionBody = ({ value }: { value: string }) => (
  <div className="pb-[10px] md:pb-[12px]">{ReactHtmlParser(value)}</div>
);
