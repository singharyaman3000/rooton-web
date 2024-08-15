import Markdown from 'markdown-to-jsx';

interface IMessageBoxProps {
  message: string;
  speaker: string;
}

function MessageBox({ message, speaker }: IMessageBoxProps) {
  return (
    <Markdown
      className={`whitespace-pre-wrap1 text-sm ${speaker === 'human' ? 'text-left text-black' : ''} w-full`}
    >
      {message}
    </Markdown>
  );
}

export default MessageBox;
