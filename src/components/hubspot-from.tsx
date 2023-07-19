'use client';

import { useEffect } from 'react';

const HubspotContactForm = () => {
  useEffect(() => {
    const initHubSpot = () => {
      const script = document.createElement('script');
      script.src = 'https://js.hsforms.net/forms/embed/v2.js';
      document.body.appendChild(script);
      script.addEventListener('load', () => {
        // if ((window as any).hbspt) {
        //   (window as any).hbspt.forms.create({
        //     region: 'na1',
        //     portalId: '40176078',
        //     formId: '3bd77644-7f95-4b29-8417-0a8f39fba075',
        //     target: '#hubspotForm',
        //     onFormSubmit () {
        //       // console.log('Sub,itted')
        //       // setShow2form(true)
        //       // initFormTwo();
        //     },
        //     cssClass: 'huform',
        //   });
        // }
      });
    };

    initHubSpot();
  }, []);

  return (
    <div className=" h-[100vh] w-full bg-[#F1F1F1]">
      <h1 className=" text-[32px] mt-5 ml-10 font-extrabold">Study Visa</h1>
      <div className="bg-[#FFFFFF] p-10 mx-10 h-[90vh] overflow-auto w-[60%]" id="hubspotForm" />
    </div>
  );
};

export default HubspotContactForm;
