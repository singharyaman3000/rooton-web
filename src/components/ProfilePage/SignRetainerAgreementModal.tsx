import React, { useEffect, useState } from 'react';
import { pricingPlansDetails } from '@/app/services/apiService/coachingContentsAPI';
import AgreementSigner from '@/utils/AgreementSigner';
import { Modal, ModalDialog, ModalClose } from '@mui/joy';
import { useMediaQuery, useTheme } from '@mui/material';
import { FormTextInput } from '../Forms/components/FormTextInput';
import style from '../SignUpPage/SignUpPage.module.css';

interface SignRetainerAgreementModalProps {
  toggleModal: () => void;
  email: string;
  isModalOpen: boolean;
  docShorthand?: string;
  planDetails: {
    details: pricingPlansDetails;
    serviceName: string;
  };
}

function SignRetainerAgreementModal({
  toggleModal,
  email,
  isModalOpen,
  docShorthand,
  planDetails,
}: SignRetainerAgreementModalProps) {
  const [emailValue, setEmailValue] = useState<string>(email || '');
  const [showAgreementSigner, setShowAgreementSigner] = useState<boolean>(
    typeof email !== 'undefined' && email.length > 0,
  );
  const [isValidEmail, setIsValidEmail] = useState({ status: true, message: '' });
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  function checkEmailValue(emailToBeTested: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(emailToBeTested)) {
      setIsValidEmail({ status: true, message: '' });
      return true;
    }
    setIsValidEmail({ status: false, message: 'Please enter a valid email address' });
    return false;
  }

  useEffect(() => {
    setEmailValue(email);
    setShowAgreementSigner(typeof email !== 'undefined' && email.length > 0);
  }, [email]);

  if (isLargeScreen)
    return (
      <Modal
        open={isModalOpen}
        onClose={(_event: React.MouseEvent<HTMLButtonElement>, reason: string) => {
          if (reason === 'closeClick') {
            toggleModal();
            setEmailValue('');
          }
        }}
        className="custom-modal"
      >
        <ModalDialog variant="soft">
          <ModalClose />
          {showAgreementSigner && !(emailValue.length === 0) ? (
            <AgreementSigner
              planDetails={planDetails}
              mail={emailValue}
              docShorthand={docShorthand}
              toggleModal={toggleModal}
            />
          ) : (
            <div className="flex flex-col items-center w-full gap-3 p-4 sm:p-8 bg-pale-sandal border-golden-yellow border">
              <FormTextInput
                field={{ label: '', name: 'email' }}
                value={emailValue}
                type="email"
                className="border-2 bg-white border-[#ccccd3] hover:border-[#000] focus:border-[#000] text-[16px] h-[24px] py-6 px-6 text-gray-700 leading-6 focus:outline-none focus:shadow-outline w-[500px]"
                onChange={(e) => {
                  if (checkEmailValue(e.target.value)) {
                    setEmailValue(e.target.value.trim());
                  }
                }}
                placeholder="Enter your email here."
              />
              {isValidEmail.status === false && <p className="text-[#FF0000] w-full">{isValidEmail.message}</p>}
              <button
                type="button"
                className={`${style.button_width} bg-[#000] text-white mt-2 py-3 px-6 focus:outline-none focus:shadow-outline`}
                disabled={!isValidEmail.status}
                onClick={() => {
                  if (emailValue.length > 0) {
                    setShowAgreementSigner(true);
                  } else {
                    setIsValidEmail({ status: false, message: 'Please enter an email to proceed.' });
                  }
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
