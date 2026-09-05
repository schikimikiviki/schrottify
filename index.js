import express from 'express'
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';

import {fetchData} from './helpers.js'
import {downloadMp3} from './mp3-functions.js'
import {getAccessToken, getPlayListWithID, getSongsFromPlayListWithID} from './spotify.js';
import {fetchSongInfo} from './youtube.js'


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, 'public')))

app.use('/webtui', express.static(join(__dirname, 'node_modules/@webtui/css/dist')));

app.use('/', function(req, res) {
  res.sendFile(join(__dirname, 'public/index.html'));
});


app.listen(3000);

let youtubeUrl = 'https://www.youtube.com/watch?v=Jklg-ivTHYQ&start_radio=1';
let playListID = '5ATbARi8XEvqgvxdUZldFb'

let token = await getAccessToken();
// console.log('Credentials: ', await token)

let songs = await getSongsFromPlayListWithID(playListID, token);


// for (let i in songs) {
//   console.log(songs[i])
// }

let query = 'Sprawling Idiot Effigy - Neros Day At Disneyland';
let res = await fetchSongInfo(query);

let youtubeID = res['items'][0]['id']['videoId'];
let youtubeURL = `https://www.youtube.com/watch?v=${youtubeID}`
console.log(youtubeURL)

    //  downloadMp3(youtubeUrl);