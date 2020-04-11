#! /usr/bin/env node
const { exec } = require("child_process");

const apiKey = process.argv[2]; // google api key
const playlistId = process.argv[3]; // playlist id

exec(`node index.js ${apiKey} ${playlistId}`, (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`\n${playlistId} duration: ${stdout}`);
});