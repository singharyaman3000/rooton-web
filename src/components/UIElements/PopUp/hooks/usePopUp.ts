import { useState } from 'react';

const usePopUp = () => {
  const [poupState, togglePopUp] = useState(false);
  const showPopUp = () => {
    togglePopUp(true);
  };
  const hidePopUp = () => {
    togglePopUp(false);
  };

  return { poupState, showPopUp, hidePopUp };
};

export default usePopUp;
