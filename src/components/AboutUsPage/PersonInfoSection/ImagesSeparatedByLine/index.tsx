import NextImage from '@/components/UIElements/NextImage';

interface ImagesSeparatedByLineProps {
  cssClass: string;
  imagesUrl: string[];
}

const ImagesSeparatedByLine = ({ imagesUrl, cssClass }: ImagesSeparatedByLineProps) => {
  const imagesCount = imagesUrl.length;

  return (
    <ul className={cssClass}>
      {imagesUrl.map((imagePath, index) => {
        return (
          <>
            <li
              key={imagePath}
              className={`relative w-52 h-[57px] mb-9 md:mb-0 mx-0 md:mx-10 ${index === 0 && '!ml-0'} ${
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
            {index !== imagesCount - 1 ? (
              <div className="hidden w-[1px] h-[57px] bg-border-footer-gray md:block" />
            ) : null}
          </>
        );
      })}
    </ul>
  );
};

export default ImagesSeparatedByLine;
