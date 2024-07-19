import ChatInterface from './ChatInterface';

function RAGChatbot() {
  return (
    <div className='flex flex-col w-full gap-4'>
      {/* Header text */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-5xl font-bold text-gray-900">
          RAG Chatbot
        </p>
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
