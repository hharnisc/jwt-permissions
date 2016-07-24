jest.unmock('../src/index');
import index from '../src/index';

describe('jwt-permissions tests', () => {
  it('succeeds', () => {
    expect(index())
      .toBe(true);
  });
});
