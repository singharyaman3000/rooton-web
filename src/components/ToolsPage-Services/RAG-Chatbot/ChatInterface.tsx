// ChatInterface.jsx
import React, { useState } from 'react';
import { Container, Box, Paper, Typography, TextField, Button } from '@mui/material';

const initialConversation = [
  { speaker: 'You', message: 'Hey, how are you doing today?', timestamp: '2024-07-19T10:00:00Z' },
  { speaker: 'Person B', message: 'I\'m doing well, thanks! How about you?', timestamp: '2024-07-19T10:01:00Z' },
  { speaker: 'You', message: 'I\'m good too. Have you finished the report yet?', timestamp: '2024-07-19T10:02:00Z' },
  {
    speaker: 'Person B',
    message: 'Not yet, but I\'m almost done. I\'ll send it to you by the end of the day.',
    timestamp: '2024-07-19T10:03:00Z',
  },
  { speaker: 'You', message: 'Great, thanks! Do you need any help with it?', timestamp: '2024-07-19T10:04:00Z' },
  {
    speaker: 'Person B',
    message: 'No, I think I\'ve got it covered. Thanks for offering though!',
    timestamp: '2024-07-19T10:05:00Z',
  },
  { speaker: 'You', message: 'No problem. Let me know if you need anything.', timestamp: '2024-07-19T10:06:00Z' },
  { speaker: 'Person B', message: 'Will do! Have a good day!', timestamp: '2024-07-19T10:07:00Z' },
  { speaker: 'You', message: 'You too!', timestamp: '2024-07-19T10:08:00Z' },
];

const ChatInterface = () => {
  const [conversation, setConversation] = useState(initialConversation);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      const newMessageObj = {
        speaker: 'You',
        message: newMessage,
        timestamp: new Date().toISOString(),
      };
      setConversation([...conversation, newMessageObj]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Container>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" bgcolor="gray.100">
        <Paper
          elevation={3}
          className=" shadow-hubspot-form-shadow border border-golden-yellow justify-between relative bg-pale-sandal"
          sx={{ width: '100%', maxHeight: '60vh', overflowY: 'auto', p: 2, mb: 2, backgroundColor: '#fddba2' }}
        >
          {conversation.map((chat, index) => {
            return (
              <Box key={chat.speaker + index.toString()} mb={2} textAlign={chat.speaker === 'You' ? 'right' : 'left'}>
                {chat.speaker !== 'You' && (
                  <Typography variant="subtitle2" color="textSecondary">
                    {chat.speaker}
                  </Typography>
                )}
                <Paper
                  variant="outlined"
                  sx={{
                    display: 'inline-block',
                    p: 1,
                    bgcolor: chat.speaker === 'You' ? 'primary.main' : 'grey.200',
                    color: chat.speaker === 'You' ? 'white' : 'black',
                  }}
                >
                  <Typography variant="body1">{chat.message}</Typography>
                </Paper>
                <Typography variant="caption" color="textSecondary" display="block" mt={0.5}>
                  {new Date(chat.timestamp).toLocaleString()}
                </Typography>
              </Box>
            );
          })}
        </Paper>
        <Box display="flex" width="100%">
          <TextField
            fullWidth
            multiline
            minRows={2}
            maxRows={4}
            variant="outlined"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => {
              return setNewMessage(e.target.value);
            }}
            onKeyDown={handleKeyPress}
            sx={{ mr: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleSend}>
            Send
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ChatInterface;
