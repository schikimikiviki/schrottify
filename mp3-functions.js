import {spawn} from 'node:child_process';


export const downloadMp3 = (link) => {
  const process = spawn('yt-dlp', [
    '-x', '--audio-format', 'mp3', '--audio-quality', '192K', '-P',
    '~/Desktop/schrottify/testfiles', link
  ]);

  process.stdout.on('data', data => {
    console.log(data.toString());
  });

  process.stderr.on('data', data => {
    console.error(data.toString());
  });

  process.on('close', code => {
    console.log(`yt-dlp exited with ${code}`);
  });
}
