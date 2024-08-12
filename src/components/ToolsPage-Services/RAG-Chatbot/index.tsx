import { useState } from 'react';
import ChatInterface from './ChatInterface';
import TypewriterEffect from './TypeWriterEffect';
import { Container } from '@mui/material';

function RAGChatbot() {
  const [resetChat, setResetChat] = useState(false);
  return (
    <div className="flex flex-col w-full gap-4 p-5 lg:px-[80px] lg:pt-[20px] mb-10 m-auto max-w-screen-2xl">
      {/* Header */}
      <div className="flex flex-col items-center gap-2 mb-1">
        <p className="text-3xl md:text-4xl font-bold">
          Find <span className="italic mr-1">Your</span> Pathway
        </p>
        <TypewriterEffect />
      </div>
      {/* chat container */}
      <Container className="justify-between relative overflow-hidden w-[90%] mx-auto">
        <button
          type="button"
          className="flex items-center justify-center bg-black px-3 py-1 text-white font-bold mb-2 ml-auto"
          onClick={() => {
            return setResetChat(true);
          }}
        >
          Reset Chat
        </button>
        <ChatInterface resetChat={resetChat} setResetChat={setResetChat} />
      </Container>
    </div>
  );
}

export default RAGChatbot;
