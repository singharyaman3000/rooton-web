import React from 'react';
import { DocusealForm } from '@docuseal/react';

interface AgreementSignerProps {
  mail: string;
}

const AgreementSigner: React.FC<AgreementSignerProps> = ({ mail }) => {
  return (
    <div style={{ display: 'flex', justifyContent:'center', flexDirection: 'row', overflowY:'scroll', overflowX:'hidden' }}>
      <div style={{ width: 'auto', textAlign: 'center' }}>
        <h1>Retainer Agreement</h1>
        <DocusealForm
          src="https://docuseal.co/d/geDyN7UKPUy2Kd"
          email={mail}
        />
      </div>
    </div>
  );
};

export default AgreementSigner;