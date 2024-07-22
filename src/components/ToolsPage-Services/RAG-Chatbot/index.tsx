import ChatInterface from './ChatInterface';
import { H2 } from '@/components/H2';

function RAGChatbot() {
  return (
    <div className='flex flex-col w-full gap-4'>
      {/* Header text */}
      <div className="flex flex-col items-center gap-2">
        <H2>RAG Chatbot</H2>
        <p className='typewriter-effect'>How to get work?</p>
      </div>
      {/* chat container */}
      <div className="">
        <ChatInterface/>
      </div>
    </div>
  );
}

export default RAGChatbot;
