const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');

exports.join = async (req, res) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    
    return res.status(201).json({ 
      success: true,
      message: 'User created successfully' ,
      user: {
        id: newUser.id,
        email: newUser.email,
        nick: newUser.nick,
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

exports.login = (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.status(401).json({ success: false, message: info.message });
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.status(200).json({ success: true, message: 'Login successful', user });
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    return res.status(200).json({ success: true, message: 'Logout successful' });
  });
};
