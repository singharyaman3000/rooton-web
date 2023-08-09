type ServiceDescriptionProps = {
  text: string;
};

export const ServiceDescription = ({ text }: ServiceDescriptionProps) => {
  return <p className=" text-sm font-medium leading-primary lg:text-lg lg:leading-primary-lg">{text}</p>;
};
