const { google } = require('googleapis');
const YoutubePlaylistDuration = require('./src/ypd');

async function main() {
  try {
    const apiKey = process.argv[2]; // google api key
    const playlistId = process.argv[3]; // playlist id

    if (!apiKey || !playlistId) {
      throw new Error('Please enter both fields');
    }

    const ypd = new YoutubePlaylistDuration(apiKey, google.youtube('v3'));

    try {
      const duration = await ypd.fetchPlaylist(playlistId);
      console.log(duration);
    } catch (e) {
      for (const err of e.errors) {
        switch (err.reason) {
          case 'playlistNotFound':
            console.error(`${err.reason}: Please enter correct playlist id`);
            break;
          default:
            console.error(`${err.reason}: ${err.message}`);
        }
      }
    }

  } catch (e) {
    console.error(e);
  }
}

main();