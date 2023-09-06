import { H2 } from '../H2';

type WhyRootonProps = {
  title: string;
  description: string;
};

export const WhyRooton = ({ title, description }: WhyRootonProps) => {
  return (
    <section className="">
      <H2>{title}</H2>
      <p
        className="
        font-medium
        text-sm
        leading-primary
        text-font-color-light-gray
        lg:text-lg
      "
      >
        {description}
      </p>
    </section>
  );
};
