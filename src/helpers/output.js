const logFormattedOutput = (playlistId, duration) => {
  if (duration && typeof duration === 'string') {
    console.log(`\nPlaylist Link: https://www.youtube.com/playlist?list=${playlistId}\nDuration: ${duration}\n`);
  }
};

module.exports = { logFormattedOutput };