class YoutubePlaylistDuration {
  constructor(auth, ytapi) {
    this.auth = auth;
    this.ytapi = ytapi;
    this.duration = 0;
  }

  get formatedDuration() {
    return new Date(1000 * this.duration).toISOString().substr(11, 8);
  }

  toSeconds(input) {
    const regex = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let totalSeconds;
    
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
    return this.ytapi.playlistItems.list({
      part: 'contentDetails',
      playlistId,
      pageToken,
      maxResults: 50,
      auth: this.auth,
    });
  }

  async fetchVideos(ids) {
    return this.ytapi.videos.list({
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

module.exports = YoutubePlaylistDuration;