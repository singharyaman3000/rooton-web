export const AccordionHeader = ({ value }: { value: string }) => (
  <div className="pt-[16px] pb-[19px] md:py-[24px]">{value}</div>
);

export const AccordionBody = ({ value }: { value: string }) => <div className="pb-[18px] md:pb-[24px]">{value}</div>;
