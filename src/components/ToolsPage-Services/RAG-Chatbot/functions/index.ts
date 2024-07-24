'use server';

import axios from 'axios';
import { IMessage, introductoryMessage } from '../constants';

export async function getConversationMessages(sessionId:string):Promise<IMessage[]>{
  try {
    const response = await axios.get(`${process.env.NEXT_API_BASE_URL}/api/conversation/${sessionId}`);
    if(response.status === 200){
      return response.data.messages;
    }
    return [introductoryMessage];
  } catch (error) {
    return [introductoryMessage];
  }
};
