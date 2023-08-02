'use client';

import React, { useEffect } from 'react';

interface IHubSpotForm {
  region: string;
  portalId: string;
  formId: string;
}
const HubSpotForm = ({ region, portalId, formId }: IHubSpotForm) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = process.env.NEXT_PUBLIC_HUBSPOT_SRC as string;
    document.body.appendChild(script);

    script.addEventListener('load', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any).hbspt) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).hbspt.forms.create({
          region,
          portalId,
          formId,
          target: '#hubspotForm',
        });
      }
    });
  }, []);

  return (
    <div>
      <div id="hubspotForm"></div>
    </div>
  );
};

export default HubSpotForm;
