const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route to start the GitHub authentication process
// Corresponds to /auth/login
router.get('/login', passport.authenticate('github', { scope: ['read:user'] }));

// Route to handle logging out
// Corresponds to /auth/logout
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    // You can redirect to a "logged out" page or the home page
    res.redirect('/');
  });
});

// GitHub callback route
// This is where GitHub redirects the user back to after they've authenticated
router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/api-docs' // Redirect to docs on failure
  }),
  (req, res) => {
    // Successful authentication, redirect to the API docs or a dashboard.
    res.redirect('/api-docs');
  }
);

module.exports = router;