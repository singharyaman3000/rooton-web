'use client';

import React from 'react';
import WhatsappIcon from '../Icons/WhatsappIcon';

/**
 * Renders a WhatsApp button component that opens a new window with the WhatsApp chat.
 *
 * @return {JSX.Element} The rendered WhatsApp button component.
 */
function WhatsAppButton() {
  const handleClick = () => {
    window.open('https://wa.me/82XXXX82636', '_blank', 'width=1080,height=800,left=200,top=200'); // Replace '8200826363' with your phone number
  };

  return (
    <div
      style={{
        position: 'fixed',
        right: '10px',
        bottom: '10px',
        cursor: 'pointer',
      }}
      onClick={handleClick}
      role="button"
      tabIndex={0} // Add tabIndex for accessibility
      onKeyDown={(event) => {
        // Trigger action on "Enter" key press for accessibility
        if (event.key === 'Enter') {
          handleClick();
        }
      }}
    >
      <WhatsappIcon /> {/* Here, we're using the WhatsappIcon component directly */}
    </div>
  );
}

export default WhatsAppButton;
