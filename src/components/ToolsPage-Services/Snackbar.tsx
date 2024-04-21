import React, { useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert, AlertColor } from '@mui/material';

interface SnackbarAlertProps {
  open: boolean;
  message: string;
  type?: AlertColor;
}

const SnackbarAlert: React.FC<SnackbarAlertProps> = ({ open, message, type = 'error' }) => {
  const [isOpen, setIsOpen] = React.useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={5000}
      onClose={() => {
        setIsOpen(false);
      }}
    >
      <Alert
        onClose={() => {
          setIsOpen(false);
        }}
        severity={type}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;