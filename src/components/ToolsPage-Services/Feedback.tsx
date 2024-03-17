import React from 'react';
import Modal from '@mui/material/Modal';
import FeedbackStepper from './FeedbackStepper';

interface StepperPopupProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onFormSubmit: () => void;
  portalId: string;
  formId: string;
  region: string;
  target: string;
}

const StepperPopup: React.FC<StepperPopupProps> = ({
  isOpen,
  onRequestClose,
  onFormSubmit,
  portalId,
  formId,
  region,
  target,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={onRequestClose}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div
        className="
          p-5
          m-2
          flex
          shadow-hubspot-form-shadow
          border
          border-golden-yellow
          justify-between
          relative
          overflow-scroll
          bg-pale-sandal
          h-[75vh]
          w-[50vh]
        "
      >
        <FeedbackStepper
          region={region}
          portalId={portalId}
          formId={formId}
          target={target}
          onFormSubmit={onFormSubmit}
        />
      </div>
    </Modal>
  );
};

export default StepperPopup;
