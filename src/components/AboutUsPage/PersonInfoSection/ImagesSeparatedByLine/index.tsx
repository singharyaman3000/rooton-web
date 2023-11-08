/* eslint-disable react/no-array-index-key */
import NextImage from '@/components/UIElements/NextImage';

interface ImagesSeparatedByLineProps {
  cssClass: string;
  imagesData: { imageUrl: string; imageWidth?: string; imageHeight?: string; imageAlt?: string }[];
}

const ImagesSeparatedByLine = ({ imagesData, cssClass }: ImagesSeparatedByLineProps) => {
  const imagesCount = imagesData.length;

  return (
    <ul className={cssClass}>
      {imagesData.flatMap((imageInfo, index) => {
        const { imageUrl, imageWidth, imageHeight, imageAlt } = imageInfo;

        const elementToRender = [
          <li
            key={`image-${index}`}
            className={`relative w-52 h-[57px] mb-9 md:!mb-0 mx-0 md:mx-10 ${index === 0 && '!ml-0'} ${
              index === imagesCount - 1 && '!mr-0 !mb-[26px]'
            }`}
            style={
              imageWidth && imageHeight
                ? {
                  width: imageWidth,
                  height: imageHeight,
                }
                : {}
            }
          >
            <NextImage
              src={imageUrl}
              altText={imageAlt || 'Certification Image'}
              fill
              sizes="100vw"
              style={{ objectFit: 'contain' }}
              title={imageAlt || 'Certification Image'}
            />
          </li>,
        ];

        if (index !== imagesCount - 1) {
          elementToRender.push(
            <li key={`divider-${index}`} className="hidden md:block">
              <div style={imageHeight ? { height: imageHeight } : {}} className="w-px h-15 bg-border-footer-gray" />
            </li>,
          );
        }

        return elementToRender;
      })}
    </ul>
  );
};

export default ImagesSeparatedByLine;
