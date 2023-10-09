import { H2 } from '../H2';
import CallIcon from '../Icons/CallIcon';
import RTONButtonBlackThemed from '../RTONButtonBlackThemed';
import NextImage from '../UIElements/NextImage';

type WhyChooseProps = {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  onClickCTA: () => void;
};

export const WhyChoose = ({ title, description, imageAlt, imageUrl, onClickCTA }: WhyChooseProps) => {
  return (
    <section
      className="
        bg-pale-yellow-black
        pt-10
        lg:flex
        lg:gap-20
        lg:flex-row-reverse
        lg:pt-0
        "
    >
      <div
        className="
        px-5
        lg:pt-10
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
        <div
          className="
            mt-5
            lg:mt-[42px]
            lg:w-[189px]
          "
        >
          <RTONButtonBlackThemed
            onClick={onClickCTA}
            ariaLabel="Talk-to-our-Expert"
            text="Talk to our Expert"
            icon={<CallIcon />}
            className=" w-full"
          />
        </div>
      </div>
      <div
        className="
        aspect-square mr-[16px] md:mr-0 mt-5 md:mt-0 lg:aspect-auto relative lg:flex-shrink-0 sm:w-[380px] lg:min-h-[560px] xl:w-[480px] h-auto
      "
      >
        <NextImage src={imageUrl} altText={imageAlt} sizes="30vw" title="??" fill style={{ objectFit: 'cover' }} />
      </div>
    </section>
  );
};
