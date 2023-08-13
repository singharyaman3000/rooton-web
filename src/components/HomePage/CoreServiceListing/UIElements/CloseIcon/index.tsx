import React from 'react';
import CloseIcon from '@/components/Icons/MobileCoreServicesCloseIcon';

const CloseIconButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      type="button"
      className="w-full flex justify-end"
      onClick={() => {
        onClick();
      }}
    >
      <CloseIcon />
    </button>
  );
};

export default CloseIconButton;
