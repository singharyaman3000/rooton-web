import AgreementSigner from '@/utils/AgreementSigner';
import { AppBar, Dialog, IconButton, Input, Slide, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import Image from 'next/image';
import React, { forwardRef, useState } from 'react';
import CloseIcon from '../Icons/CloseIcon';

interface SignRetainerAgreementModalProps {
  toggleModal: () => void;
  email: string;
  isModalOpen: boolean;
  docShorthand?: string;
}

// eslint-disable-next-line react/display-name
const Transition = forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
  ) => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Slide direction="up" ref={ref} {...props} />;
  },
);

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
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  function checkEmailValue(emailToBeTested: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(emailToBeTested)) {
      setIsValidEmail({ status: true, message: '' });
      return true;
    }
    setIsValidEmail({ status: false, message: 'Please enter a valid email address' });
    return false;
  }

  if (isSmallScreen) return (
    <Dialog open={isModalOpen} onClose={toggleModal} TransitionComponent={Transition} fullScreen>
      <AppBar sx={{ position: 'relative', backgroundColor: '#FFCB70', marginBottom: '20px' }}>
        <Toolbar className="flex justify-between bg-[#FFCB70]">
          <p className="font-bold text-xl md:text-2xl lg:text-3xl">Sign Retainer Agreement</p>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              toggleModal();
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {showAgreementSigner && <AgreementSigner toggleModal={toggleModal} docShorthand={docShorthand} mail={emailValue} />}
      {!showAgreementSigner && (
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
              setShowAgreementSigner(true);
            }}
          >
            Submit
          </button>
        </div>
      )}
    </Dialog>
  );
}

export default SignRetainerAgreementModal;
