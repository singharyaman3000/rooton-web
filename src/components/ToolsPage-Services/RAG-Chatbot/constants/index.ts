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

export { introductoryMessage };
export type { IMessage };

