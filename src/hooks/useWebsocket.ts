/* eslint-disable @typescript-eslint/no-explicit-any */
// useWebSocket.js
import { useEffect, useRef, useState } from 'react';

const useWebSocket = (url:string) => {
  const [messages, setMessages] = useState<string[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Establish WebSocket connection
    socketRef.current = new WebSocket(url);

    // Handle incoming messages
    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => {return [...prevMessages, message];});
    };

    // Handle WebSocket connection open event
    socketRef.current.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    // Handle WebSocket error event
    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Handle WebSocket close event
    socketRef.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // Cleanup on component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [url]);

  const sendMessage = (message: any) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    }
  };

  return { messages, sendMessage };
};

export default useWebSocket;
