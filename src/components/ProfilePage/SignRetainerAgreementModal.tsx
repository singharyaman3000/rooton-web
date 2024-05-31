import AgreementSigner from '@/utils/AgreementSigner';
import { Modal, ModalDialog, ModalClose } from '@mui/joy';
import { Input } from '@mui/material';
import Image from 'next/image';
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
  const [emailValue, setEmailValue] = useState(email);
  const [showAgreementSigner, setShowAgreementSigner] = useState<boolean>(
    typeof email !== 'undefined' && email.length > 0,
  );
  const [isValidEmail, setIsValidEmail] = useState({ status: true, message: '' });

  function checkEmailValue(emailToBeTested: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(emailToBeTested)) {
      setIsValidEmail({ status: true, message: '' });
      return true;
    }
    setIsValidEmail({ status: false, message: 'Please enter a valid email address' });
    return false;
  }

  return (
    <Modal
      open={isModalOpen}
      onClose={() => {
        toggleModal();
        setShowAgreementSigner(false);
        setEmailValue('');
      }}
      sx={{
        // Custom styles for full-screen on mobile and tablet
        '& .MuiDialog-root': {
          width: '100vw',
          height: '100vh',
          maxWidth: '100%', // Remove max-width restriction
          maxHeight: 'none', // Remove max-height restriction
          margin: 0,
          borderRadius: 0,
        },
      }}
    >
      <ModalDialog variant="soft">
        <ModalClose
          onClick={() => {
            setShowAgreementSigner(false);
            setEmailValue('');
          }}
        />
        <p className="font-bold text-3xl">Sign Retainer Agreement</p>
        {emailValue.length !== 0 && showAgreementSigner && (
          <AgreementSigner docShorthand={docShorthand} mail={emailValue} />
        )}
        {(!email || email.length === 0) && !showAgreementSigner && (
          <div className="flex flex-col items-center justify-center gap-4 p-2">
            <Image
              src={`${process.env.NEXT_API_BASE_URL}/uploads/exclusively_for_canada_81878f24db.png`}
              alt="logo"
              width={100}
              height={100}
            />
            <p>Root On Immigrations & Consultants</p>
            <Input
              type="email"
              className="w-full lg:w-[500px] mt-5"
              onChange={(e) => {
                if (checkEmailValue(e.target.value)) {
                  setEmailValue(e.target.value);
                }
              }}
              placeholder="Enter your email here."
            />
            {isValidEmail.status === false && <p className="text-red-500 w-full">{isValidEmail.message}</p>}
            <button
              type="button"
              className="bg-[#FFCB70] hover:bg-[#f59723] w-full
              inline-flex justify-center whitespace-nowrap px-3.5 py-3
              text-[17px] font-bold text-black hover:text-white focus-visible:outline-none
              focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600
              transition-colors duration-150"
              disabled={!isValidEmail.status}
              onClick={() => {
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
