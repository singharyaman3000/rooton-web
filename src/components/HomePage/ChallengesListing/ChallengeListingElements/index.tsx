export const AccordionHeader = ({ value }: { value: string }) => (
  <div className="flex-shrink-0 ml-[10px] line-clamp-3 pt-[16px] pb-[19px] md:pt-[12px] md:pb-[12px]">{value}</div>
);

export const AccordionBody = ({ value }: { value: string }) => <div className="pb-[18px] md:pb-[0px]">{value}</div>;
