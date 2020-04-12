#! /usr/bin/env node
const { writeFileSync } = require('fs');
const { resolve } = require('path');

const apiKey = process.argv[2]; // google api key

try {
  if (!apiKey) {
    throw new Error('Please enter GOOGLE API KEY');
  }
  
  const data = {
    apiKey,
  };
  
  writeFileSync(resolve(__dirname, '../keys.json'), JSON.stringify(data));
  
  console.log('GOOGLE API KEY has been saved!');
} catch (e) {
  console.error(e);
}