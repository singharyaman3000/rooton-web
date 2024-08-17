'use server';

import axios from 'axios';
import { IMessage, introductoryMessage, webSocketAPIUrl } from '../constants';

export async function getSessionId({ token }: { token: string | null }): Promise<string | null> {
  try {
    if (!token) {
      console.error('No token found in localStorage');
      return null;
    }
    const response = await axios.get(`${webSocketAPIUrl}/api/user/session`, {
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

export async function resetSessionId({ token }: { token: string | null }): Promise<string | null> {
  try {
    if (!token) {
      console.error('No token found in localStorage');
      return null;
    }

    // Sending the request with headers correctly set
    const response = await axios.put(
      `${webSocketAPIUrl}/api/user/session/update`,
      {}, // No data payload, so we send an empty object
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (response.status === 200) {
      return response.data.session_id;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getConversationMessages({ token }: { token: string | null }): Promise<IMessage[]> {
  try {
    if (!token) {
      console.error('No token found in localStorage');
      return [introductoryMessage];
    }

    const response = await axios.get(`${webSocketAPIUrl}/api/user/conversation/`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
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
      if (conversation.length === 0) {
        conversation.push(introductoryMessage);
      }
      return conversation;
    }

    return [introductoryMessage];
  } catch (error) {
    // Log the error details
    console.error('Error fetching conversation messages:', error);

    return [introductoryMessage];
  }
}

export async function sendMessage({
  message,
  session_id,
  token,
}: {
  message: string;
  session_id: string | null;
  token: string | null;
}): Promise<IMessage | null> {
  try {
    if (!token) {
      console.error('No token found in localStorage');
      return null;
    }
    if (!session_id) {
      console.error('No session_id provided.');
      return null;
    }

    const response = await axios.post(
      `${webSocketAPIUrl}/api/chat/`,
      {
        session_id,
        message,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status === 200) {
      console.log(response.data);
      return { speaker: 'RAG', message: response.data };
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
