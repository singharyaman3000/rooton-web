/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMessage } from '@/components/ToolsPage-Services/RAG-Chatbot/constants';
import { useEffect, useRef, useState } from 'react';

const useWebSocket = (url:string) => {
  const [message, setMessage] = useState<IMessage>();
  const [isRAGReady, setIsRAGReady] = useState<boolean>(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Establish WebSocket connection
    socketRef.current = new WebSocket(url);

    // Handle incoming messages
    socketRef.current.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);
        setMessage(response);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    // Handle WebSocket connection open event
    socketRef.current.onopen = () => {
      console.log('Connected to WebSocket server');
      setIsRAGReady(true);
    };

    // Handle WebSocket error event
    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsRAGReady(false);
    };

    // Handle WebSocket close event
    socketRef.current.onclose = () => {
      console.log('WebSocket connection closed');
      setIsRAGReady(false);
    };

    // Cleanup on component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [url]);

  const sendMessage = (messageFromUser: any) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(messageFromUser));
    }
  };

  return { message, isRAGReady, sendMessage };
};

export default useWebSocket;
