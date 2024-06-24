'use server';

async function checkWhetherDocAlreadySigned(email: string, serveDoc: string): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.NEXT_SERVER_API_BASE_URL}/api/docusealCheck`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        serveDoc,
      }),
      cache:'no-cache',
    });
    if (response.status === 200) {
      const data = await response.json();
      console.log(data, {
        email,
        serveDoc,
      });
      return data.isAlreadySigned;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function createDoc(email: string, serveDoc: string, op: string): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.NEXT_SERVER_API_BASE_URL}/api/docusealCheck`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        serveDoc,
        op,
      }),
    });
    if (response.status === 200) {
      const data = await response.json();
      if (data.Status.toLowerCase() === 'added') {
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export { checkWhetherDocAlreadySigned, createDoc };
