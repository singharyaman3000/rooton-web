import NextImage from '@/components/UIElements/NextImage';

interface ImagesSeparatedByLineProps {
  cssClass: string;
  imagesUrl: string[];
}

const ImagesSeparatedByLine = ({ imagesUrl, cssClass }: ImagesSeparatedByLineProps) => {
  const imagesCount = imagesUrl.length;
  const isDesktopScreen = window.innerWidth > 767; // needs page refresh while screen size change

  return (
    <ul className={cssClass}>
      {imagesUrl.map((imagePath, index) => {
        return (
          <>
            <li
              key={imagePath}
              className={`relative w-52 h-[57px] ${isDesktopScreen ? 'mx-10' : 'mb-9'} ${index === 0 && '!ml-0'} ${
                index === imagesCount - 1 && '!mr-0'
              }`}
            >
              <NextImage
                src={imagePath}
                altText={'Certification Image'}
                fill
                sizes="100vw"
                style={{ objectFit: 'contain' }}
                title={'Certification Image'}
              />
            </li>
            {index !== imagesCount - 1 && isDesktopScreen ? (
              <div className="w-[1px] h-[57px] bg-border-footer-gray" />
            ) : null}
          </>
        );
      })}
    </ul>
  );
};

export default ImagesSeparatedByLine;
