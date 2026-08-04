const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const verifierToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

const verifierUtilisateursAutorises = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user || (user.username !== process.env.USER1_USERNAME && user.username !== process.env.USER2_USERNAME)) {
      return res.status(403).json({ message: 'Access restricted' });
    }

    req.username = user.username;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const verifierUtilisateur1 = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user || user.username !== process.env.USER1_USERNAME) {
      return res.status(403).json({ message: 'Access restricted' });
    }

    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { verifierToken, verifierUtilisateursAutorises, verifierUtilisateur1 };