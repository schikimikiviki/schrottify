import {fetchData} from './helpers.js'
import {downloadMp3} from './mp3-functions.js'
import {getAccessToken, getPlayListWithID} from './spotify.js';

let youtubeUrl = 'https://www.youtube.com/watch?v=Jklg-ivTHYQ&start_radio=1';
let playListID = '5ATbARi8XEvqgvxdUZldFb'

let token = await getAccessToken();
console.log('Credentials: ', await token)

getPlayListWithID(playListID, token);
//  downloadMp3(youtubeUrl);