const YoutubePlaylistDuration = require('../src/ypd');

const {
  mockAuth,
  mockVideos,
  mockIds,
  mockPlaylistId,
  mockYtapi,
} = require('./mocks');

describe('tests ypd class', () => {
  const ypd = new YoutubePlaylistDuration(mockAuth, mockYtapi);

  beforeEach(() => {
    ypd.duration = 0;
  });

  it('should be defined', () => {
    expect(ypd).toBeDefined();
  });

  it('should get formated duration', () => {
    ypd.duration = 10000;

    expect(ypd.formatedDuration).toBe('02:46:40');
  });

  it('should extract seconds from yt api date format', () => {
    expect(ypd.toSeconds('PT69S')).toBe(69);
    expect(ypd.toSeconds('PT4M')).toBe(240);
    expect(ypd.toSeconds('PT4M20S')).toBe(260);
    expect(ypd.toSeconds('PT1H')).toBe(3600);
    expect(ypd.toSeconds('PT1H6M')).toBe(3960);
    expect(ypd.toSeconds('PT1H6M9S')).toBe(3969);
  });

  it('should throw error if yt api date format is incorrect', () => {
    expect(() => ypd.toSeconds('wrong date')).toThrowError(new Error('Wrong date format'));
  });

  it('should fetch playlist page', async () => {
    const data = await ypd.fetchPage(mockPlaylistId);

    expect(data).toStrictEqual({
      data: {
        items: mockVideos,
      },
    });
  });

  it('should fetch videos by ids', async () => {
    const videos = await ypd.fetchVideos(mockIds);

    expect(videos).toStrictEqual({
      data: {
        items: mockVideos,
      },
    });
  });

  it('should fetch full playlist and return formated duration', async () => {
    const duration = await ypd.fetchPlaylist(mockPlaylistId);

    expect(duration).toBe('00:09:29');
  });
});