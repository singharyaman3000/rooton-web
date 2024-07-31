/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMessage } from '@/components/ToolsPage-Services/RAG-Chatbot/constants';
import { useCallback, useEffect, useRef, useState } from 'react';

const useWebSocket = (url: string | null) => {
  const [message, setMessage] = useState<IMessage>();
  const [isRAGReady, setIsRAGReady] = useState<boolean>(false);
  const [retryCount, setRetryCount] = useState<number>(0);
  const socketRef = useRef<WebSocket | null>(null);

  const connectWebSocket = useCallback(() => {
    socketRef.current = new WebSocket(url || '');

    // Handle incoming messages
    socketRef.current.onmessage = (event) => {
      try {
        const RAGResponse = JSON.parse(event.data);
        const response = {
          message: RAGResponse.message,
          speaker: 'Immigration Expert',
        };
        setMessage(response);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    // Handle WebSocket connection open event
    socketRef.current.onopen = () => {
      console.log('Connected to WebSocket server', url);
      setIsRAGReady(true);
      setRetryCount(0); // Reset retry count on successful connection
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
  }, [url]);

  useEffect(() => {
    if (url) {
      connectWebSocket();
    }

    // Cleanup on component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [connectWebSocket, url]);

  const retryConnection = () => {
    let information = '';
    if (!isRAGReady && retryCount < 5) {
      information = 'Reattempting to connect to our Expert!';
      setRetryCount(retryCount + 1);
      connectWebSocket();
    } else if (retryCount >= 5) {
      information = 'Max retries reached, could not connect to our Expert!';
    }
    return information;
  };

  const sendMessage = (messageFromUser: any) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(messageFromUser));
    }
  };

  return { message, isRAGReady, sendMessage, retryCount, retryConnection };
};

export default useWebSocket;
