import axios from 'axios';
import { SERVICES_FORM_API_PATH } from './apiUrl/servicesForm';

type IPRForm = {
  fields: Record<string, string>[];
  context: {
    pageUri: string;
    pageName: string;
  };
};

export const postPRSubmission = async (payload: IPRForm, formId: string) => {
  const url = SERVICES_FORM_API_PATH + formId;
  const response = await axios.post(url, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};
