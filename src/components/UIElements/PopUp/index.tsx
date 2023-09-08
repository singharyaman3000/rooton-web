import React, { ReactElement } from 'react';
import PopUpOverlayWrapper from './PopUpOverLayWrapper';

export interface IPopUp {
  header: string | ReactElement;
  body: ReactElement;
  showPopuUp: boolean;
  onClose: () => void;
}

const PopUp = ({ header, body, showPopuUp, onClose }: IPopUp) => {
  return (
    <PopUpOverlayWrapper onClose={onClose} showPopUp={showPopuUp}>
      <div className="p-[20px] popup w-[90vw] md:w-[60vw] rounded-sm  max-w-[600px] ">
        <div className="mb-[10px] justify-between flex items-center">
          {typeof header === 'string' ? <h4>{header}</h4> : header}{' '}
          <div>
            <button type="button" onClick={onClose} aria-label="close popup">
              <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40">
                <path d="m251.333-204.667-46.666-46.666L433.334-480 204.667-708.667l46.666-46.666L480-526.666l228.667-228.667 46.666 46.666L526.666-480l228.667 228.667-46.666 46.666L480-433.334 251.333-204.667Z" />
              </svg>
            </button>
          </div>{' '}
        </div>
        <div className="flex w-full justify-center items-center min-h-[550px] max-h-[500px] relative">{body}</div>
        <div></div>
      </div>
    </PopUpOverlayWrapper>
  );
};

export default PopUp;
