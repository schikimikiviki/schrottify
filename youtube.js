import 'dotenv/config'

import {fetchData} from './helpers.js';

const API_KEY = process.env.YOUTUBE_API_KEY;


export const fetchSongInfo = async (query) => {
  const params = new URLSearchParams({
    'part': 'snippet',
    'q': query,
    'type': 'video',
    'maxResults': 1,
    'key': API_KEY
  })

  let url = `https://www.googleapis.com/youtube/v3/search?${params}`
  return fetchData(url, API_KEY, true);
}
