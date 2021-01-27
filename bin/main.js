#! /usr/bin/env node
const { processPlaylistId, handleLinkAsPlaylistId } = require('../src/playlist');
const { logFormattedOutput } = require('../src/helpers/output');

const playlistId = process.argv[2];

async function main() {
  const formattedPlaylistId = handleLinkAsPlaylistId(playlistId);
  const duration = await processPlaylistId(formattedPlaylistId);

  logFormattedOutput(playlistId, duration);
}

main();