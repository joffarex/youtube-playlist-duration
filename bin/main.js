#! /usr/bin/env node
const { processPlaylistId } = require('../src/playlist');
const { logFormattedOutput} = require('../src/helpers/output');

const playlistId = process.argv[2];

async function main() {
  const duration = await processPlaylistId(playlistId);

  logFormattedOutput(playlistId, duration);
}

main();