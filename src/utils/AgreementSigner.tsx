/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { DocusealForm } from '@docuseal/react';
import CircularLoader from '@/components/UIElements/CircularLoader';
import getUserDoc from './docuFetch';

interface AgreementSignerProps {
  mail: string;
  docShorthand?: string;
}

const AgreementSigner: React.FC<AgreementSignerProps> = ({ mail, docShorthand }) => {
  const [isLoading, setLoading] = useState(true);
  const [userDoc, setUserDoc] = useState('LenJpjSSHrii7L');

  useEffect(() => {
    getUserDoc(docShorthand || '')
      .then((doc) => {
        if (doc) {
          setUserDoc(doc);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [docShorthand]);

  const handleLoad = () => {
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
