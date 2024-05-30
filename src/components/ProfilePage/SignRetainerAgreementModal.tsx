import AgreementSigner from '@/utils/AgreementSigner';
import { Modal, ModalDialog, ModalClose, Typography } from '@mui/joy';
import { Input } from '@mui/material';
import { useState } from 'react';

interface SignRetainerAgreementModalProps {
  toggleModal: () => void;
  email: string;
  isModalOpen: boolean;
  docShorthand?: string;
}

function SignRetainerAgreementModal({
  toggleModal,
  email,
  isModalOpen,
  docShorthand,
}: SignRetainerAgreementModalProps) {
  const [emailValue, setEmailValue] = useState(email || '');
  const [showAgreementSigner, setShowAgreementSigner] = useState<boolean>(
    typeof email !== 'undefined' && email.length > 0,
  );
  const [isValidEmail, setIsValidEmail] = useState({ status: true, message: '' });

  function checkEmailValue(emailToBeTested: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(emailToBeTested)) {
      setIsValidEmail({ status: true, message: '' });
    } else {
      setIsValidEmail({ status: false, message: 'Please enter a valid email address' });
    }
  }

  return (
    <Modal open={isModalOpen} onClose={toggleModal} className="custom-modal">
      <ModalDialog variant="soft">
        <ModalClose />
        <Typography component="h2">Sign Retainer Agreement</Typography>
        {emailValue.length !== 0 && showAgreementSigner && (
          <AgreementSigner docShorthand={docShorthand} mail={emailValue} />
        )}
        {(!email || email.length === 0) && (
          <div className="flex flex-col items-center justify-center gap-4 p-2">
            <Input
              type="email"
              className="w-[500px]"
              value={emailValue}
              onChange={(e) => {
                setEmailValue(e.target.value);
              }}
              placeholder="Enter your email here."
            />
            {isValidEmail.status && <p className="text-red-500">{isValidEmail.message}</p>}
            <button
              type="button"
              className="bg-[#FFCB70] hover:bg-[#f59723] w-full
              inline-flex justify-center whitespace-nowrap px-3.5 py-3
              text-[17px] font-bold text-black hover:text-white focus-visible:outline-none
              focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600
              transition-colors duration-150"
              disabled={!isValidEmail.status}
              onClick={() => {
                checkEmailValue(emailValue);
                setShowAgreementSigner(true);
              }}
            >
              Submit
            </button>
          </div>
        )}
      </ModalDialog>
    </Modal>
  );
}

export default SignRetainerAgreementModal;
