const {processPlaylistId} = require('../src/playlist');

describe('tests ypd class', () => {
  it('should return playlist duration', async () => {
    const duration = processPlaylistId('PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp');
    expect(duration).toBe('04:32:35');
  });
});