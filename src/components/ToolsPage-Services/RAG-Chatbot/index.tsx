import { H2 } from '@/components/H2';
import ChatInterface from './ChatInterface';

function RAGChatbot() {
  return (
    <div className='flex flex-col w-full gap-3'>
      {/* Header text */}
      <div className="">
        <H2 className="text-3xl text-center font-bold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
          RAG Chatbot
        </H2>
        <p className='typewriter-effect text-center'>How to get work?</p>
      </div>
      {/* chat container */}
      <div className="">
        <ChatInterface/>
      </div>
    </div>
  );
}

export default RAGChatbot;
