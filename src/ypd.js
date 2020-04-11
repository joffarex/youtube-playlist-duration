class YoutubePlaylistDuration {
  constructor(auth, ytapi) {
    this.auth = auth;
    this.ytapi = ytapi;
    this.duration = 0;
  }

  get formatedDuration() {
    let seconds = this.duration;
    let days = Math.floor(seconds / (3600 * 24));
    seconds -= days * 3600 * 24;
    let hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    let minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;

    return `${
      days === 0 ? `${
        hours < 10 ? `0${hours}` : hours
        }` : (days * 24) + hours
      }:${
      minutes < 10 ? `0${minutes}` : minutes
      }:${
      seconds < 10 ? `0${seconds}` : seconds
      }`;
  }

  toSeconds(input) {
    try {
      const regex = /^P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
      let days = 0;
      let hours = 0;
      let minutes = 0;
      let seconds = 0;
      let totalSeconds;

      if (regex.test(input)) {
        let matches = regex.exec(input);

        if (matches[1]) days = Number(matches[1]);
        if (matches[2]) hours = Number(matches[2]);
        if (matches[3]) minutes = Number(matches[3]);
        if (matches[4]) seconds = Number(matches[4]);

        totalSeconds = days * 86400 + hours * 3600 + minutes * 60 + seconds;
      } else {
        throw new Error(`Invalid date: ${input}`);
      }

      return totalSeconds;
    } catch (e) {
      console.error(e);
      if (e.message.includes('Invalid date')) {
        return 'Invalid date';
      }
    }
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

  async calculatePageDuration(videos) {
    for (const video of videos.data.items) {
      this.duration += this.toSeconds(video.contentDetails.duration);
    }
  }

  async fetchPlaylist(playlistId, pageToken = null) {
    const { data } = await this.fetchPage(playlistId, pageToken);

    const ids = [];

    for (const item of data.items) {
      ids.push(item.contentDetails.videoId);
    }

    const videos = await this.fetchVideos(ids);
    this.calculatePageDuration(videos);

    if (data.nextPageToken) {
      await this.fetchPlaylist(playlistId, data.nextPageToken);
    }

    return this.formatedDuration;
  }
}

module.exports = YoutubePlaylistDuration;