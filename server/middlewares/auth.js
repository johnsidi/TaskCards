const jwt = require('jsonwebtoken');
console.log(jwt);
const { User } = require('./../models/taskMod');
const SECRET_KEY = process.env.SECRET_KEY || 'lalala this isnt secure';

const authMiddleware = async (req, res, next) => {
  // extract token from auth headers
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) return res.sendStatus(403);
  const token = authHeaders.split(' ')[1];
  try {
    // verify & decode token payload,

    const { _id } = jwt.verify(token, SECRET_KEY);

    // attempt to find user object and set to req
    console.log('hi');
    const user = await User.findOne({ _id });
    if (!user) return res.sendStatus(401);
    req.user = user;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

module.exports = authMiddleware;
