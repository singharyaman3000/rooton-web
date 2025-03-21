import React, { forwardRef, useEffect, useState } from 'react';
import { AppBar, Dialog, IconButton, Slide, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '../Icons/CloseIcon';
import { pricingPlansDetails } from '@/app/services/apiService/coachingContentsAPI';
import { FormTextInput } from '../Forms/components/FormTextInput';
import CircularLoader from '@/components/UIElements/CircularLoader';
import getUserDoc from '@/utils/docuFetch';
import AgreementSigner from '@/utils/AgreementSigner';
import SnackbarAlert from '../ToolsPage-Services/Snackbar';
import Link from 'next/link';

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
  const [isLoading, setLoading] = useState(false);
  const [userDoc, setUserDoc] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    setEmailValue(email);
    setShowAgreementSigner(typeof email !== 'undefined' && email.length > 0);
  }, [email]);

  const loadDocument = async () => {
    setLoading(true);
    try {
      const doc = await getUserDoc(docShorthand || '', emailValue);
      if (doc) {
        setUserDoc(doc);
        setShowAgreementSigner(true);
      } else {
        setSnackbarOpen(true);
        setErrorMessage('Something went wrong. Please try again later');
        setEmailValue(email || '');
        setShowAgreementSigner(false);
        toggleModal();
      }
    } catch (err) {
      setSnackbarOpen(true);
      setErrorMessage('Something went wrong. Please try again later');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (isSmallScreen)
    return (
      <Dialog
        open={isModalOpen}
        onClose={() => {
          setEmailValue(email || '');
          setShowAgreementSigner(false);
          setUserDoc(null); // Reset the document state
          toggleModal();
        }}
        TransitionComponent={Transition}
        fullScreen
      >
        <AppBar sx={{ position: 'relative', backgroundColor: '#FFCB70', marginBottom: '20px' }}>
          <Toolbar className="flex justify-between planName-heading">
            <p className="text-xl md:text-2xl">Sign Retainer Agreement</p>
            <IconButton
              edge="start"
              color="info"
              onClick={() => {
                setEmailValue(email || '');
                setShowAgreementSigner(false);
                setUserDoc(null); // Reset the document state
                toggleModal();
              }}
              aria-label="close"
            >
              <CloseIcon width={18} height={18} />
            </IconButton>
          </Toolbar>
        </AppBar>
        {showAgreementSigner && userDoc ? (
          <AgreementSigner planDetails={planDetails} docShorthand={docShorthand} mail={emailValue} userDoc={userDoc} />
        ) : (
          <div className="flex flex-col justify-center gap-4 p-2 w-full mx-auto">
            <FormTextInput
              field={{ label: `${email.length > 0 ? 'Confirm your Email Address' : 'Enter your Email Address'}`, name: 'email' }}
              value={emailValue}
              type="email"
              required
              className="mt-2 border-2 bg-white border-[#ccccd3] hover:border-[#000] focus:border-[#000] text-[16px] h-[24px] py-6 px-6 text-gray-700 leading-6 focus:outline-none focus:shadow-outline w-full"
              onChange={(e) => {
                return setEmailValue(e.target.value.trim());
              }}
              invalidFormat={false}
              validationFn={checkEmailValue}
              placeholder="Ex: john.doe@example.com"
            />
            <button
              type="button"
              className="bg-[#000] text-white w-full md:w-[200px] inline-flex justify-center whitespace-nowrap px-3.5 py-3 text-[17px] font-bold text-black hover:text-white focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150"
              disabled={!checkEmailValue(emailValue) || isLoading}
              onClick={loadDocument}
            >
              {isLoading ? <CircularLoader /> : 'Submit'}
            </button>
            <p className="w-full text-center">
              Need help singing in?{' '}
              <Link href="/login">
                <strong>Click here!</strong>
              </Link>
            </p>
          </div>
        )}
        <SnackbarAlert open={snackbarOpen} message={errorMessage} />
      </Dialog>
    );
}

export default SignRetainerAgreementDrawer;
