# JWT Permissions

[![Build Status](https://travis-ci.org/hharnisc/jwt-permissions.svg?branch=master)](https://travis-ci.org/hharnisc/jwt-permissions)

A permissions layer built on top of [jsonwebtokens](jwt.io)

## Table Of Contents

- [Quick Start](#quick-start)
- [Test](#test)
- [Usage](#usage)

## Quick Start

Verify a jsonwebtoken has required roles

```javascript
const secret = 'the secret';
const requiredRoles = [/^write.*$/]; // has to match each regex
// create a token with some roles in the payload
const accessToken = jsonwebtoken.sign({ roles: ['write-1234'] }, secret);
verifyPermission({ requiredRoles, accessToken, secret })
  .then(() => {
    // token is good and has all needed roles
  })
  .catch(() => {
    // either a bad token or missing roles
  });
```

Verify (with customizable payload key)

```javascript
const secret = 'the secret';
const requiredRoles = [/^write.*$/]; // has to match each regex
// create a token with some roles in the payload
const accessToken = jsonwebtoken.sign({ otherRoleKey: ['write-1234'] }, secret);
verifyPermission({ requiredRoles, accessToken, secret, rolesKey: 'otherRoleKey' })
  .then(() => {
    // token is good and has all needed roles
  })
  .catch(() => {
    // either a bad token or missing roles
  });
```

## Test

```sh
npm test
npm run test:watch
```

## API

### verifyPermission

Verify a token is valid and has all required permissions

#### Arguments

**options** - *object* - input options with the following keys  
  - **requiredRoles** - *array of regex* - each regex must pass on at least one role in the token  
  - **accessToken** - *jsonwebtoken* - a jsonwebtoken that can be verified
  - **secret** - *string* - a secret used to verify the jsonwebtoken
  - **rolesKey** - *string* - (optional) the key to pull the roles from the payload in the jsonwebtoken
