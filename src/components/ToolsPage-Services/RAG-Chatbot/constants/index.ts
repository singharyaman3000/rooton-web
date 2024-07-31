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
  timestamp: '2024-07-19T10:00:00Z',
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

export { sentences, introductoryMessage };
export type { IMessage };

