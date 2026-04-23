const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const secret = crypto.randomBytes(32).toString('base64');
const hash = bcrypt.hashSync('admin123', 12);
console.log('NEXTAUTH_SECRET=' + secret);
console.log('ADMIN_PASSWORD_HASH=' + hash);
