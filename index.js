import bodyParser from 'body-parser';
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

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(join(__dirname, 'public')))

app.use(
    '/webtui',
    express.static(join(__dirname, 'node_modules/@webtui/css/dist')));



app.get('/download-spotify', async (req, res) => {
  let url = req.query.url;
  console.log(url);

  console.log('SPOTIFY DOWNLOAD START')

  console.log('Url: ' + url)
  let parts = url.split('playlist/');
  let playListID = parts[1]
  console.log('ID: ', playListID)


  let token = await getAccessToken();
  let songs = await getSongsFromPlayListWithID(playListID, token);

  let numberOfSongs = songs.length;



  for (let i in songs) {
    // p = A * 100 / G
    let percentage = ((i + 1) * 100) / numberOfSongs
    percentage = ~~percentage  // round up
    console.log(songs[i])
    console.log('Percentage: ', percentage)
    let res = await fetchSongInfo(songs[i]);

    let youtubeID = res['items'][0]['id']['videoId'];
    let youtubeURL = `https://www.youtube.com/watch?v=${youtubeID}`
    console.log(youtubeURL)

    downloadMp3(youtubeURL);
  }

  // res.render('index', {songs, percentage})
});

app.use('/', function(req, res) {
  res.sendFile(join(__dirname, 'public/index.html'));
});

app.listen(3000);
