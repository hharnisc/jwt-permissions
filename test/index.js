jest.unmock('../src/index');
import { verifyPermission } from '../src/index';

describe('jwt-permissions tests', () => {
  describe('verifyPermission', () => {
    it('exists', () => {
      expect(verifyPermission)
        .toBeDefined();
    });
  });
});
