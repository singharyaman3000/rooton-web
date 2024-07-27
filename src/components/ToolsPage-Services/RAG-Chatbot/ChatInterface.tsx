/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Container, Box, Paper, Typography } from '@mui/material';
import AutoGrowingTextarea from './AutoGrowingTextarea';
import { IoIosSend } from 'react-icons/io';
import { getConversationMessages } from './functions';
import { IMessage } from './constants';
import { GridLoader } from 'react-spinners';
import useWebSocket from '@/hooks/useWebsocket';
import RobotThinkingIndicator from './RobotThinkingIndicator';
import ReactMarkdown from 'react-markdown';

const ChatInterface = () => {
  const [conversation, setConversation] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRobotTyping, setIsRobotTyping] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const { message, isRAGReady, sendMessage } = useWebSocket(
    'ws://localhost:8080/ws?session_id=38d231eb-deea-4b23-b75f-a85b549f6c4e',
  );

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    getConversationMessages('session-1')
      .then((data) => {
        setConversation(data);
        setIsLoading(false);
        scrollToBottom();
      })
      .catch(() => {
        setConversation([]);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  useEffect(() => {
    if (message) {
      setConversation([...conversation, message]);
      setIsRobotTyping(false);
    }
  }, [message]);

  const handleSend = () => {
    if (newMessage.trim()) {
      const newMessageObj = {
        speaker: 'You',
        message: newMessage,
        timestamp: new Date().toISOString(),
      };
      setConversation([...conversation, newMessageObj]);
      sendMessage(newMessageObj);
      setNewMessage('');
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      setIsRobotTyping(true);
      handleSend();
    }
  };

  return (
    <Container className="shadow-hubspot-form-shadow border border-golden-yellow bg-pale-sandal">
      {isRAGReady ? (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" paddingY={2}>
          {isLoading ? (
            <div className="flex flex-col items-center gap-5 justify-center w-full h-[230px]">
              <GridLoader />
              <p>Loading conversation...</p>
            </div>
          ) : (
            <div className="w-full max-h-[60vh] overflow-y-scroll lg:p-2 mb-2 hideScrollBar" ref={chatContainerRef}>
              {conversation?.map((chat, index) => {
                return (
                  <Box
                    key={chat.speaker + index.toString()}
                    mb={2}
                    textAlign={chat.speaker === 'You' ? 'right' : 'left'}
                    ml={chat.speaker === 'You' ? 'auto' : 0}
                    maxWidth={'90%'}
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
                        p: 1,
                        bgcolor: chat.speaker === 'You' ? 'orange' : 'white',
                        borderRadius: chat.speaker === 'You' ? '16px 0 16px 16px' : '0 16px 16px 16px',
                        border: chat.speaker === 'You' ? '1px solid golden-yellow' : '1px solid black',
                        color: chat.speaker === 'You' ? 'white' : 'black',
                      }}
                    >
                      <ReactMarkdown className="whitespace-pre-wrap">
                        {chat.message}
                      </ReactMarkdown>
                    </Paper>
                    <Typography variant="caption" color="textSecondary" display="block" mt={0.5}>
                      {new Date(chat.timestamp).toLocaleString()}
                    </Typography>
                  </Box>
                );
              })}
              {isRobotTyping && <RobotThinkingIndicator />}
            </div>
          )}
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
              className="flex items-center justify-center bg-black h-9 w-9 text-white rounded-full font-bold"
              onClick={handleSend}
              type="button"
            >
              <IoIosSend size={24} />
            </button>
          </Box>
        </Box>
      ) : (
        <p>Robot is not ready</p>
      )}
    </Container>
  );
};

export default ChatInterface;
