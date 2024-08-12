interface IMessage {
  speaker: string;
  message: string;
}

const introductoryMessage = {
  speaker: 'Immigration Expert',
  message: `Hey there, I'm an Immigration expert!
            I help people immigrate to Canada:
            > Find a suitable immigration program for you
            > Schedule a meeting with a verified professional
            > Answer any questions you have on immigration

            Get started by asking a question or selecting one of the options below!`,
};

const sentences = [
  'What are the different immigration pathways to Canada?',
  'How long does the immigration process take?',
  'What documents are needed for immigration applications?',
  'What is the Express Entry system?',
  'How much does it cost to immigrate to Canada?',
  'Can I bring my family with me?',
  'What are the language requirements for immigration?',
  'What is the Provincial Nominee Program?',
  'Do I need a job offer to immigrate?',
  'How can I check my immigration application status?',
];


const webSocketAPIUrl =
  process.env.NEXT_APP_ENVIRONMNET === 'production'
    ? `https://${process.env.NEXT_PUBLIC_RAG_CHATBOT_WS_URL}`
    : `https://${process.env.NEXT_PUBLIC_RAG_CHATBOT_WS_URL}`;

    
const websocketUrl =
  process.env.NEXT_APP_ENVIRONMNET === 'production'
    ? `wss://${process.env.NEXT_PUBLIC_RAG_CHATBOT_WS_URL}`
    : `wss://${process.env.NEXT_PUBLIC_RAG_CHATBOT_WS_URL}`;

export { sentences, introductoryMessage, websocketUrl, webSocketAPIUrl };
export type { IMessage };

