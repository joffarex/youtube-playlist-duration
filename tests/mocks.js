const mockAuth = 'mockAuth';

const mockVideos = [
  { contentDetails: { videoId: '1', duration: 'PT69S' } },
  { contentDetails: { videoId: '2', duration: 'PT4M' } },
  { contentDetails: { videoId: '3', duration: 'PT4M20S' } },
];
const mockIds = [
  mockVideos[0].videoId,
  mockVideos[1].videoId,
  mockVideos[2].videoId,
];

const mockPlaylistId = 1;

const mockYtapi = {
  playlistItems: {
    list: jest.fn().mockReturnValue({
      data: {
        items: mockVideos,
      },
    }),
  },
  videos: {
    list: jest.fn().mockReturnValue({
      data: {
        items: mockVideos,
      },
    }),
  },
};

module.exports = {
  mockAuth,
  mockVideos,
  mockIds,
  mockPlaylistId,
  mockYtapi,
};