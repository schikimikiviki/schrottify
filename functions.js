const ytdl = require('@distube/ytdl-core');
const fs = require('fs');
const env = require('dotenv').config();

const getToken = async () => {
  // token is valid for an hour

  const response = await fetch('https://example.org/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    // Automatically converted to "username=example&password=password"
    body: new URLSearchParams({ username: 'example', password: 'password' }),
  });
  return response;
};

const downloadVideo = (videoUrl, savePath) => {
  ytdl(videoUrl)
    .pipe(fs.createWriteStream(savePath))
    .on('finish', () => {
      console.log('Video downloaded successfully!');
    })
    .on('error', (err) => {
      console.error('Error downloading video:', err);
    });
};

const getVideoInfo = (videoUrl) => {
  // Get video info
  ytdl.getBasicInfo(videoUrl).then((info) => {
    console.log(info.videoDetails.title);
  });
};

// eg: http://www.youtube.com/watch?v=aqz-KE-bpKQ
// Get video info with download formats
const getVideoInfoWithFormats = (videoUrl) => {
  ytdl.getInfo(videoUrl).then((info) => {
    console.log(info.formats);
  });
};

export default { downloadVideo, getVideoInfo, getVideoInfoWithFormats };
