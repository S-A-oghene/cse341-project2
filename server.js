const express = require('express');
const bodyParser = require('body-parser');
const { getDb, initDb } = require('./db/connect');
const session = require('express-session');
const passport = require('passport');

// This line executes the passport configuration
require('./auth/passport-setup');

const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())
  // 1. Session Middleware - This must come before any routes that use authentication
  .use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true
    })
  )
  // 2. Passport Middleware
  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
