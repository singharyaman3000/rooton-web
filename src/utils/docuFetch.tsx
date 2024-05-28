import axios from 'axios';

const getUserDoc = async (): Promise<string | undefined> => {
  try {
    const token = localStorage.getItem('token');

    if (!token){
    // eslint-disable-next-line no-console
      console.error('No token found in localStorage');
      return undefined;
    }

    const response = await axios.post(`${process.env.NEXT_SERVER_API_BASE_URL}/api/userDoc`, 'harish.jinagam@rooton.ca-sv' , {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.Slug;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching user role:', error);
    return undefined;
  }
};

export default getUserDoc;
