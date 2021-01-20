#! /usr/bin/env node
const { readFileSync, createReadStream } = require('fs');
const { resolve } = require('path');
const { createInterface } = require('readline');

const { processPlaylistId } = require('./src/playlist');

const filePath = process.argv[2]; // file path

try {
  if (!filePath) {
    throw new Error('Please enter File path to read playlist IDs from');
  }

  const readInterface = createInterface({ input: createReadStream(), output: process.stdout, console: false });

  readInterface.on('line', (playlistId) => {
    const duration = processPlaylistId(playlistId);
    console.log(`\nPLAYLIST: ${playlistId}\nDURATION: ${duration}`);
  });
} catch (e) {
  console.error(e);
}