/* eslint-disable max-len */

import React, { useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import TypingEffect from './TypingEffect';
import { encryptWithAES } from '@/utils/cryptoUtils';
import SnackbarAlert from './Snackbar';
import ReactMarkdown from 'react-markdown';

interface DataBuilderProps {
  userprompt: string;
  systemPrompt: string;
}

const DataBuilder: React.FC<DataBuilderProps> = ({ systemPrompt, userprompt }) => {
  const [response, setResponse] = React.useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTypingEffect, setShowTypingEffect] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchData = async () => {
      setIsLoading(true);
      const secretKey = process.env.NEXT_ENCRYPTION_KEY;
      const data = {
        model: 'gpt-4-0125-preview',
        prompt: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: userprompt,
          },
        ],
        maxtoken: 3097,
      };
      const text = JSON.stringify(data);
      const encrypted = encryptWithAES(text, secretKey);
      try {
        const result = await axios.post(
          `${process.env.NEXT_SERVER_API_BASE_URL}/api/sop-sowp-builder`,
          { encryptedData: encrypted },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setResponse(result.data.Letter);
        setShowTypingEffect(true);
      } catch (error) {
        setSnackbarOpen(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [systemPrompt, userprompt]);

  if (snackbarOpen) {
    return (
      <SnackbarAlert
        open={snackbarOpen}
        message="Oops! Looks like something went wrong. Please try again."
      />
    );
  }

  return (
    <div className="h-screen">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {showTypingEffect ? (
            <TypingEffect text={response} />
          ) : (
            <ReactMarkdown className="w-full h-screen border border-golden-yellow p-2 leading-8 overflow-auto">
              {response}
            </ReactMarkdown>
          )}
        </div>
      )}
    </div>
  );
};

export default DataBuilder;
