import React from 'react';

const MobileDivider = ({ cssClass }: { cssClass: string }) => {
  return (
    <div
      className={cssClass}
      style={{
        height: '1px',
        width: '100%',
        opacity:'0.28',
        backgroundImage:
          'linear-gradient(to left, rgba(255, 243, 224, 0), #fddaa1 19%,#fddaa1 19% , #fddaa1 91%, #fddaa1 12%, rgba(254, 244, 228, 0))',
      }}
    ></div>
  );
};

export default MobileDivider;
