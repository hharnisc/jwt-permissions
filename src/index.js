import jsonwebtoken from 'jsonwebtoken';

export const verifyPermission = (options = {}) => {
  // it's important to keep this error message ambiguous
  const errorMsg = 'Invalid Token';
  const { requiredRoles, accessToken, secret } = options;
  const rolesKey = options.rolesKey || 'roles';
  return new Promise((resolve, reject) => {
    jsonwebtoken.verify(accessToken, secret, (error, payload) => {
      if (error) {
        reject(errorMsg);
      } else {
        const missingRoles = requiredRoles.find((role) =>
          !payload[rolesKey].find((pRole) => role.test(pRole))
        );
        if (!missingRoles) {
          resolve();
        } else {
          reject(Error(errorMsg));
        }
      }
    });
  });
};
