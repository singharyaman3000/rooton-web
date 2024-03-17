/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FC } from 'react';
import NextImage from '@/components/UIElements/NextImage';
import { useParams, useRouter } from 'next/navigation';

export interface IWhyRootON {
  key: string;
  unique_identifier_name?: string;
  title?: string;
  value: string;
  position: number;
  description?: string;
  icon?: string;
  iconComponent?: FC;
  containerClass?: string;
  label?: string;
}

const HonestyCard = ({
  title,
  icon,
  description,
  value,
  unique_identifier_name,
  containerClass,
  label,
  iconComponent: IconComponent,
}: IWhyRootON) => {
  const params = useParams();
  const router = useRouter();

  const checkLoginAndNavigate = () => {
    const isLoggedIn = !!localStorage.getItem('token');

    if (!isLoggedIn) {
      const loginUrl = params.lang ? `/${params.lang}/login` : '/login';
      router.push(loginUrl);
    } else {
      const toolPage = params.lang ? `/${params.lang}/${unique_identifier_name}` : `/${unique_identifier_name}`;
      router.push(toolPage);
    }
  };

  return (
    <div className={`${containerClass} honestyCard flex flex-col sm:p-4 bg-primary`}>
      <style jsx>{`
        .honestyCard:hover .imageContainer {
          filter: blur(10px);
        }

        .honestyCard:hover .tool-image-container {
          filter: blur(10px);
        }

        .honestyCard:hover .textContainer {
          filter: blur(10px);
        }

        .honestyCard:hover .overlay {
          display: flex;
          flex-direction: column;
        }

        .useNowButton {
          position: relative;
          display: flex;
          align-content: center;
          background-color: #000;
          border-radius: 2%;
          transition: all 0.3s ease;
          line-height: 1.5;
          justify-content: center;
          width: fit-content;
          margin: auto;
        }

        .overlay {
          display: none;
          position: absolute;
          top: 45%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 20px 15px;
          background-color: #cbcbcb45;
          border-radius: 1%;
          transition: all 0.3s ease;
          margin: 8px auto auto;
          width: 100%;
          max-width: 25rem;
          height: 220px;
        }

        .overlayText {
          font-size: 15px;
          font-weight: 600;
        }

        .useNowButton:hover,
        .useNowButton:focus {
          background-color: #191919c7;
        }

        .imageContainer {
          position: relative;
          width: 250px;
          height: 160px;
          margin: auto;
        }
        .tool-image-container {
          box-shadow:
            0 2px 4px 0 rgba(0, 0, 0, 0.13),
            0 1px 1px 0 rgba(0, 0, 0, 0.11);
          position: relative;
          width: 100%;
          max-width: 25rem;
          height: 200px;
          margin: auto;
          background: #fff;
        }
        .link {
          display: flex;
          width: fit-content;
          margin: auto;
        }
      `}</style>
      <div className="align-items-center honestyCard flex flex-col justify-center bg-primary">
        <div className="relative w-[100%] h-[100%]">
          <div className="tool-image-container rounded-sm">
            <div className="imageContainer">
              {icon ? (
                <NextImage
                  sizes={'30vw'}
                  src={`${process.env.NEXT_ASSETS_BASEURL}${icon}`}
                  title={'icon image123'}
                  fill
                  style={{ objectFit: 'contain' }}
                  altText={title || 'icon image'}
                />
              ) : null}
              {IconComponent ? <IconComponent /> : null}
            </div>
            <div className="textContainer text-center font-bold text-black">{label}</div>
          </div>
          <div className="overlay pricing-text gap-[20px]">
            <div className="overlayText text-justify h-[120px] text-black">{description && description}</div>
            <span className="link">
              <div onClick={checkLoginAndNavigate}>
                <span className="useNowButton text-white cursor-pointer background-primary-black px-5 py-3 text-14">
                  {' '}
                  Use now
                </span>
              </div>
            </span>
          </div>
        </div>
      </div>
      <h3
        className="text-primary-font-color line-clamp-3 w-[80%] mb-4
      text-xl md:text-[22px] leading-[1.5] md:leading-[1.36] font-bold leading-6 tracking-normal"
      >
        {title}{' '}
      </h3>
      <p
        className="text-sm md:text-base font-[500] leading-[1.71]
      md:leading-[1.63] md:opacity-[0.68] text-primary-font-color"
      >
        {value}
      </p>
    </div>
  );
};

export default HonestyCard;
