const { processPlaylistId } = require('./src/playlist');

async function main() {
  const playlistId = process.argv[2];

  const duration = processPlaylistId(playlistId);
  console.log(duration);
}

main();