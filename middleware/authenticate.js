const isAuthenticated = (req, res, next) => {
  // The req.isAuthenticated() function is provided by Passport.js
  if (req.isAuthenticated()) {
    return next(); // User is logged in, proceed to the next middleware or controller
  }
  // User is not logged in, send an unauthorized status
  res.status(401).json({ message: 'Unauthorized. Please log in to access this resource.' });
};

module.exports = { isAuthenticated };