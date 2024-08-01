/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Container, Box, Paper, Typography } from '@mui/material';
import AutoGrowingTextarea from './AutoGrowingTextarea';
import { IoIosSend } from 'react-icons/io';
import { getConversationMessages, getSessionId } from './functions';
import { IMessage } from './constants';
import { GridLoader } from 'react-spinners';
import useWebSocket from '@/hooks/useWebsocket';
import RobotThinkingIndicator from './RobotThinkingIndicator';
import MessageBox from './MessageBox';

const ChatInterface = () => {
  const [conversation, setConversation] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRobotTyping, setIsRobotTyping] = useState(false);
  const [sesssionId, setSessionId] = useState<string>('');
  const [webSocketConnectionResponse, setWebSocketConnectionResponse] = useState<string>('');

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const { message, isRAGReady, retryCount, sendMessage, retryConnection } = useWebSocket(
    sesssionId ? `ws://${process.env.NEXT_SERVER_API_BASE_URL}/ws?session_id=${sesssionId}` : null,
  );

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    getSessionId({ token }).then((data) => {
      if (data) {
        setSessionId(data);
      }
    });
    getConversationMessages({ token })
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
        speaker: 'human',
        message: newMessage,
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
                    textAlign={chat.speaker === 'human' ? 'right' : 'left'}
                    ml={chat.speaker === 'human' ? 'auto' : 0}
                    maxWidth={'90%'}
                  >
                    {chat.speaker !== 'human' && (
                      <Typography variant="subtitle2" color="textSecondary">
                        Immigration Expert
                      </Typography>
                    )}
                    <Paper
                      variant="outlined"
                      sx={{
                        display: 'inline-block',
                        p: 1,
                        bgcolor: chat.speaker === 'human' ? 'orange' : 'white',
                        borderRadius: chat.speaker === 'human' ? '16px 0 16px 16px' : '0 16px 16px 16px',
                        border: chat.speaker === 'human' ? '1px solid golden-yellow' : '1px solid black',
                        color: chat.speaker === 'human' ? 'white' : 'black',
                      }}
                    >
                      <MessageBox message={chat.message} speaker={chat.speaker} />
                    </Paper>
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
        <div className="flex flex-col items-center justify-center py-4 text-center">
          {retryCount === 0 ? (
            <div className="">
              <GridLoader />
              <p className="text-xl md:text-2xl font-bold">Initialising the connection!</p>
            </div>
          ) : (
            <p className="text-xl md:text-2xl font-bold">The Chatbot is not ready!</p>
          )}
          <div className="flex flex-col items-center gap-3">
            <p>{webSocketConnectionResponse}</p>
            {retryCount > 0 && (
              <button
                type="button"
                className="flex items-center justify-center bg-black text-white font-bold p-2 mt-5"
                onClick={() => {
                  const response = retryConnection();
                  setWebSocketConnectionResponse(response);
                }}
              >
                Try again!
              </button>
            )}
          </div>
        </div>
      )}
    </Container>
  );
};

export default ChatInterface;
