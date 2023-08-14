import React from 'react';
import CloseIcon from '@/components/Icons/MobileCoreServicesCloseIcon';

const CloseIconButton = ({ onClick, cssClass }: { onClick: () => void, cssClass?:string }) => {
  return (
    <button
      type="button"
      className={`w-full flex justify-end ${cssClass}`}
      onClick={() => {
        onClick();
      }}
    >
      <CloseIcon />
    </button>
  );
};

export default CloseIconButton;
