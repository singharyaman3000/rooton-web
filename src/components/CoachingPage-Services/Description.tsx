type CoachingDescriptionProps = {
  text: string;
};

export const CoachingDescription = ({ text }: CoachingDescriptionProps) => {
  return <p className=" text-sm font-medium leading-primary lg:text-lg lg:leading-primary-lg">{text}</p>;
};
