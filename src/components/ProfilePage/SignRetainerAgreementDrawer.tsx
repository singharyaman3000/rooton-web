import AgreementSigner from '@/utils/AgreementSigner';
import { AppBar, Dialog, IconButton, Slide, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { forwardRef, useEffect, useState } from 'react';
import CloseIcon from '../Icons/CloseIcon';
import { pricingPlansDetails } from '@/app/services/apiService/coachingContentsAPI';
import { FormTextInput } from '../Forms/components/FormTextInput';

interface SignRetainerAgreementDrawerProps {
  toggleModal: () => void;
  email: string;
  isModalOpen: boolean;
  docShorthand?: string;
  planDetails: {
    details: pricingPlansDetails;
    serviceName: string;
  };
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

function checkEmailValue(emailToBeTested: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(emailToBeTested);
}

function SignRetainerAgreementDrawer({
  toggleModal,
  email,
  isModalOpen,
  docShorthand,
  planDetails,
}: SignRetainerAgreementDrawerProps) {
  const [emailValue, setEmailValue] = useState<string>(email || '');
  const [showAgreementSigner, setShowAgreementSigner] = useState<boolean>(
    typeof email !== 'undefined' && email.length > 0,
  );
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  useEffect(() => {
    setEmailValue(email);
    setShowAgreementSigner(typeof email !== 'undefined' && email.length > 0);
  }, [email]);

  if (isSmallScreen)
    return (
      <Dialog
        open={isModalOpen}
        onClose={() => {
          toggleModal();
          setEmailValue('');
        }}
        TransitionComponent={Transition}
        fullScreen
      >
        <AppBar sx={{ position: 'relative', backgroundColor: '#FFCB70', marginBottom: '20px' }}>
          <Toolbar className="flex justify-between bg-[#FFCB70]">
            <p className="font-bold text-xl md:text-2xl lg:text-3xl">Sign Retainer Agreement</p>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                toggleModal();
                setEmailValue('');
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {showAgreementSigner && (
          <AgreementSigner
            planDetails={planDetails}
            toggleModal={() => {
              toggleModal();
              setEmailValue('');
            }}
            docShorthand={docShorthand}
            mail={emailValue}
          />
        )}
        {!showAgreementSigner && (
          <div className="flex flex-col justify-center gap-4 p-2 w-full mx-auto">
            <FormTextInput
              field={{ label: 'Email', name: 'email' }}
              value={emailValue}
              type="email"
              required
              className="border-2 bg-white border-[#ccccd3] hover:border-[#000] focus:border-[#000] text-[16px] h-[24px] py-6 px-6 text-gray-700 leading-6 focus:outline-none focus:shadow-outline w-full"
              onChange={(e) => {
                if (checkEmailValue(e.target.value)) {
                  setEmailValue(e.target.value.trim());
                }
              }}
              invalidFormat={false}
              validationFn={checkEmailValue}
              placeholder="Ex: john.doe@example.com"
            />
            <button
              type="button"
              className="bg-[#FFCB70] hover:bg-[#f59723] w-full md:w-[200px]
              inline-flex justify-center whitespace-nowrap px-3.5 py-3
              text-[17px] font-bold text-black hover:text-white focus-visible:outline-none
              focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600
              transition-colors duration-150"
              disabled={!checkEmailValue(emailValue)}
              onClick={() => {
                if (emailValue.length > 0) {
                  setShowAgreementSigner(true);
                };
              }}
            >
              Submit
            </button>
          </div>
        )}
      </Dialog>
    );
}

export default SignRetainerAgreementDrawer;
