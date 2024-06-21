/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { DocusealForm } from '@docuseal/react';
import CircularLoader from '@/components/UIElements/CircularLoader';
import getUserDoc from './docuFetch';
import { encrypt } from './actions/checkout';
import { pricingPlansDetails } from '@/app/services/apiService/coachingContentsAPI';

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
  const [isLoading, setLoading] = useState(true);
  const [userDoc, setUserDoc] = useState('');
  const [encryptedData, setEncryptedData] = useState('');

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
  }, [docShorthand, mail, toggleModal]);

  const handleLoad = async (detail: { error: unknown }) => {
    const data = await encrypt(JSON.stringify(planDetails));
    setEncryptedData(data);
    console.log(detail.error);
    setLoading(false);
  };

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
          completedRedirectUrl={`${process.env.NEXT_APP_BASE_URL}/checkout?token=${encryptedData}`}
          onLoad={handleLoad}
          logo={`${process.env.NEXT_API_BASE_URL}/uploads/exclusively_for_canada_81878f24db.png`}
        />
      </div>
    </div>
  );
};

export default AgreementSigner;
