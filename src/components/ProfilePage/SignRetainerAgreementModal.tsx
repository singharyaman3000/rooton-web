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

function checkEmailValue(emailToBeTested: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(emailToBeTested);
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
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    if (isModalOpen) {
      setEmailValue(email);
      setShowAgreementSigner(typeof email !== 'undefined' && email.length > 0);
    }
  }, [email, isModalOpen]);

  if (isLargeScreen)
    return (
      <Modal
        open={isModalOpen}
        onClose={(_event: React.MouseEvent<HTMLButtonElement>, reason: string) => {
          if (reason === 'closeClick') {
            toggleModal();
            setEmailValue(email); // Reset to initial email state when the modal is closed
            setShowAgreementSigner(typeof email !== 'undefined' && email.length > 0); // Reset to initial state
          }
        }}
        className="custom-modal"
      >
        <ModalDialog variant="soft">
          <ModalClose />
          {showAgreementSigner && !(emailValue.length === 0) ? (
            <div className="min-h-[200px] min-w-[400px]">
              <AgreementSigner
                planDetails={planDetails}
                mail={emailValue}
                docShorthand={docShorthand}
                toggleModal={toggleModal}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center w-full gap-3 p-4 sm:p-8 bg-pale-sandal border-golden-yellow border min-h-[200px] min-w-[400px]">
              <FormTextInput
                field={{ label: 'Email', name: 'email' }}
                value={emailValue}
                type="email"
                required
                className="border-2 bg-white border-[#ccccd3] hover:border-[#000] focus:border-[#000] text-[16px] h-[24px] py-6 px-6 text-gray-700 leading-6 focus:outline-none focus:shadow-outline w-[500px]"
                onChange={(e) => {
                  setEmailValue(e.target.value.trim());
                }}
                placeholder="Ex: john.doe@example.com"
                validationFn={checkEmailValue}
                invalidFormat={false}
              />
              <button
                type="button"
                className={`${style.button_width} bg-[#000] text-white mt-2 py-3 px-6 focus:outline-none focus:shadow-outline`}
                disabled={!checkEmailValue(emailValue)}
                onClick={() => {
                  if (emailValue.length > 0) {
                    setShowAgreementSigner(true);
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
