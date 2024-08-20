/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Dispatch, KeyboardEvent, SetStateAction, useEffect, useRef, useState } from 'react';
import { Container, Box, Paper, Typography } from '@mui/material';
import AutoGrowingTextarea from './AutoGrowingTextarea';
import { IoIosSend } from 'react-icons/io';
import { getConversationMessages, getSessionId, resetSessionId, sendMessage } from './functions';
import { IMessage } from './constants';
import { GridLoader } from 'react-spinners';
import RobotThinkingIndicator from './RobotThinkingIndicator';
import MessageBox from './MessageBox';
import { useHeaderData } from '@/hooks/HeaderDataProvider';

interface IChatInterfaceProps {
  resetChat: boolean;
  setResetChat: Dispatch<SetStateAction<boolean>>;
  setDisplayToast: Dispatch<SetStateAction<boolean>>;
  setToastMessage: Dispatch<SetStateAction<string>>;
}

const ChatInterface = ({ resetChat, setResetChat, setDisplayToast, setToastMessage }: IChatInterfaceProps) => {
  const [conversation, setConversation] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRobotTyping, setIsRobotTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [isRAGReady, setIsRAGReady] = useState<boolean>(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const { logo_name } = useHeaderData();

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
        setIsRAGReady(true);
      }else{
        setDisplayToast(true);
        setToastMessage('Session ID not found. Please try again.');
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
        setDisplayToast(true);
        setToastMessage('Failed to load the conversation history. Please try again.');
      });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const handleSend = () => {
    if (newMessage.trim()) {
      const newMessageObj = {
        speaker: 'human',
        message: newMessage,
      };

      setConversation((prevConversation) => {return [...prevConversation, newMessageObj];});

      const token = localStorage.getItem('token');
      sendMessage({ message: newMessage, session_id: sessionId, token }).then((data) => {
        if (data) {
          setConversation((prevConversation) => {return [...prevConversation, data];});
          setIsRobotTyping(false);
          scrollToBottom();
        }else{
          setDisplayToast(true);
          setToastMessage('Failed to send message. Please try again.');
          setIsRobotTyping(false);
          setConversation((prevConversation) => {
            // Check if the array is not empty to avoid removing from an empty array
            if (prevConversation.length > 0) {
              // Return a new array that has every element except the last one
              return prevConversation.slice(0, -1);
            }
            return prevConversation; // Return the original array if it's empty
          });
        }
      });

      setNewMessage('');
    }
  };

  useEffect(() => {
    if (resetChat) {
      setIsRAGReady(false);
      const token = localStorage.getItem('token');
      setIsLoading(true);
      resetSessionId({ token }).then((data) => {
        if (data) {
          setSessionId(data);
          setIsRAGReady(true);
          getConversationMessages({ token }).then((messages) => {
            setConversation(messages);
            setIsLoading(false);
            setResetChat(false);
            setIsRobotTyping(false);
            scrollToBottom();
          });
        }else{
          setDisplayToast(true);
          setToastMessage('Failed to reset the conversation. Please try again.');
        }
      });
    }
  }, [resetChat]);

  const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      setIsRobotTyping(true);
      handleSend();
    }
  };

  return (
    <Container className="shadow-hubspot-form-shadow border border-[#C0C0C0] bg-[#E5E4E2]">
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
                    {chat.speaker === 'human' && (
                      <Typography variant="subtitle2" color="textSecondary">
                        {logo_name}
                      </Typography>
                    )}
                    <Paper
                      variant="outlined"
                      sx={{
                        display: 'inline-block',
                        p: 1.5,
                        border: '0',
                        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
                        bgcolor: chat.speaker === 'human' ? '#ffc766' : 'white',
                        borderRadius: chat.speaker === 'human' ? '16px 0 16px 16px' : '0 16px 16px 16px',
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
          <div className="">
            <GridLoader />
            <p className="text-xl md:text-2xl font-bold">Initialising the connection!</p>
          </div>
        </div>
      )}
    </Container>
  );
};

export default ChatInterface;
