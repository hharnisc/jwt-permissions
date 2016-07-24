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

    pit('does validate a token that has more complicated permission', () => {
      const secret = 'the secret';
      const requiredRoles = [/^write.*$/];
      const accessToken = jsonwebtoken.sign({ roles: ['write-1234'] }, secret);
      return verifyPermission({ requiredRoles, accessToken, secret });
    });

    pit('does not validate a token that is missing a permission', () => {
      const error = 'Invalid Token';
      const secret = 'the secret';
      const requiredRoles = [/^write$/];
      const accessToken = jsonwebtoken.sign({ roles: ['read'] }, secret);
      return verifyPermission({ requiredRoles, accessToken, secret })
        .then(() => {
          throw new Error('this should have broken');
        })
        .catch((actualError) => {
          expect(actualError.message)
            .toEqual(error);
        });
    });
  });
});
