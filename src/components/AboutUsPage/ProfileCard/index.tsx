import NextImage from '@/components/UIElements/NextImage';

interface ProfileCardProps {
  name: string;
  title: string;
  imageSrc: string;
  description: string;
}

const ProfileCard = ({ name, title, imageSrc, description }: ProfileCardProps) => {
  return (
    <div className="card-hover-effect relative mb-4 w-80 flex flex-col border border-solid border-almond bg-white cursor-pointer">
      <div className="w-80 h-[360px] relative">
        <NextImage
          src={imageSrc}
          altText={`Image of ${name}`}
          fill
          sizes="100vw"
          style={{ objectFit: 'contain' }}
          title={`Image of ${name}`}
        />
      </div>
      <div className="py-[26px] pl-7 pr-2">
        <h5 className="mb-1.5 text-black font-bold text-[22px] leading-normal">{name}</h5>
        <p className="text-black opacity-50 text-sm font-semibold leading-heading tracking-[2px]">{title}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
