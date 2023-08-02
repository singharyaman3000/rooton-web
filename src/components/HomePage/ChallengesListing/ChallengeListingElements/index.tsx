export const AccordionHeader = ({ value }: { value: string }) => (
  <div className="flex-shrink-0 md:ml-[10px] line-clamp-3 pt-[16px] pb-[19px] md:py-[24px]">{value}</div>
);

export const AccordionBody = ({ value }: { value: string }) => <div className="pb-[18px] md:pb-[24px]">{value}</div>;
