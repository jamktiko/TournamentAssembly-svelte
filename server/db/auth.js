const jwt = require('jsonwebtoken');

const secretKey = 'Tourassekrukey';

// Generate a token for the user
function createToken(user) {
  const payload = {
    username: user.username, // User's username
  };
  console.log(payload);
  const token = jwt.sign(payload, secretKey, {
    expiresIn: 60 * 60 * 24, // expiroituu 24 tunnissa
  });
  // const decodedtoken = jwt.decode(token);
  // console.log(decodedtoken);
  return token;
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    // Token is invalid or expired
    return null;
  }
}

module.exports = { createToken, verifyToken };
