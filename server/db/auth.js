const jwt = require('jsonwebtoken');
require('dotenv').config();

// Generate a token for the user
function createToken(username) {
  const payload = {
    username: username, // User's username
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: 60 * 60 * 24, // expires in 24 hours
  });
  // const decodedtoken = jwt.decode(token);
  // console.log(decodedtoken);
  return token;
}
// verifies users token so user can do certain actions.
function verifyToken(req, res, next) {
  const token = req.body.token || req.headers['x-access-token'];
  if (token) {
    // verify checks the validity of the token and the encryption variable
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        return res.json({
          success: false,
          msg: 'Token is invalid or expired.',
        });
      } else {
        // The decoded token is stored in the request object from which it can be requested in the future
        req.decoded = decoded;
        next(); // move on to the next routes
      }
    });
  } else {
    // if there is no token, it prompts an error
    return res.status(403).send({
      success: false,
      msg: 'Token does not exist',
    });
  }
}

// possible code to validate users email address (not used in this project).
/*const transporter = nodemailer.createTransport({
  pool: true,
  host: 'smtp.gmail.com',
  port: 25,
  secure: false,
  auth: {
    user: 'myemail@pers.com', // Change to your email and password
    pass: 'grfj zzym odoj xens',
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// function sendConfirmationEmail(email, confirmationToken) {
//   const confirmationLink = `http://yourwebsite.com/confirm?token=${confirmationToken}`;
//   const mailOptions = {
//     from: 'touras.official@email.com',
//     to: email,
//     subject: 'Email Confirmation',
//     text: `Click this link to confirm your email: ${confirmationLink}`,
//   };


  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
}*/

module.exports = { createToken, verifyToken };
