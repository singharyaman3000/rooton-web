import { ISubServicesContent } from '@/app/services/apiService/serviceAPI';
import { WhyChoose } from '../WhyChoose';

type WhyChooseRootonSectionProps = {
  whyChooseOpen?: ISubServicesContent;
  handleCTAButtonClick: () => void;
};

const WhyChooseRootonSection = ({ whyChooseOpen, handleCTAButtonClick }: WhyChooseRootonSectionProps) => {
  if (whyChooseOpen) {
    return (
      <WhyChoose
        onClickCTA={handleCTAButtonClick}
        title={whyChooseOpen?.attributes.title ?? ''}
        description={whyChooseOpen?.attributes.description ?? ''}
        imageAlt="A man with laptop"
        imageUrl="/group-14-copy@3x.png"
      />
    );
  }

  return null;
};

export default WhyChooseRootonSection;
