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
    <section className=" bg-pale-yellow pt-10 mt-10">
      <div className="px-5">
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
      </div>
      <div className="mt-8 aspect-square relative">
        <NextImage src={imageUrl} altText={imageAlt} sizes="30vw" title="??" fill />
      </div>
    </section>
  );
};
