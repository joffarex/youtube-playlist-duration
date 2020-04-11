const { google } = require('googleapis');

class YoutubePlaylistDuration {
  duration = 0;

  constructor(auth) {
    this.auth = auth;
  }

  get formatedDuration() {
    return new Date(1000 * this.duration).toISOString().substr(11, 8);
  }

  toSeconds(input) {
    const regex = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
    let hours = 0, minutes = 0, seconds = 0, totalSeconds;

    if (regex.test(input)) {
      var matches = regex.exec(input);
      if (matches[1]) hours = Number(matches[1]);
      if (matches[2]) minutes = Number(matches[2]);
      if (matches[3]) seconds = Number(matches[3]);
      totalSeconds = hours * 3600 + minutes * 60 + seconds;
    } else {
      throw new Error("Wrong date format");
    }

    return totalSeconds;
  }

  async fetchPage(playlistId, pageToken = null) {
    return google.youtube('v3').playlistItems.list({
      part: 'contentDetails',
      playlistId,
      pageToken,
      maxResults: 50,
      auth: this.auth,
    });
  }

  async fetchVideos(ids) {
    return google.youtube('v3').videos.list({
      id: ids.join(','),
      part: 'contentDetails',
      auth: this.auth,
    });
  }

  async fetchPlaylist(playlistId, pageToken = null) {
    const { data } = await this.fetchPage(playlistId, pageToken);

    const ids = [];

    for (const item of data.items) {
      ids.push(item.contentDetails.videoId);
    }

    const videos = await this.fetchVideos(ids);

    for (const video of videos.data.items) {
      this.duration += this.toSeconds(video.contentDetails.duration);
    }

    if (data.nextPageToken) {
      await this.fetchPlaylist(playlistId, data.nextPageToken);
    }

    return this.formatedDuration;
  }
}

function main() {
  const apiKey = process.argv[2]; // google api key
  const playlistId = process.argv[3]; // playlist id
  
  const ypd = new YoutubePlaylistDuration(apiKey);
  ypd.fetchPlaylist(playlistId).then(console.log).catch(console.error)
}

main();