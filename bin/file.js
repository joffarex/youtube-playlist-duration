#! /usr/bin/env node
const { createReadStream } = require('fs');
const { createInterface } = require('readline');

const { processPlaylistId } = require('../src/playlist');
const { logFormattedOutput} = require('../src/helpers/output');

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
      const duration = await processPlaylistId(playlistId);
      logFormattedOutput(playlistId, duration);
    }
  } catch (e) {
    console.error(e);
  }
}

file();