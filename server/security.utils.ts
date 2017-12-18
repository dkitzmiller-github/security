const {promisify} = require('util');

// import * as crypto from 'crypto';
const crypto = require('crypto');

crypto

export const randomBytes  = promisify(crypto.randomBytes);



