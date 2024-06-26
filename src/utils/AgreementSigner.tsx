/* eslint-disable no-console */
import React, { useState, useEffect, useCallback } from 'react';
import { DocusealForm } from '@docuseal/react';
import CircularLoader from '@/components/UIElements/CircularLoader';
import getUserDoc from './docuFetch';
import { encrypt } from './actions/checkout';
import { pricingPlansDetails } from '@/app/services/apiService/coachingContentsAPI';
import { useParams, useRouter } from 'next/navigation';
import { IUserDetails, getCurrentUserDetails } from '@/app/services/apiService/checkoutPageAPI';
import { checkWhetherDocAlreadySigned, createDoc } from './actions/docuseal';
import SnackbarAlert from '@/components/ToolsPage-Services/Snackbar';

interface AgreementSignerProps {
  mail?: string;
  docShorthand?: string;
  toggleModal: () => void;
  planDetails: {
    details: pricingPlansDetails;
    serviceName: string;
  };
}

const AgreementSigner: React.FC<AgreementSignerProps> = ({ toggleModal, mail, docShorthand, planDetails }) => {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setLoading] = useState(true);
  const [userDoc, setUserDoc] = useState('');
  const [encryptedData, setEncryptedData] = useState('');
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState<IUserDetails | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getCompletedRedirectUrl = useCallback(
    (data?: string) => {
      if (params.lang) {
        return `${process.env.NEXT_APP_BASE_URL}/${params.lang}/checkout?token=${data || encryptedData}`;
      }
      return `${process.env.NEXT_APP_BASE_URL}/checkout?token=${data || encryptedData}`;
    },
    [params.lang, encryptedData],
  );

  const handleLoad = async (detail: { error: unknown }) => {
    const data = await encrypt(JSON.stringify(planDetails));
    setEncryptedData(data);
    if (detail.error) {
      setErrorMessage('Something went wrong. Please try again later');
      setSnackbarOpen(true);
    }
    if (!detail.error) {
      checkWhetherDocAlreadySigned(currentLoggedInUser?.email || mail || '', docShorthand || '').then(
        (isAlreadySigned) => {
          if (isAlreadySigned) {
            router.push(getCompletedRedirectUrl(data));
          }
        },
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    getCurrentUserDetails().then((details) => {
      if (details) {
        setCurrentLoggedInUser(details);
      }
    });

    getUserDoc(docShorthand || '', mail || '')
      .then((doc) => {
        if (doc) {
          setUserDoc(doc);
        } else {
          // eslint-disable-next-line no-alert
          alert('Something went wrong. Please try again later');
          toggleModal();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [docShorthand, mail, toggleModal, getCompletedRedirectUrl]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        overflowY: 'scroll',
        overflowX: 'hidden',
      }}
    >
      <div style={{ width: 'auto', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>{isLoading && <CircularLoader />}</div>
        <DocusealForm
          src={`https://docuseal.co/d/${userDoc}`}
          email={mail}
          values={{
            'First Name': currentLoggedInUser?.Firstname,
            'Last Name': currentLoggedInUser?.Lastname,
            Email: currentLoggedInUser?.email,
          }}
          onComplete={() => {
            createDoc(mail || '', docShorthand || '', 'create').then((res) => {
              if (!res) {
                // eslint-disable-next-line no-alert
                alert('Something went wrong. Please try again later');
              }
            });
          }}
          allowToResubmit={false}
          completedRedirectUrl={getCompletedRedirectUrl()}
          onLoad={handleLoad}
          logo={`${process.env.NEXT_API_BASE_URL}/uploads/exclusively_for_canada_81878f24db.png`}
        />
      </div>
      <SnackbarAlert open={snackbarOpen} message={errorMessage} />
    </div>
  );
};

export default AgreementSigner;
