import React, { useEffect, useState } from 'react';
import { pricingPlansDetails } from '@/app/services/apiService/coachingContentsAPI';
import AgreementSigner from '@/utils/AgreementSigner';
import { Modal, ModalDialog, ModalClose } from '@mui/joy';
import { Input, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import { checkWhetherDocAlreadySigned } from '@/utils/actions/docuseal';
import { getShortHand } from '../ServicePage/PageSections/functions';

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
  const [redirectToCheckout, setRedirectToCheckout] = useState<boolean>(false);

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
    if (email.length > 0) {
      checkWhetherDocAlreadySigned(email, docShorthand || '').then((isAlreadySigned) => {
        if (!isAlreadySigned) setShowAgreementSigner(true);
        else {
          setShowAgreementSigner(true);
          setRedirectToCheckout(true);
        }
      });
    }
  }, [email, docShorthand]);

  if (isLargeScreen)
    return (
      <Modal
        open={isModalOpen}
        onClose={(_event: React.MouseEvent<HTMLButtonElement>, reason: string) => {
          if (reason === 'closeClick') {
            toggleModal();
          }
        }}
        className="custom-modal"
      >
        <ModalDialog variant="soft">
          <ModalClose />
          {showAgreementSigner ? (
            <AgreementSigner
              planDetails={planDetails}
              mail={emailValue}
              docShorthand={getShortHand()}
              toggleModal={toggleModal}
              redirectToCheckout={redirectToCheckout}
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 p-2 w-full md:w-1/2 mx-auto">
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
                    setEmailValue(e.target.value.trim());
                  }
                }}
                placeholder="Enter your email here."
              />
              {isValidEmail.status === false && <p className="text-red-500 w-full">{isValidEmail.message}</p>}
              <button
                type="button"
                className="bg-[#FFCB70] hover:bg-[#f59723] w-full md:w-[200px]
              inline-flex justify-center whitespace-nowrap px-3.5 py-3
              text-[17px] font-bold text-black hover:text-white focus-visible:outline-none
              focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600
              transition-colors duration-150"
                disabled={!isValidEmail.status}
                onClick={() => {
                  if (emailValue.length > 0) {
                    checkWhetherDocAlreadySigned(emailValue, getShortHand() || '').then((isAlreadySigned) => {
                      if (!isAlreadySigned) setShowAgreementSigner(true);
                      else {
                        setShowAgreementSigner(true);
                        setRedirectToCheckout(true);
                      }
                    });
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
