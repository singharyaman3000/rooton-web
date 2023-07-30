import { H2 } from '../H2';

type WhyRootonProps = {
  title: string;
  description: string;
};

export const WhyRooton = ({ title, description }: WhyRootonProps) => {
  return (
    <section className=" mt-20">
      <H2>{title}</H2>
      <p
        className="
        mt-8
        font-medium
        text-sm
        leading-primary
        text-font-color-light-gray
      "
      >
        {description}
      </p>
    </section>
  );
};
