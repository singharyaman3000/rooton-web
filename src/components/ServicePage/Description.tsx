type ServiceDescriptionProps = {
  text: string;
};

export const ServiceDescription = ({ text }: ServiceDescriptionProps) => {
  return <p className=" text-sm font-medium leading-primary">{text}</p>;
};
