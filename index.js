const { google } = require('googleapis');
const YoutubePlaylistDuration = require('./src/ypd');

function main() {
  const apiKey = process.argv[2]; // google api key
  const playlistId = process.argv[3]; // playlist id

  const ypd = new YoutubePlaylistDuration(apiKey, google.youtube('v3'));
  ypd.fetchPlaylist(playlistId).then(console.log).catch(console.error);
}

main();