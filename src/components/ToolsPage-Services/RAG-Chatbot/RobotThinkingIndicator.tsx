/* eslint-disable react/no-unstable-nested-components */
import { Box, Paper } from '@mui/material';
import { keyframes } from '@emotion/react';
import React from 'react';

function RobotThinkingIndicator() {
  const loadingAnimation = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

  const dotStyle = {
    width: 10,
    height: 10,
    margin: '0 5px',
    backgroundColor: '#333',
    borderRadius: '50%',
    display: 'inline-block',
    animation: `${loadingAnimation} 1s infinite ease-in-out`,
  };

  const LoadingDots = () => {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ ...dotStyle, animationDelay: '0s' }} />
        <Box sx={{ ...dotStyle, animationDelay: '0.2s' }} />
        <Box sx={{ ...dotStyle, animationDelay: '0.4s' }} />
      </Box>
    );
  };

  return (
    <Box key={'typing-indicator'} mb={2} textAlign={'left'} ml={0} maxWidth={'90%'}>
      <Paper
        variant="outlined"
        sx={{
          display: 'inline-block',
          p: 2,
          bgcolor: 'white',
          borderRadius: '0 16px 16px 16px',
          border: 'none',
          color: 'black',
        }}
      >
        <LoadingDots />
      </Paper>
    </Box>
  );
}

export default RobotThinkingIndicator;
