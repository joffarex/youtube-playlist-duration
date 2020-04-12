const { readFileSync } = require('fs');
const { resolve } = require('path');
const { google } = require('googleapis');
const YoutubePlaylistDuration = require('./src/ypd');

async function main() {
  try {
    const playlistId = process.argv[2]; // playlist id

    if (!playlistId) {
      throw new Error('Please enter playlistId');
    }

    const data = readFileSync(resolve(__dirname, 'keys.json'));
    const { apiKey } = JSON.parse(data.toString());

    if(!apiKey) {
      throw new Error('Please enter GOOGLE API KEY with using ypd-init command');
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