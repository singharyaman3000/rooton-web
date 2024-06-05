import axios from 'axios';

const getUserDoc = async (docShorthand: string, email: string): Promise<string | undefined> => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      // eslint-disable-next-line no-console
      console.error('No token found in localStorage');
      return undefined;
    }

    const response = await axios.post(
      `${process.env.NEXT_SERVER_API_BASE_URL}/api/userDoc`,
      { serveDoc: `${docShorthand}`, email },
      {
        headers: { Authorization: `Bearer ${token}` },
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
