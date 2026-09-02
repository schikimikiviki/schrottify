import {fetchData} from './helpers.js'
import {downloadMp3} from './mp3-functions.js'
import {getAccessToken, getPlayListWithID, getSongsFromPlayListWithID} from './spotify.js';

let youtubeUrl = 'https://www.youtube.com/watch?v=Jklg-ivTHYQ&start_radio=1';
let playListID = '5ATbARi8XEvqgvxdUZldFb'

let token = await getAccessToken();
// console.log('Credentials: ', await token)

let songs = await getSongsFromPlayListWithID(playListID, token);


for (let i in songs) {
  console.log(songs[i])
}



//  downloadMp3(youtubeUrl);