
import 'dotenv/config'
const accessToken = process.env.SPOTIFY_CLIENT_SECRET

export const fetchData =
    async (url, token) => {
  try {
    const response =
        await fetch(url, {headers: {Authorization: 'Bearer ' + token}});
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error(error.message);
  }
}

export const postData = async (url, credentials) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });

  if (!response.ok) {
    throw new Error(`Spotify auth failed: ${response.status}`);
  }

  const body = await response.text();

  if (!response.ok) {
    throw new Error(`Spotify auth failed: ${response.status} ${body}`);
  }

  return JSON.parse(body).access_token;
}
