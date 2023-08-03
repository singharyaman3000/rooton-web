import { H2 } from '../H2';
import NextImage from '../UIElements/NextImage';

type WhyChooseProps = {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
};

export const WhyChoose = ({ title, description, imageAlt, imageUrl }: WhyChooseProps) => {
  return (
    <section
      className="
        bg-pale-yellow-black
        pt-10
        mt-10
        lg:flex
        lg:gap-20
        lg:flex-row-reverse
        lg:pt-0
        "
    >
      <div
        className="
        px-5
        lg:pt-20
        lg:pb-[60px]
        lg:pr-20
        xl:pr-20
      "
      >
        <H2>{title}</H2>
        <p
          className="
            mt-8
            font-medium
            text-sm
            leading-primary
            text-font-color-light-gray
            lg:text-base
            lg:mt-5
            lg:font-medium
            xl:text-lg
            lg:leading-primary-lg
            "
        >
          {description}
        </p>
      </div>
      <div className="mt-8 aspect-square relative lg:flex-shrink-0 sm:w-[380px] lg:w-[480px] lg:h-[560px]">
        <NextImage src={imageUrl} altText={imageAlt} sizes="30vw" title="??" fill />
      </div>
    </section>
  );
};
