
import 'dotenv/config'
const accessToken = process.env.SPOTIFY_CLIENT_SECRET



export const fetchData =
    async (url, token, keyIsQueryParam) => {
  try {
    if (!keyIsQueryParam) {
      // token als Bearer mitgeben
      console.log('##########')
      console.log('Fetching with bearer token ... ')
      console.log('URL: ' + url)
      console.log('##########')
      const response =
          await fetch(url, {headers: {Authorization: 'Bearer ' + token}});
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      return await response.json();


    } else {
      // token is schon teil der URL
      console.log('##########')
      console.log('Fetching with token in URL param ... ')
      console.log('URL: ' + url)
      console.log('##########')
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      return await response.json();
    }


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
