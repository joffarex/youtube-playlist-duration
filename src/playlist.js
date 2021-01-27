const { readFileSync } = require('fs');
const { resolve } = require('path');
const { google } = require('googleapis');
const YoutubePlaylistDuration = require('./ypd');

function handleLinkAsPlaylistId(playlistId) {
  if(playlistId.includes('https://www.youtube.com/playlist?list=')) {
    return playlistId.replace('https://www.youtube.com/playlist?list=', '');
  }

  return playlistId;
}

async function processPlaylistId(playlistId) {
  try {
    playlistId = handleLinkAsPlaylistId(playlistId);

    if (!playlistId) {
      throw new Error('Please enter playlistId');
    }
    
    let data;

    try {
      data = readFileSync(resolve(__dirname, '../keys.json'));
    } catch (e) {
      console.error('Please first run \'ypd-init\' command');
    }

    const { apiKey } = JSON.parse(data.toString());

    if (!apiKey) {
      throw new Error('Please enter GOOGLE API KEY with using ypd-init command');
    }

    const ypd = new YoutubePlaylistDuration(apiKey, google.youtube('v3'));

    try {
      const duration = await ypd.fetchPlaylist(playlistId);
      return duration;
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

module.exports = { processPlaylistId }