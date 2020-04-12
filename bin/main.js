#! /usr/bin/env node
const { resolve } = require('path');
const { exec } = require("child_process");

const apiKey = process.argv[2]; // google api key
const playlistId = process.argv[3]; // playlist id

const path = resolve(__dirname, '../index.js');

exec(`node ${path} ${apiKey} ${playlistId}`, (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`STDERR: ${stderr}`);
    return;
  }
  console.log(`\nPLAYLIST: ${playlistId}\nDURATION: ${stdout}`);
});