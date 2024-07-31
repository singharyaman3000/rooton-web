import ReactMarkdown from 'react-markdown';

interface IMessageBoxProps {
    message:string
}

function MessageBox({ message }:IMessageBoxProps) {
  // const formattedMessage = message.replace('\n\n', '\n');

  return (
    <ReactMarkdown className="whitespace-pre-wrap text-sm">
      {message}
    </ReactMarkdown>
  );
}

export default MessageBox;