const { readFileSync } = require('fs');
const { resolve } = require('path');
const { google } = require('googleapis');
const YoutubePlaylistDuration = require('./ypd');

const handleLinkAsPlaylistId = (playlistId) => {
  if(playlistId.includes('https://www.youtube.com/playlist?list=')) {
    return playlistId.replace('https://www.youtube.com/playlist?list=', '');
  }

  return playlistId;
}

async function processPlaylistId(playlistId) {
  try {
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
            throw new Error(`${err.reason}: Please enter correct playlist id`);
          default:
            throw new Error(`${err.reason}: ${err.message}`);
        }
      }
    }

  } catch (e) {
    console.error(e.message);
  }
}

module.exports = { processPlaylistId, handleLinkAsPlaylistId }