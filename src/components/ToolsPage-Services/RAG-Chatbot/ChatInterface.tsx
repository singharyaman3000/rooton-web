/* eslint-disable jsx-a11y/control-has-associated-label */
// ChatInterface.jsx
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Container, Box, Paper, Typography } from '@mui/material';
import AutoGrowingTextarea from './AutoGrowingTextarea';
import { IoIosSend } from 'react-icons/io';
import { initialConversation } from './constants';

const ChatInterface = () => {
  const [conversation, setConversation] = useState(initialConversation);
  const [newMessage, setNewMessage] = useState('');

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

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

  const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        bgcolor="#fddba2"
        padding={2}
      >
        <Paper className="hideScrollBar" ref={chatContainerRef} sx={{ width: '100%', maxHeight: '60vh', overflowY: 'auto', p: 2, mb: 2 }}>
          {conversation.map((chat, index) => {
            return (
              <Box
                key={chat.speaker + index.toString()}
                mb={2}
                textAlign={chat.speaker === 'You' ? 'right' : 'left'}
                ml={chat.speaker === 'You' ? 'auto' : 0}
                maxWidth={'80%'}
              >
                {chat.speaker !== 'You' && (
                  <Typography variant="subtitle2" color="textSecondary">
                    {chat.speaker}
                  </Typography>
                )}
                <Paper
                  variant="outlined"
                  sx={{
                    display: 'inline-block',
                    p: 2,
                    bgcolor: chat.speaker === 'You' ? 'orange' : 'white',
                    borderRadius: 1,
                    border: chat.speaker === 'You' ? 'golden-yellow' : '1px solid black',
                    color: chat.speaker === 'You' ? 'white' : 'black',
                  }}
                >
                  <Typography fontSize={17} variant="body1">
                    {chat.message}
                  </Typography>
                </Paper>
                <Typography variant="caption" color="textSecondary" display="block" mt={0.5}>
                  {new Date(chat.timestamp).toLocaleString()}
                </Typography>
              </Box>
            );
          })}
        </Paper>
        <Box
          display="flex"
          width="100%"
          p={1}
          bgcolor={'white'}
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'flex-end'}
        >
          <AutoGrowingTextarea
            value={newMessage}
            onChange={(event) => {
              setNewMessage(event.target.value);
            }}
            onKeyDown={handleKeyPress}
          />
          <button
            className=" flex items-center justify-center bg-black h-9 w-9 text-white rounded-full font-bold"
            onClick={handleSend}
            type="button"
          >
            <IoIosSend size={24} />
          </button>
        </Box>
      </Box>
    </Container>
  );
};

export default ChatInterface;
