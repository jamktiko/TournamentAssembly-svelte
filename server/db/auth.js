const jwt = require('jsonwebtoken');

const secretKey = 'Tourassekrukey';

// Generate a token for the user
function createToken(user) {
  const payload = {
    username: user.username, // User's username
  };
  console.log(payload);
  const token = jwt.sign(payload, secretKey, {
    expiresIn: 60 * 60 * 24, // expires in 24 hours
  });
  // const decodedtoken = jwt.decode(token);
  // console.log(decodedtoken);
  return token;
}

function verifyToken(req, res, next) {
  const token = req.body.token || req.headers['x-access-token'];
  if (token) {
    // verify tutkii tokenin voimassaolon ja salausmuuttujan
    jwt.verify(token, secretKey, function (err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is invalid or expired.',
        });
      } else {
        // Tallennetaan dekoodattu token request-olioon josta sitä voi jatkossa pyytää
        req.decoded = decoded;
        next(); // siirrytään eteenpäin seuraaviin reitteihin
      }
    });
  } else {
    // if there is no token, it prompts an error
    return res.status(403).send({
      success: false,
      message: 'Token does not exist',
    });
  }
}

module.exports = { createToken, verifyToken };
