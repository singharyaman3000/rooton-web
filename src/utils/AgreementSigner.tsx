/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { DocusealForm } from '@docuseal/react';
import CircularLoader from '@/components/UIElements/CircularLoader';
import getUserDoc from './docuFetch';

interface AgreementSignerProps {
  mail: string;
  docShorthand?: string;
  toggleModal: () => void;
}

const AgreementSigner: React.FC<AgreementSignerProps> = ({ toggleModal, mail, docShorthand }) => {
  const [isLoading, setLoading] = useState(true);
  const [userDoc, setUserDoc] = useState('LenJpjSSHrii7L');

  useEffect(() => {
    getUserDoc(docShorthand || '', mail)
      .then((doc) => {
        if (doc) {
          setUserDoc(doc);
        }else{
          // eslint-disable-next-line no-alert
          alert('Something went wrong. Please try again later');
          toggleModal();
        }
      })
      .catch((err) => {
        console.error(err);

      });
  }, [docShorthand]);

  const handleLoad = (detail: { error: unknown; }) => {
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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h1>Retainer Agreement</h1>
          {isLoading && <CircularLoader />}
        </div>
        <DocusealForm
          src={`https://docuseal.co/d/${userDoc}`}
          email={mail}
          // withTitle={false}
          // completedButton={{ title: 'Pay Now', url: 'https://google.com' }}
          onLoad={handleLoad}
          logo={`${process.env.NEXT_API_BASE_URL}/uploads/exclusively_for_canada_81878f24db.png`}
        />
      </div>
    </div>
  );
};

export default AgreementSigner;
