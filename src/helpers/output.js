const logFormattedOutput = (playlistId, duration) => {
  console.log(`\nPlaylist Link: https://www.youtube.com/playlist?list=${playlistId}\nDuration: ${duration}\n`);
};

module.exports = { logFormattedOutput };