const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'lalala this isnt secure';

const { User } = require('../models/taskMod');

//authentication and authorization

const create = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user)
    return res
      .status(409)
      .send({ error: '409', message: 'User already exists' });
  try {
    if (password === '') throw new Error();
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    const { _id } = await newUser.save();
    console.log('h1');
    const accessToken = jwt.sign({ _id }, SECRET_KEY);
    res.status(201).send({ accessToken });
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create user' });
  }
  // REMOVE-END
};

exports.create = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user)
    return res
      .status(409)
      .send({ error: '409', message: 'User already exists' });
  try {
    if (password === '') throw new Error();
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    const { _id } = await newUser.save();
    const accessToken = jwt.sign({ _id }, SECRET_KEY);
    res.status(201).send({ accessToken });
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create user' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error();
    const accessToken = jwt.sign({ _id: user._id }, SECRET_KEY);
    res.status(200).send({ accessToken });
  } catch (error) {
    res
      .status(401)
      .send({ error: '401', message: 'Username or password is incorrect' });
  }
};

exports.profile = async (req, res) => {
  console.log('req', 1);
  try {
    const { _id, firstName, lastName } = req.user;
    const user = { _id, firstName, lastName };
    res.status(200).send(user);
  } catch {
    res.status(404).send({ error, message: 'Resource not found' });
  }
};

exports.logout = (req, res) => {
  // REMOVE-START
  // delete the token client side upon logout.
  // you would invalidate the token here.
};
