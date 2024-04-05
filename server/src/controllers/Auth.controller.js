const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

async function signUp(req, res) {
  try {
    const { username, email, password, confirm_password } = req.body;

    if (password !== confirm_password) {
      return res.status(400).json({ errors: { confirm_password: 'Passwords do not match' } });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ errors: { email: 'User already exists' } });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.error('Error signing up user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function signIn(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ errors: { password: 'Invalid email or password' } });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ errors: { password: 'Invalid email or password' } });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.status(200).json({ message: 'User signed in', token });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  signUp,
  signIn
};
