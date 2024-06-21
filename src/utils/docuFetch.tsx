import axios from 'axios';

const getUserDoc = async (docShorthand: string, email: string): Promise<string | undefined> => {
  try {
    const token = localStorage.getItem('token');

    const dataToBeSent = {
      serveDoc: docShorthand,
      email: typeof email === 'undefined' ? '' : email,
    };

    const response = await axios.post(
      `${process.env.NEXT_SERVER_API_BASE_URL}/api/userDoc`,
      dataToBeSent,
      {
        headers: { Authorization: token ? `Bearer ${token}` : null },
      },
    );
    if (response.status === 200) {
      return response.data.Slug;
    }
    return undefined;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching user role:', error);
    return undefined;
  }
};

export default getUserDoc;
