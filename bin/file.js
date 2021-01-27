#! /usr/bin/env node
const { createReadStream } = require('fs');
const { createInterface } = require('readline');

const { processPlaylistId, handleLinkAsPlaylistId } = require('../src/playlist');
const { logFormattedOutput } = require('../src/helpers/output');

async function file() {
  const filePath = process.argv[2];

  try {
    if (!filePath) {
      throw new Error('Please enter File path to read playlist IDs from');
    }

    const readInterface = createInterface({
      input: createReadStream(filePath),
      crlfDelay: Infinity,
    });

    for await (const playlistId of readInterface) {
      const formattedPlaylistId = handleLinkAsPlaylistId(playlistId);
      const duration = await processPlaylistId(formattedPlaylistId);
      logFormattedOutput(formattedPlaylistId, duration);
    }
  } catch (e) {
    console.error(e);
  }
}

file();