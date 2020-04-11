const { google } = require('googleapis');
const YoutubePlaylistDuration = require('./ypd');

function main() {
  const apiKey = process.argv[2]; // google api key
  const playlistId = process.argv[3]; // playlist id

  const ypd = new YoutubePlaylistDuration(apiKey, google);
  ypd.fetchPlaylist(playlistId).then(console.log).catch(console.error)
}

main();