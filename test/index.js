jest.unmock('../src/index');
jest.unmock('jsonwebtoken');
import jsonwebtoken from 'jsonwebtoken';
import { verifyPermission } from '../src/index';

describe('jwt-permissions tests', () => {
  describe('verifyPermission', () => {
    it('exists', () => {
      expect(verifyPermission)
        .toBeDefined();
    });

    pit('does validate a token that has permission', () => {
      const secret = 'the secret';
      const requiredRoles = [/^write$/];
      const accessToken = jsonwebtoken.sign({ roles: ['write'] }, secret);
      return verifyPermission({ requiredRoles, accessToken, secret });
    });
  });
});
