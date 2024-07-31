import ReactMarkdown from 'react-markdown';

interface IMessageBoxProps {
  message: string;
  speaker: string;
}

function MessageBox({ message, speaker }: IMessageBoxProps) {
  // const formattedMessage = message.replace('\n\n', '\n');

  return <ReactMarkdown className={`whitespace-pre-wrap text-sm ${speaker==='human'?'text-left':''}`}>{message}</ReactMarkdown>;
}

export default MessageBox;
