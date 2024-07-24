interface IMessage {
  speaker: string;
  message: string;
  timestamp: string;
}
const initialConversation = [
  { speaker: 'You', message: 'Hey, how are you doing today?', timestamp: '2024-07-19T10:00:00Z' },
  { speaker: 'Person B', message: 'I\'m doing well, thanks! How about you?', timestamp: '2024-07-19T10:01:00Z' },
  { speaker: 'You', message: 'I\'m good too. Have you finished the report yet?', timestamp: '2024-07-19T10:02:00Z' },
  {
    speaker: 'Person B',
    message: 'Not yet, but I\'m almost done. I\'ll send it to you by the end of the day.',
    timestamp: '2024-07-19T10:03:00Z',
  },
  { speaker: 'You', message: 'Great, thanks! Do you need any help with it?', timestamp: '2024-07-19T10:04:00Z' },
  {
    speaker: 'Person B',
    message: 'No, I think I\'ve got it covered. Thanks for offering though!',
    timestamp: '2024-07-19T10:05:00Z',
  },
  { speaker: 'You', message: 'No problem. Let me know if you need anything.', timestamp: '2024-07-19T10:06:00Z' },
  { speaker: 'Person B', message: 'Will do! Have a good day!', timestamp: '2024-07-19T10:07:00Z' },
  { speaker: 'You', message: 'You too!', timestamp: '2024-07-19T10:08:00Z' },
];

const introductoryMessage = {
  speaker: 'Immigration Expert',
  message: `Hey there, I'm Immibot!
            I help people immigrate to Canada:

            > Find a suitable immigration program for you
            > Schedule a meeting with a verified professional
            > Answer any questions you have on immigration

            Get started by asking a question or selecting one of the options below!`,
  timestamp: '2024-07-19T10:00:00Z',
};

export { initialConversation, introductoryMessage };
export type { IMessage };

