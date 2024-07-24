import { Box, Paper, Typography } from '@mui/material';
import React from 'react';

function RobotThinkingIndicator() {
  return (
    <Box key={'typing-indicator'} mb={2} textAlign={'left'} ml={0} maxWidth={'90%'}>
      <Typography variant="subtitle2" color="textSecondary">
        Immigration Expert
      </Typography>

      <Paper
        variant="outlined"
        sx={{
          display: 'inline-block',
          p: 1,
          bgcolor: 'white',
          borderRadius: '16px 16px 16px 0',
          border: '1px solid black',
          color: 'black',
        }}
      >
        <Typography fontSize={17} variant="body1">
          Typing...
        </Typography>
      </Paper>
    </Box>
  );
}

export default RobotThinkingIndicator;
