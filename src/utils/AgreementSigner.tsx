/* eslint-disable no-console */
import React, { useState, useEffect, useCallback } from 'react';
import { DocusealForm } from '@docuseal/react';
import CircularLoader from '@/components/UIElements/CircularLoader';
import getUserDoc from './docuFetch';
import { encrypt } from './actions/checkout';
import { pricingPlansDetails } from '@/app/services/apiService/coachingContentsAPI';
import { useParams } from 'next/navigation';
import { IUserDetails, getCurrentUserDetails } from '@/app/services/apiService/checkoutPageAPI';
import { createDoc } from './actions/docuseal';

interface AgreementSignerProps {
  mail?: string;
  docShorthand?: string;
  toggleModal: () => void;
  planDetails: {
    details: pricingPlansDetails;
    serviceName: string;
  };
  redirectToCheckout: boolean;
}

const AgreementSigner: React.FC<AgreementSignerProps> = ({
  toggleModal,
  mail,
  docShorthand,
  planDetails,
  redirectToCheckout,
}) => {
  const params = useParams();
  const [isLoading, setLoading] = useState(true);
  const [userDoc, setUserDoc] = useState('');
  const [encryptedData, setEncryptedData] = useState('');
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState<IUserDetails | null>(null);
  getCurrentUserDetails().then((details) => {
    if (details) {
      setCurrentLoggedInUser(details);
    }
  });

  const getCompletedRedirectUrl = useCallback(() => {
    if (params.lang) {
      return `${process.env.NEXT_APP_BASE_URL}/${params.lang}/checkout?token=${encryptedData}`;
    }
    return `${process.env.NEXT_APP_BASE_URL}/checkout?token=${encryptedData}`;
  }, [params.lang, encryptedData]);

  const handleLoad = async (detail: { error: unknown }) => {
    const data = await encrypt(JSON.stringify(planDetails));
    setEncryptedData(data);
    console.log(detail.error);
    setLoading(false);
    if (redirectToCheckout) {
      const url = getCompletedRedirectUrl();
      window.location.href = url;
    }
  };

  useEffect(() => {

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
  }, [docShorthand, mail, toggleModal, redirectToCheckout, getCompletedRedirectUrl]);

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
          completedRedirectUrl={getCompletedRedirectUrl()}
          onLoad={handleLoad}
          logo={`${process.env.NEXT_API_BASE_URL}/uploads/exclusively_for_canada_81878f24db.png`}
        />
      </div>
    </div>
  );
};

export default AgreementSigner;
