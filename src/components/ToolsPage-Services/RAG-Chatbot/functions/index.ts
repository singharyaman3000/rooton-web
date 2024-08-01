'use server';

import axios from 'axios';
import { IMessage, introductoryMessage } from '../constants';

export async function getSessionId({ token }: { token: string | null }): Promise<string | null> {
  try {
    if (!token) {
      console.error('No token found in localStorage');
      return null;
    }
    const response = await axios.get('http://localhost:8080/api/user/session', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status === 200) {
      return response.data.session_id;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export async function getConversationMessages({ token }: { token: string | null }): Promise<IMessage[]> {
  try {
    if (!token) {
      console.error('No token found in localStorage');
      return [introductoryMessage];
    }
    const response = await axios.get('http://localhost:8080/api/user/conversation', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status === 200) {
      const conversation = response.data.conversation.map(
        (message: {
          type: string;
          data: {
            content: string;
          };
        }) => {
          if (message.type === 'human') {
            return {
              speaker: 'human',
              message: message.data.content,
            };
          }
          return {
            speaker: 'RAG',
            message: message.data.content,
          };
        },
      );
      console.log(conversation);
      if(conversation.length === 0) {
        conversation.push(introductoryMessage);
      }
      return conversation;
    }
    return [introductoryMessage];
  } catch (error) {
    return [introductoryMessage];
  }
}
