import 'dotenv/config'

import {fetchData, postData} from './helpers.js'

const clientID = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

export const getPlayListWithID =
    (playListID, credentials) => {
      let spotifyAPI = 'https://api.spotify.com/v1/playlists/';

      let string = spotifyAPI + playListID
      console.log('String: ', string);
      console.log(credentials)

      return fetchData(string, credentials);
    }


export const getSongsFromPlayListWithID =
    async (playListID, credentials) => {
  let data = await getPlayListWithID(playListID, credentials);
  let songs = data.tracks.items;

  let name, artists
  let songArr = []

      for (let i in songs) {
    name = songs[i].track.name
    artists = ''

    for (let j in songs[i].item.artists) {
      artists += songs[i].item.artists[j].name
    }

    songArr[i] = (name + ' - ' + artists)
  }

  return songArr
}

// without this nozthing can be fetched
export const getAccessToken = () => {
  // console.log('####', clientID, clientSecret)
  const credentials =
      Buffer.from(`${clientID}:${clientSecret}`).toString('base64');

  let data = postData('https://accounts.spotify.com/api/token', credentials);

  return data;
}