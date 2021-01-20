#! /usr/bin/env node
const { processPlaylistId } = require('../src/playlist');

const playlistId = process.argv[2];

async function main() {
  const duration = await processPlaylistId(playlistId);
  console.log(`\nPLAYLIST: ${playlistId}\nDURATION: ${duration}`);
}

main();