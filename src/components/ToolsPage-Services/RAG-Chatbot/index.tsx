import ChatInterface from './ChatInterface';
import TypewriterEffect from './TypeWriterEffect';

function RAGChatbot() {
  return (
    <div className="flex flex-col w-full gap-4 p-5 lg:px-[80px] lg:pt-[20px] mb-10 m-auto max-w-screen-2xl">
      {/* Header text */}
      <div className="flex flex-col items-center gap-2 mb-1">
        <p className="text-3xl md:text-4xl font-bold">
          Find <span className='italic mr-1'>Your</span> Pathway
        </p>
        <TypewriterEffect />
      </div>
      {/* chat container */}
      <div className="justify-between relative overflow-hidden ">
        <ChatInterface />
      </div>
    </div>
  );
}

export default RAGChatbot;
