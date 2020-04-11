const YoutubePlaylistDuration = require('../src/ypd');

const {
  mockAuth,
  mockVideos,
  mockIds,
  mockPlaylistId,
  mockYtapi,
} = require('./mocks');

// disable thrown error logs
jest.spyOn(global.console, 'error').mockImplementation(() => jest.fn());

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
    expect(ypd.toSeconds('PT69S')).toBe(60 + 9);
    expect(ypd.toSeconds('PT6M')).toBe(60 * 6);
    expect(ypd.toSeconds('PT6M9S')).toBe((60 * 6) + 9);
    expect(ypd.toSeconds('PT1H')).toBe(60 * 60);
    expect(ypd.toSeconds('PT1H6M')).toBe((60 * 60) + (60 * 6));
    expect(ypd.toSeconds('PT1H6M9S')).toBe((60 * 60) + (60 * 6) + 9);
    expect(ypd.toSeconds('P1DT')).toBe((60 * 60 * 24));
    expect(ypd.toSeconds('P1DT1H')).toBe((60 * 60 * 24) + (60 * 60));
    expect(ypd.toSeconds('P1DT1H6M')).toBe((60 * 60 * 24) + (60 * 60) + (60 * 6));
    expect(ypd.toSeconds('P1DT1H6M9S')).toBe((60 * 60 * 24) + (60 * 60) + (60 * 6) + 9);
  });

  it('should throw error if yt api date format is incorrect', () => {
    // expect(() => ypd.toSeconds('wrong date')).toThrowError(new Error('Wrong date format'));
    expect(ypd.toSeconds('wrong date')).toBe('Invalid date');
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