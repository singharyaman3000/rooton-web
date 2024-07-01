/* eslint-disable no-console */
import React, { useState, useEffect, useCallback } from 'react';
import { DocusealForm } from '@docuseal/react';
import CircularLoader from '@/components/UIElements/CircularLoader';
import { encrypt } from './actions/checkout';
import { pricingPlansDetails } from '@/app/services/apiService/coachingContentsAPI';
import { useParams, useRouter } from 'next/navigation';
import { IUserDetails, getCurrentUserDetails } from '@/app/services/apiService/checkoutPageAPI';
import { checkWhetherDocAlreadySigned, createDoc } from './actions/docuseal';
import SnackbarAlert from '@/components/ToolsPage-Services/Snackbar';
import { getAppBaseUrl } from '.';

interface AgreementSignerProps {
  mail?: string;
  docShorthand?: string;
  planDetails: {
    details: pricingPlansDetails;
    serviceName: string;
  };
  userDoc: string;
}

const AgreementSigner: React.FC<AgreementSignerProps> = ({ mail, docShorthand, planDetails, userDoc }) => {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setLoading] = useState(!(userDoc?.length > 0));
  const [encryptedData, setEncryptedData] = useState('');
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState<IUserDetails | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getCompletedRedirectUrl = useCallback(
    (data?: string) => {
      if (params.lang) {
        return `${getAppBaseUrl()}${params.lang}/checkout?token=${data || encryptedData}&email=${mail || ''}`;
      }
      return `${getAppBaseUrl()}checkout?token=${data || encryptedData}&email=${mail || ''}`;
    },
    [params.lang, encryptedData, mail],
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
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        overflow: 'hidden',
        height: '100vh',
      }}
    >
      <div style={{ width: '100%', maxWidth: '800px', textAlign: 'center', overflow: 'hidden', height: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'center', height: '90vh' }}>
          {isLoading && <CircularLoader />}
          {!isLoading && (
            <div style={{ width: '100%' }}>
              <DocusealForm
                src={`https://docuseal.co/d/${userDoc}`}
                email={mail}
                values={{
                  'First Name': currentLoggedInUser?.Firstname,
                  'Last Name': currentLoggedInUser?.Lastname,
                  Email: currentLoggedInUser?.email,
                }}
                withTitle={false}
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
          )}
        </div>
      </div>
      <SnackbarAlert open={snackbarOpen} message={errorMessage} />
    </div>
  );
};

export default AgreementSigner;
