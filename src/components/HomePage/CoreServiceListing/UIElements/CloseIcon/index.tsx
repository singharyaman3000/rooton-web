import React from 'react';
import CloseIcon from '@/components/Icons/MobileCoreServicesCloseIcon';

const CloseIconButton = ({ onClick, cssClass }: { onClick: () => void, cssClass?:string }) => {
  return (
    <button
      type="button"
      className={`w-fit ${cssClass}`}
      onClick={() => {
        onClick();
      }}
      aria-label="Close"
    >
      <CloseIcon />
    </button>
  );
};

export default CloseIconButton;
